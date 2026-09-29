import { Product } from '../../src/types/index.js';

interface RawItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  wholesalePrice: number;
  compareAtPrice: number;
  unit: string;
  packSize: string;
  minWholesaleQty: number;
  stock: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  rating: number;
  reviewsCount: number;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  wholesaleAvailable: boolean;
  tags: string[];
  desc: string;
  img: string;
  specs: Record<string, string>;
}

const rawProducts: RawItem[] = [
  // 1. Writing Instruments (20 items)
  {
    id: 'lsm-001', name: 'Dollar Ball Pen', slug: 'dollar-ball-pen', sku: 'LSM-PEN-DOL-001',
    category: 'Pens & Writing', subcategory: 'Ballpoint Pens', brand: 'Dollar',
    price: 30, wholesalePrice: 22, compareAtPrice: 35, unit: 'Piece', packSize: '10 Pieces Pack', minWholesaleQty: 50,
    stock: 2400, stockStatus: 'in_stock', rating: 4.8, reviewsCount: 42,
    featured: true, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['dollar', 'ball pen', 'writing', 'urdu bazar', 'school'],
    desc: 'Classic Dollar smooth-flow ballpoint pen with tungsten carbide ball tip. Comfortable grip and long-lasting blue ink suitable for school exams and daily office work.',
    img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=700&q=80',
    specs: { 'Tip Size': '0.7mm', 'Ink Color': 'Blue', 'Body Material': 'Plastic', 'Made in': 'Pakistan' }
  },
  {
    id: 'lsm-002', name: 'Piano Ball Pen', slug: 'piano-ball-pen', sku: 'LSM-PEN-PIA-002',
    category: 'Pens & Writing', subcategory: 'Ballpoint Pens', brand: 'Piano',
    price: 35, wholesalePrice: 26, compareAtPrice: 40, unit: 'Piece', packSize: '10 Pieces Pack', minWholesaleQty: 50,
    stock: 1800, stockStatus: 'in_stock', rating: 4.7, reviewsCount: 38,
    featured: true, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['piano', 'ball pen', 'writing', 'office'],
    desc: 'Smooth writing Piano ballpoint pen designed for high-speed cursive writing with smudge-free quick drying ink.',
    img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=700&q=80',
    specs: { 'Tip Size': '0.8mm', 'Grip': 'Ribbed ergonomic', 'Ink Color': 'Blue/Black', 'Pack': '10 pieces' }
  },
  {
    id: 'lsm-003', name: 'Hauser XO Ball Pen', slug: 'hauser-xo-ball-pen', sku: 'LSM-PEN-HAU-003',
    category: 'Pens & Writing', subcategory: 'Ballpoint Pens', brand: 'Hauser',
    price: 45, wholesalePrice: 35, compareAtPrice: 50, unit: 'Piece', packSize: '5 Pieces Pack', minWholesaleQty: 30,
    stock: 950, stockStatus: 'in_stock', rating: 4.9, reviewsCount: 29,
    featured: true, bestSeller: false, newArrival: true, wholesaleAvailable: true,
    tags: ['hauser', 'xo pen', 'smooth pen'],
    desc: 'German technology Hauser XO ultra-fluid ballpoint pen with matte finish body and aerodynamic write experience.',
    img: 'https://images.unsplash.com/photo-1565636401323-5e2a22fd9e5b?auto=format&fit=crop&w=700&q=80',
    specs: { 'Tip Size': '0.6mm', 'Ink Color': 'Blue', 'Origin': 'Hauser Tech', 'Body': 'Soft touch' }
  },
  {
    id: 'lsm-004', name: 'Uni-Ball Eye Micro Pen', slug: 'uni-ball-eye-micro-pen', sku: 'LSM-PEN-UNI-004',
    category: 'Pens & Writing', subcategory: 'Rollerball Pens', brand: 'Uni-Ball',
    price: 260, wholesalePrice: 220, compareAtPrice: 290, unit: 'Piece', packSize: 'Single Piece', minWholesaleQty: 12,
    stock: 450, stockStatus: 'in_stock', rating: 4.9, reviewsCount: 64,
    featured: true, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['uni-ball', 'eye micro', 'rollerball', 'waterproof'],
    desc: 'World famous Uni-Ball Eye Micro UB-150 rollerball pen. Features waterproof Super Ink, window level view and consistent ink regulator.',
    img: 'https://images.unsplash.com/photo-1595180879685-618797f3747d?auto=format&fit=crop&w=700&q=80',
    specs: { 'Tip Size': '0.5mm', 'Ink Type': 'Waterproof pigment ink', 'Model': 'UB-150', 'Origin': 'Japan' }
  },
  {
    id: 'lsm-005', name: 'Uni-Ball Signo Gel Pen', slug: 'uni-ball-signo-gel-pen', sku: 'LSM-PEN-UNI-005',
    category: 'Pens & Writing', subcategory: 'Gel Pens', brand: 'Uni-Ball',
    price: 240, wholesalePrice: 200, compareAtPrice: 270, unit: 'Piece', packSize: 'Single Piece', minWholesaleQty: 12,
    stock: 320, stockStatus: 'in_stock', rating: 4.8, reviewsCount: 31,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['uni-ball', 'signo', 'gel pen'],
    desc: 'Uni-Ball Signo DX gel ink roller pen offering ultra-crisp lines, smudge resistance and rich pigment density.',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80',
    specs: { 'Tip Size': '0.38mm / 0.5mm', 'Ink Type': 'Gel Pigment', 'Grip': 'Rubber' }
  },
  {
    id: 'lsm-006', name: 'Pilot G2 Gel Pen', slug: 'pilot-g2-gel-pen', sku: 'LSM-PEN-PIL-006',
    category: 'Pens & Writing', subcategory: 'Gel Pens', brand: 'Pilot',
    price: 280, wholesalePrice: 235, compareAtPrice: 320, unit: 'Piece', packSize: 'Single Piece', minWholesaleQty: 12,
    stock: 290, stockStatus: 'in_stock', rating: 4.9, reviewsCount: 55,
    featured: true, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['pilot', 'g2', 'gel pen', 'executive'],
    desc: 'America and Asia favorite Pilot G2 premium retractable gel ink pen. Contoured rubber grip and refillable dynamic gel core.',
    img: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=700&q=80',
    specs: { 'Tip Size': '0.7mm', 'Refillable': 'Yes', 'Mechanism': 'Retractable click' }
  },
  {
    id: 'lsm-007', name: 'Pentel EnerGel Pen', slug: 'pentel-energel-pen', sku: 'LSM-PEN-PEN-007',
    category: 'Pens & Writing', subcategory: 'Liquid Gel Pens', brand: 'Pentel',
    price: 310, wholesalePrice: 265, compareAtPrice: 350, unit: 'Piece', packSize: 'Single Piece', minWholesaleQty: 12,
    stock: 180, stockStatus: 'in_stock', rating: 5.0, reviewsCount: 40,
    featured: true, bestSeller: false, newArrival: true, wholesaleAvailable: true,
    tags: ['pentel', 'energel', 'quick dry'],
    desc: 'Pentel EnerGel liquid gel pen combining the best qualities of liquid and gel ink. Fast drying ink prevents smearing for left-handed writers.',
    img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=700&q=80',
    specs: { 'Tip Size': '0.7mm Metal Tip', 'Fast Dry': 'Yes', 'Origin': 'Japan' }
  },
  {
    id: 'lsm-008', name: 'Dollar Gel Pen', slug: 'dollar-gel-pen', sku: 'LSM-PEN-DOL-008',
    category: 'Pens & Writing', subcategory: 'Gel Pens', brand: 'Dollar',
    price: 45, wholesalePrice: 34, compareAtPrice: 55, unit: 'Piece', packSize: '10 Pieces Pack', minWholesaleQty: 50,
    stock: 1200, stockStatus: 'in_stock', rating: 4.6, reviewsCount: 22,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['dollar', 'gel pen', 'school'],
    desc: 'Affordable high quality Dollar gel pen for everyday school work, clear notes and test taking.',
    img: 'https://images.unsplash.com/photo-1565636401323-5e2a22fd9e5b?auto=format&fit=crop&w=700&q=80',
    specs: { 'Tip Size': '0.5mm', 'Ink Color': 'Blue/Black', 'Body': 'Transparent clear' }
  },
  {
    id: 'lsm-009', name: 'Pointer Ball Pen', slug: 'pointer-ball-pen', sku: 'LSM-PEN-POI-009',
    category: 'Pens & Writing', subcategory: 'Ballpoint Pens', brand: 'Piano',
    price: 40, wholesalePrice: 30, compareAtPrice: 50, unit: 'Piece', packSize: '10 Pieces Pack', minWholesaleQty: 50,
    stock: 2100, stockStatus: 'in_stock', rating: 4.7, reviewsCount: 34,
    featured: false, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['pointer', 'piano', 'fine writing'],
    desc: 'Fine needle-tip pointer ball pen renowned across schools and colleges in Pakistan for neat and compact handwriting.',
    img: 'https://images.unsplash.com/photo-1595180879685-618797f3747d?auto=format&fit=crop&w=700&q=80',
    specs: { 'Tip Size': '0.5mm Needle Tip', 'Grip': 'Textured', 'Ink': 'Ultra low viscosity' }
  },
  {
    id: 'lsm-010', name: 'Piano Gel Pen', slug: 'piano-gel-pen', sku: 'LSM-PEN-PIA-010',
    category: 'Pens & Writing', subcategory: 'Gel Pens', brand: 'Piano',
    price: 45, wholesalePrice: 33, compareAtPrice: 55, unit: 'Piece', packSize: '10 Pieces Pack', minWholesaleQty: 50,
    stock: 1400, stockStatus: 'in_stock', rating: 4.5, reviewsCount: 19,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['piano', 'gel', 'student pen'],
    desc: 'Smooth flowing Piano gel pen with vivid dark ink formulation and leak-proof seal design.',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80',
    specs: { 'Tip Size': '0.5mm', 'Ink Color': 'Blue', 'Barrel': 'Frost color' }
  },
  {
    id: 'lsm-011', name: 'Blue Ball Pen Pack', slug: 'blue-ball-pen-pack', sku: 'LSM-PEN-BLU-011',
    category: 'Pens & Writing', subcategory: 'Multipacks', brand: 'Dollar',
    price: 280, wholesalePrice: 220, compareAtPrice: 320, unit: 'Pack', packSize: '10 Pieces Pack', minWholesaleQty: 20,
    stock: 800, stockStatus: 'in_stock', rating: 4.8, reviewsCount: 47,
    featured: false, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['pack', 'blue pen', 'stationery box'],
    desc: 'Value bundle of 10 smooth blue ballpoint pens ideal for classroom distribution, tuition academies and office desks.',
    img: 'https://images.unsplash.com/photo-1565636401323-5e2a22fd9e5b?auto=format&fit=crop&w=700&q=80',
    specs: { 'Quantity': '10 pens', 'Color': 'Royal Blue', 'Packaging': 'Hanging pouch' }
  },
  {
    id: 'lsm-012', name: 'Black Ball Pen Pack', slug: 'black-ball-pen-pack', sku: 'LSM-PEN-BLK-012',
    category: 'Pens & Writing', subcategory: 'Multipacks', brand: 'Dollar',
    price: 280, wholesalePrice: 220, compareAtPrice: 320, unit: 'Pack', packSize: '10 Pieces Pack', minWholesaleQty: 20,
    stock: 750, stockStatus: 'in_stock', rating: 4.7, reviewsCount: 30,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['pack', 'black pen', 'exam pen'],
    desc: 'Pack of 10 jet-black ink ballpoint pens, optimal for exam headings, diagrams and official document signatures.',
    img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=700&q=80',
    specs: { 'Quantity': '10 pens', 'Color': 'Jet Black', 'Tip': '0.7mm' }
  },
  {
    id: 'lsm-013', name: 'Red Ball Pen Pack', slug: 'red-ball-pen-pack', sku: 'LSM-PEN-RED-013',
    category: 'Pens & Writing', subcategory: 'Multipacks', brand: 'Dollar',
    price: 280, wholesalePrice: 220, compareAtPrice: 320, unit: 'Pack', packSize: '10 Pieces Pack', minWholesaleQty: 20,
    stock: 600, stockStatus: 'in_stock', rating: 4.8, reviewsCount: 25,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['pack', 'red pen', 'checking pen', 'teacher pen'],
    desc: 'Teacher and auditor favorite red ballpoint pen pack of 10. Distinct bright red ink for corrections and grading.',
    img: 'https://images.unsplash.com/photo-1565636401323-5e2a22fd9e5b?auto=format&fit=crop&w=700&q=80',
    specs: { 'Quantity': '10 pens', 'Color': 'Vivid Red', 'Application': 'Checking & Marking' }
  },
  {
    id: 'lsm-014', name: '4 Color Ball Pen', slug: '4-color-ball-pen', sku: 'LSM-PEN-4CL-014',
    category: 'Pens & Writing', subcategory: 'Multicolor Pens', brand: 'Generic',
    price: 95, wholesalePrice: 75, compareAtPrice: 120, unit: 'Piece', packSize: 'Single Piece', minWholesaleQty: 24,
    stock: 420, stockStatus: 'in_stock', rating: 4.6, reviewsCount: 18,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['4 color', 'multipurpose', 'nursing pen', 'student'],
    desc: 'Convenient 4-in-1 multi-color ballpoint pen (Blue, Black, Red, Green) in a single compact barrel with click selector.',
    img: 'https://images.unsplash.com/photo-1595180879685-618797f3747d?auto=format&fit=crop&w=700&q=80',
    specs: { 'Colors': 'Blue, Black, Red, Green', 'Mechanism': 'Top slider tabs' }
  },
  {
    id: 'lsm-015', name: 'Fine Tip Writing Pen', slug: 'fine-tip-writing-pen', sku: 'LSM-PEN-FIN-015',
    category: 'Pens & Writing', subcategory: 'Fineliners', brand: 'Piano',
    price: 50, wholesalePrice: 38, compareAtPrice: 65, unit: 'Piece', packSize: '10 Pieces Pack', minWholesaleQty: 30,
    stock: 900, stockStatus: 'in_stock', rating: 4.7, reviewsCount: 28,
    featured: false, bestSeller: false, newArrival: true, wholesaleAvailable: true,
    tags: ['fine tip', 'fineliner', 'drawing pen'],
    desc: 'Precision metal-clad fine tip pen ideal for engineering drawings, accounting ledgers, and intricate handwriting.',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80',
    specs: { 'Tip Size': '0.4mm Metal Clad', 'Ink': 'Water resistant', 'Cap': 'Ventilated' }
  },
  {
    id: 'lsm-016', name: 'Premium Rollerball Pen', slug: 'premium-rollerball-pen', sku: 'LSM-PEN-ROL-016',
    category: 'Pens & Writing', subcategory: 'Rollerball Pens', brand: 'Hauser',
    price: 350, wholesalePrice: 290, compareAtPrice: 420, unit: 'Piece', packSize: 'Gift Box Piece', minWholesaleQty: 10,
    stock: 140, stockStatus: 'in_stock', rating: 4.9, reviewsCount: 32,
    featured: true, bestSeller: false, newArrival: true, wholesaleAvailable: true,
    tags: ['premium pen', 'rollerball', 'gift', 'executive'],
    desc: 'Heavyweight metal barrel rollerball pen with lacquered gunmetal finish. Delivers fountain pen smoothness with ball pen ease.',
    img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=700&q=80',
    specs: { 'Body': 'Metal alloy', 'Finish': 'Lacquered matte', 'Refill': 'Ceramic roller' }
  },
  {
    id: 'lsm-017', name: 'Fountain Pen', slug: 'fountain-pen', sku: 'LSM-PEN-FNT-017',
    category: 'Pens & Writing', subcategory: 'Fountain Pens', brand: 'Dollar',
    price: 90, wholesalePrice: 68, compareAtPrice: 110, unit: 'Piece', packSize: '10 Pieces Pack', minWholesaleQty: 30,
    stock: 1100, stockStatus: 'in_stock', rating: 4.8, reviewsCount: 52,
    featured: true, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['fountain pen', 'dollar pen', 'school ink', 'urdu bazar'],
    desc: 'The iconic Dollar 717i piston-fill fountain pen with transparent ink window and stainless steel iridium-point nib. Pakistan school staple.',
    img: 'https://images.unsplash.com/photo-1595180879685-618797f3747d?auto=format&fit=crop&w=700&q=80',
    specs: { 'Filling System': 'Piston converter built-in', 'Nib': 'Iridium Point M', 'Window': 'Clear reservoir' }
  },
  {
    id: 'lsm-018', name: 'Refillable Ball Pen', slug: 'refillable-ball-pen', sku: 'LSM-PEN-REF-018',
    category: 'Pens & Writing', subcategory: 'Ballpoint Pens', brand: 'Piano',
    price: 60, wholesalePrice: 45, compareAtPrice: 75, unit: 'Piece', packSize: '10 Pieces Pack', minWholesaleQty: 40,
    stock: 900, stockStatus: 'in_stock', rating: 4.6, reviewsCount: 16,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['refillable', 'ball pen', 'eco-friendly'],
    desc: 'Sustainable refillable ballpoint pen with replaceable cross-standard ink cartridge and durable click action mechanism.',
    img: 'https://images.unsplash.com/photo-1565636401323-5e2a22fd9e5b?auto=format&fit=crop&w=700&q=80',
    specs: { 'Refill Type': 'Standard jumbo refill', 'Tip': '0.7mm', 'Warranty': 'Mechanism tested' }
  },
  {
    id: 'lsm-019', name: 'Student Ball Pen Pack', slug: 'student-ball-pen-pack', sku: 'LSM-PEN-STU-019',
    category: 'Pens & Writing', subcategory: 'Multipacks', brand: 'Dollar',
    price: 320, wholesalePrice: 250, compareAtPrice: 380, unit: 'Pack', packSize: '12 Pieces Pack', minWholesaleQty: 24,
    stock: 1300, stockStatus: 'in_stock', rating: 4.8, reviewsCount: 45,
    featured: false, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['student pack', '12 pens', 'back to school'],
    desc: 'Cost-effective pack of 12 durable student ballpoint pens specially manufactured for prolonged study sessions.',
    img: 'https://images.unsplash.com/photo-1595180879685-618797f3747d?auto=format&fit=crop&w=700&q=80',
    specs: { 'Quantity': '12 pens', 'Assorted': '10 Blue, 2 Black', 'Grade': 'School approved' }
  },
  {
    id: 'lsm-020', name: 'Office Ball Pen Box', slug: 'office-ball-pen-box', sku: 'LSM-PEN-BOX-020',
    category: 'Pens & Writing', subcategory: 'Wholesale Boxes', brand: 'Dollar',
    price: 1150, wholesalePrice: 920, compareAtPrice: 1350, unit: 'Box', packSize: '50 Pieces Box', minWholesaleQty: 10,
    stock: 450, stockStatus: 'in_stock', rating: 4.9, reviewsCount: 68,
    featured: true, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['box of 50', 'wholesale box', 'office bulk', 'urdu bazar'],
    desc: 'Master commercial box of 50 Dollar ball pens. Standard procurement pack for banks, corporate offices, and educational institutions.',
    img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=700&q=80',
    specs: { 'Quantity': '50 pieces', 'Carton': 'Display carton box', 'Ink': 'High capacity reservoir' }
  }
];

export function getRawProductsPart1(): RawItem[] {
  return rawProducts;
}
