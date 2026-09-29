// Verified, high-resolution photography URLs for stationery items
export const CATEGORY_FALLBACK_IMAGES: Record<string, string[]> = {
  'Pens & Writing': [
    'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1565636401323-5e2a22fd9e5b?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1595180879685-618797f3747d?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80'
  ],
  'Pencils': [
    'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1584679109597-c656b19974c9?auto=format&fit=crop&w=700&q=80'
  ],
  'Notebooks & Registers': [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=700&q=80'
  ],
  'Paper Products': [
    'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=700&q=80'
  ],
  'Files & Folders': [
    'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=700&q=80'
  ],
  'Markers & Highlighters': [
    'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=700&q=80'
  ],
  'School Supplies': [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=700&q=80'
  ],
  'Art & Craft': [
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=700&q=80'
  ],
  'Office & Desk Accessories': [
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=700&q=80'
  ],
  'Adhesives & Packaging': [
    'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=700&q=80'
  ],
  'Wholesale Packs': [
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80'
  ],
  'Geometry & Math': [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=700&q=80'
  ],
  'Printing Supplies': [
    'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=700&q=80'
  ]
};

export function getStationeryImage(category?: string, index: number = 0): string {
  if (category && CATEGORY_FALLBACK_IMAGES[category]) {
    const list = CATEGORY_FALLBACK_IMAGES[category];
    return list[index % list.length];
  }
  return 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=700&q=80';
}
