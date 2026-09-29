import { Product } from '../types/index.js';
import { getRawProductsPart1 } from './productsPart1.js';
import { productsPart2 } from './productsPart2.js';
import { productsPart3 } from './productsPart3.js';
import { productsPart4 } from './productsPart4.js';
import { productsPart5 } from './productsPart5.js';

export function getAllSeedProducts(): Product[] {
  const p1 = getRawProductsPart1();
  const rawList = [...p1, ...productsPart2, ...productsPart3, ...productsPart4, ...productsPart5];

  return rawList.map((item, index) => {
    // Generate gallery images
    const gallery = [
      item.img,
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80'
    ];

    const discount = Math.round(((item.compareAtPrice - item.price) / item.compareAtPrice) * 100);

    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      sku: item.sku,
      category: item.category,
      subcategory: item.subcategory,
      brand: item.brand,
      description: item.desc,
      shortDescription: item.desc.slice(0, 110) + '...',
      price: item.price,
      wholesalePrice: item.wholesalePrice,
      compareAtPrice: item.compareAtPrice,
      discount: discount > 0 ? discount : 0,
      stock: item.stock,
      stockStatus: item.stockStatus,
      unit: item.unit,
      packSize: item.packSize,
      minWholesaleQty: item.minWholesaleQty || 10,
      images: gallery,
      thumbnail: item.img,
      rating: item.rating,
      reviewsCount: item.reviewsCount,
      featured: item.featured,
      bestSeller: item.bestSeller,
      newArrival: item.newArrival,
      wholesaleAvailable: item.wholesaleAvailable,
      tags: item.tags,
      specifications: (item.specs || {}) as Record<string, string>,
      createdAt: new Date(Date.now() - (index * 86400000)).toISOString()
    };
  });
}
