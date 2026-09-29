import { Product } from '../types/index.js';
import { getRawProductsPart1 } from './productsPart1.js';
import { productsPart2 } from './productsPart2.js';
import { productsPart3 } from './productsPart3.js';
import { productsPart4 } from './productsPart4.js';
import { productsPart5 } from './productsPart5.js';

// Curated authentic stationery photos
const BALLPOINT_PENS = [
  'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1585336261073-455c1103c800?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1569091791842-7cfb64e04797?auto=format&fit=crop&w=800&q=80'
];

const ROLLERBALL_GEL_PENS = [
  'https://images.unsplash.com/photo-1595180879685-618797f3747d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1565636401323-5e2a22fd9e5b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80'
];

const FOUNTAIN_PENS = [
  'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1585336261026-4186644199b8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
];

const GRAPHITE_PENCILS = [
  'https://images.unsplash.com/photo-1585776245842-83e9b1740956?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80'
];

const COLOR_PENCILS = [
  'https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80'
];

const MECHANICAL_PENCILS = [
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1585776245842-83e9b1740956?auto=format&fit=crop&w=800&q=80'
];

const SPIRAL_NOTEBOOKS = [
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544716278-e563178c772c?auto=format&fit=crop&w=800&q=80'
];

const EXECUTIVE_DIARIES = [
  'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80'
];

const REGISTERS_LEDGERS = [
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
];

const COPY_PAPER = [
  'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517976487507-5b3bb1132954?auto=format&fit=crop&w=800&q=80'
];

const CRAFT_PAPER_CARDS = [
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=800&q=80'
];

const BOX_FILES_ARCH = [
  'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80'
];

const BINDERS_FOLDERS = [
  'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
];

const HIGHLIGHTERS = [
  'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1565636401323-5e2a22fd9e5b?auto=format&fit=crop&w=800&q=80'
];

const MARKERS = [
  'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80'
];

const GEOMETRY_BOXES = [
  'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
];

const PENCIL_CASES = [
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
];

const ERASERS_SHARPENERS = [
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80'
];

const SCISSORS_RULERS = [
  'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
];

const CALCULATORS = [
  'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80'
];

const STAPLERS_PUNCHES = [
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&w=800&q=80'
];

const FASTENERS_CLIPS = [
  'https://images.unsplash.com/photo-1585336261026-4186644199b8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80'
];

const ORGANIZERS_DESK = [
  'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80'
];

const PAINTS_COLORS = [
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80'
];

const BRUSHES_CANVAS = [
  'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80'
];

const ADHESIVES_GLUES = [
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80'
];

function resolveProductAssets(item: any, index: number): { thumbnail: string; gallery: string[] } {
  const name = (item.name || '').toLowerCase();
  const subcat = (item.subcategory || '').toLowerCase();
  const cat = (item.category || '').toLowerCase();

  let pool: string[];

  // 1. PENCILS (Check first so "pencil" does not match "pen")
  if (cat.includes('pencil') || subcat.includes('pencil') || name.includes('pencil') || name.includes('graphite')) {
    if (subcat.includes('mechanical') || name.includes('mechanical') || name.includes('lead')) {
      pool = MECHANICAL_PENCILS;
    } else if (subcat.includes('color') || name.includes('color') || name.includes('colour')) {
      pool = COLOR_PENCILS;
    } else {
      pool = GRAPHITE_PENCILS;
    }
  }
  // 2. CALCULATORS
  else if (cat.includes('calculator') || subcat.includes('calculator') || name.includes('calculator') || name.includes('casio')) {
    pool = CALCULATORS;
  }
  // 3. GEOMETRY & MATH
  else if (cat.includes('geometry') || subcat.includes('geometry') || name.includes('geometry') || name.includes('compass') || name.includes('drafting')) {
    pool = GEOMETRY_BOXES;
  }
  // 4. ERASERS & SHARPENERS
  else if (subcat.includes('eraser') || subcat.includes('sharpener') || name.includes('eraser') || name.includes('sharpener') || name.includes('rubber')) {
    pool = ERASERS_SHARPENERS;
  }
  // 5. PENCIL CASES & POUCHES
  else if (subcat.includes('case') || name.includes('pouch') || name.includes('case')) {
    pool = PENCIL_CASES;
  }
  // 6. SCISSORS & RULERS
  else if (subcat.includes('scissor') || name.includes('scissor') || subcat.includes('ruler') || name.includes('ruler') || name.includes('scale') || name.includes('cutter')) {
    pool = SCISSORS_RULERS;
  }
  // 7. HIGHLIGHTERS & MARKERS
  else if (cat.includes('marker') || subcat.includes('marker') || name.includes('marker') || subcat.includes('highlighter') || name.includes('highlighter') || name.includes('textliner')) {
    if (subcat.includes('highlighter') || name.includes('highlighter') || name.includes('textliner')) {
      pool = HIGHLIGHTERS;
    } else {
      pool = MARKERS;
    }
  }
  // 8. STAPLERS & PUNCHES
  else if (subcat.includes('stapler') || name.includes('stapler') || subcat.includes('punch') || name.includes('punch') || name.includes('staple')) {
    pool = STAPLERS_PUNCHES;
  }
  // 9. CLIPS & FASTENERS
  else if (subcat.includes('fastener') || name.includes('clip') || name.includes('pin') || subcat.includes('pin')) {
    pool = FASTENERS_CLIPS;
  }
  // 10. DESK ORGANIZERS
  else if (subcat.includes('organizer') || name.includes('organizer') || name.includes('tray') || name.includes('holder')) {
    pool = ORGANIZERS_DESK;
  }
  // 11. ADHESIVES & GLUES
  else if (cat.includes('adhesive') || subcat.includes('glue') || name.includes('glue') || name.includes('tape') || name.includes('uhu')) {
    pool = ADHESIVES_GLUES;
  }
  // 12. ART & CRAFT (Paints, Brushes, Canvas)
  else if (cat.includes('art') || cat.includes('craft') || name.includes('paint') || name.includes('color') || name.includes('canvas') || name.includes('brush') || name.includes('palette') || name.includes('clay')) {
    if (name.includes('brush') || name.includes('canvas') || name.includes('palette')) {
      pool = BRUSHES_CANVAS;
    } else {
      pool = PAINTS_COLORS;
    }
  }
  // 13. FILES & FOLDERS
  else if (cat.includes('file') || cat.includes('folder') || subcat.includes('file') || subcat.includes('folder') || name.includes('file') || name.includes('folder') || name.includes('binder')) {
    if (subcat.includes('box') || subcat.includes('arch') || name.includes('box') || name.includes('arch')) {
      pool = BOX_FILES_ARCH;
    } else {
      pool = BINDERS_FOLDERS;
    }
  }
  // 14. PAPER PRODUCTS & PRINTING
  else if (cat.includes('paper') || cat.includes('printing') || name.includes('paper') || name.includes('ream') || name.includes('card') || name.includes('roll')) {
    if (name.includes('copy paper') || name.includes('a4') || subcat.includes('copier')) {
      pool = COPY_PAPER;
    } else {
      pool = CRAFT_PAPER_CARDS;
    }
  }
  // 15. NOTEBOOKS & REGISTERS
  else if (cat.includes('notebook') || subcat.includes('notebook') || name.includes('notebook') || name.includes('register') || name.includes('khata') || name.includes('diary') || name.includes('journal') || name.includes('pad')) {
    if (subcat.includes('diary') || subcat.includes('journal') || name.includes('diary') || name.includes('journal')) {
      pool = EXECUTIVE_DIARIES;
    } else if (subcat.includes('register') || name.includes('register') || name.includes('khata') || name.includes('ledger')) {
      pool = REGISTERS_LEDGERS;
    } else {
      pool = SPIRAL_NOTEBOOKS;
    }
  }
  // 16. PENS & WRITING
  else if (cat.includes('pen') || subcat.includes('pen') || name.includes('pen') || name.includes('pointer')) {
    if (subcat.includes('fountain') || name.includes('fountain') || name.includes('calligraphy')) {
      pool = FOUNTAIN_PENS;
    } else if (subcat.includes('rollerball') || subcat.includes('gel') || name.includes('roller') || name.includes('gel')) {
      pool = ROLLERBALL_GEL_PENS;
    } else {
      pool = BALLPOINT_PENS;
    }
  }
  // Fallback
  else {
    pool = SPIRAL_NOTEBOOKS;
  }

  // Pick unique thumbnail using index rotation
  const thumbnail = pool[index % pool.length];

  // Construct a diverse 3-image gallery
  const img2 = pool[(index + 1) % pool.length];
  const img3 = pool[(index + 2) % pool.length] || pool[0];

  return {
    thumbnail,
    gallery: [thumbnail, img2, img3]
  };
}

export function getAllSeedProducts(): Product[] {
  const p1 = getRawProductsPart1();
  const rawList = [...p1, ...productsPart2, ...productsPart3, ...productsPart4, ...productsPart5];

  return rawList.map((item, index) => {
    const { thumbnail, gallery } = resolveProductAssets(item, index);
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
      thumbnail: thumbnail,
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
