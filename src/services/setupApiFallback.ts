import { localApi } from './localApi.js';

function jsonResponse(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export function setupApiFallback() {
  if (typeof window === 'undefined') return;

  const originalFetch = window.fetch;

  window.fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const urlStr = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

    // Only intercept /api/ requests
    if (!urlStr.includes('/api/')) {
      return originalFetch.apply(this, [input, init]);
    }

    try {
      const response = await originalFetch.apply(this, [input, init]);

      // If the backend exists and returned valid JSON (not HTML 404 or index.html SPA fallback)
      const contentType = response.headers.get('content-type') || '';
      if (response.ok && contentType.includes('application/json')) {
        return response;
      }

      // If response is not ok or not JSON, fall through to client-side localApi
      console.warn(`[LSM API] Backend /api response not valid JSON (status ${response.status}), activating offline/Vercel fallback for ${urlStr}`);
      return handleLocalApi(urlStr, init);
    } catch (err) {
      console.warn(`[LSM API] Network fetch failed, activating offline/Vercel fallback for ${urlStr}:`, err);
      return handleLocalApi(urlStr, init);
    }
  };
}

async function handleLocalApi(urlStr: string, init?: RequestInit): Promise<Response> {
  const method = (init?.method || 'GET').toUpperCase();
  const parsedUrl = new URL(urlStr, window.location.origin);
  const pathname = parsedUrl.pathname;
  const searchParams = parsedUrl.searchParams;

  let body: any = null;
  if (init?.body && typeof init.body === 'string') {
    try {
      body = JSON.parse(init.body);
    } catch {
      body = {};
    }
  }

  // 1. /api/products
  if (pathname === '/api/products' && method === 'GET') {
    const queryObj: Record<string, string> = {};
    searchParams.forEach((val, key) => {
      queryObj[key] = val;
    });
    const result = localApi.getProducts(queryObj);
    return jsonResponse(result);
  }

  // 2. /api/products/:id/reviews
  const reviewsMatch = pathname.match(/^\/api\/products\/([^/]+)\/reviews$/);
  if (reviewsMatch) {
    const prodId = reviewsMatch[1];
    if (method === 'GET') {
      return jsonResponse(localApi.getReviews(prodId));
    }
    if (method === 'POST') {
      const rev = localApi.addReview(prodId, body?.userName || 'Customer', body?.rating || 5, body?.comment || '');
      return jsonResponse(rev, 201);
    }
  }

  // 3. /api/products/:slugOrId
  const productMatch = pathname.match(/^\/api\/products\/([^/]+)$/);
  if (productMatch) {
    const slugOrId = decodeURIComponent(productMatch[1]);
    if (method === 'GET') {
      const prod = localApi.getProductByIdOrSlug(slugOrId);
      if (!prod) {
        return jsonResponse({ error: 'Product not found' }, 404);
      }
      return jsonResponse(prod);
    }
    if (method === 'PUT') {
      const updated = localApi.updateProduct(slugOrId, body || {});
      return jsonResponse(updated || { error: 'Product not found' });
    }
    if (method === 'DELETE') {
      const ok = localApi.deleteProduct(slugOrId);
      return jsonResponse({ success: ok });
    }
  }

  // 4. /api/categories
  if (pathname === '/api/categories') {
    return jsonResponse(localApi.getCategories());
  }

  // 5. /api/settings
  if (pathname === '/api/settings') {
    if (method === 'GET') {
      return jsonResponse(localApi.getSettings());
    }
    if (method === 'PUT') {
      return jsonResponse(localApi.updateSettings(body || {}));
    }
  }

  // 6. /api/orders
  if (pathname === '/api/orders') {
    if (method === 'GET') {
      return jsonResponse(localApi.getOrders());
    }
    if (method === 'POST') {
      const newOrder = localApi.createOrder(body || {});
      return jsonResponse(newOrder, 201);
    }
  }

  // /api/orders/:id/status
  const orderStatusMatch = pathname.match(/^\/api\/orders\/([^/]+)\/status$/);
  if (orderStatusMatch && method === 'PUT') {
    const updated = localApi.updateOrderStatus(orderStatusMatch[1], body?.status);
    return jsonResponse(updated || { error: 'Order not found' });
  }

  // 7. /api/wholesale
  if (pathname === '/api/wholesale') {
    if (method === 'GET') {
      return jsonResponse(localApi.getWholesaleRequests());
    }
    if (method === 'POST') {
      const inquiry = localApi.createWholesaleRequest(body || {});
      return jsonResponse({
        success: true,
        message: 'Wholesale inquiry received. Our Urdu Bazar team will get in touch shortly.',
        request: inquiry
      }, 201);
    }
  }

  // /api/wholesale/:id
  const wholesaleMatch = pathname.match(/^\/api\/wholesale\/([^/]+)$/);
  if (wholesaleMatch && method === 'PUT') {
    const updated = localApi.updateWholesaleStatus(wholesaleMatch[1], body?.status);
    return jsonResponse(updated || { error: 'Wholesale request not found' });
  }

  // 8. /api/admin/stats
  if (pathname === '/api/admin/stats') {
    return jsonResponse(localApi.getAdminStats());
  }

  // 9. /api/contact
  if (pathname === '/api/contact' && method === 'POST') {
    return jsonResponse({
      success: true,
      message: 'Thank you for reaching out to Lahore Stationers Mall. We will respond promptly.'
    });
  }

  // 10. /api/auth/login
  if (pathname === '/api/auth/login' && method === 'POST') {
    const result = localApi.login(body?.email || '', body?.password || '');
    return jsonResponse(result);
  }

  // 11. /api/auth/me
  if (pathname === '/api/auth/me') {
    const adminUser = {
      id: 'usr-admin-1',
      name: 'Urdu Bazar Store Admin',
      email: 'admin@lahorestationers.com',
      role: 'admin',
      companyName: 'Lahore Stationers Mall',
      address: 'Kabeer Street, Urdu Bazar',
      city: 'Lahore'
    };
    return jsonResponse({ user: adminUser });
  }

  // 12. /api/cart
  if (pathname === '/api/cart') {
    return jsonResponse([]);
  }

  // Default fallback
  return jsonResponse({ message: 'Fallback OK' });
}
