export const productsPart2 = [
  // 2. Pencils (12 products)
  {
    id: 'lsm-021', name: 'Faber-Castell HB Pencil', slug: 'faber-castell-hb-pencil', sku: 'LSM-PNC-FC-HB-021',
    category: 'Pencils', subcategory: 'Graphite Pencils', brand: 'Faber-Castell',
    price: 35, wholesalePrice: 27, compareAtPrice: 40, unit: 'Piece', packSize: '12 Pieces Pack', minWholesaleQty: 36,
    stock: 2200, stockStatus: 'in_stock' as const, rating: 4.9, reviewsCount: 74,
    featured: true, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['faber castell', 'hb pencil', 'sv bonding', 'urdu bazar'],
    desc: 'Original Faber-Castell classic HB pencil featuring SV break-resistant lead bonding and responsibly harvested cedar wood.',
    img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80',
    specs: { 'Grade': 'HB', 'Bonding': 'SV Secural', 'Wood': 'Certified Sustainable' }
  },
  {
    id: 'lsm-022', name: 'Dux HB Pencil', slug: 'dux-hb-pencil', sku: 'LSM-PNC-DUX-022',
    category: 'Pencils', subcategory: 'Graphite Pencils', brand: 'Dux',
    price: 25, wholesalePrice: 18, compareAtPrice: 30, unit: 'Piece', packSize: '12 Pieces Pack', minWholesaleQty: 50,
    stock: 3100, stockStatus: 'in_stock' as const, rating: 4.7, reviewsCount: 50,
    featured: false, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['dux', 'hb pencil', 'school pencil', 'cheap pencil'],
    desc: 'Trusted Pakistani brand Dux premium quality HB pencils. Easy to sharpen, dark graphite mark, loved by elementary schools.',
    img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80',
    specs: { 'Grade': 'HB #2', 'Eraser Tip': 'Red rubber ferrule', 'Pack': '12 pieces' }
  },
  {
    id: 'lsm-023', name: 'Dollar HB Pencil', slug: 'dollar-hb-pencil', sku: 'LSM-PNC-DOL-023',
    category: 'Pencils', subcategory: 'Graphite Pencils', brand: 'Dollar',
    price: 25, wholesalePrice: 19, compareAtPrice: 30, unit: 'Piece', packSize: '12 Pieces Pack', minWholesaleQty: 50,
    stock: 2500, stockStatus: 'in_stock' as const, rating: 4.6, reviewsCount: 39,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['dollar', 'pencil', 'study supplies'],
    desc: 'Dollar hexagonal HB wooden pencils. Non-toxic, easy sharpening, dark black lines with minimal lead breakage.',
    img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80',
    specs: { 'Shape': 'Hexagonal', 'Core': 'High density graphite', 'Quantity': '12 per box' }
  },
  {
    id: 'lsm-024', name: 'Staedtler HB Pencil', slug: 'staedtler-hb-pencil', sku: 'LSM-PNC-STD-024',
    category: 'Pencils', subcategory: 'Graphite Pencils', brand: 'Staedtler',
    price: 85, wholesalePrice: 70, compareAtPrice: 100, unit: 'Piece', packSize: '12 Pieces Pack', minWholesaleQty: 24,
    stock: 800, stockStatus: 'in_stock' as const, rating: 5.0, reviewsCount: 48,
    featured: true, bestSeller: false, newArrival: true, wholesaleAvailable: true,
    tags: ['staedtler', 'noris pencil', 'germany', 'drawing'],
    desc: 'Genuine German Staedtler Noris striped HB pencil. Exceptionally break resistant super-bonded lead for fine drafting.',
    img: 'https://images.unsplash.com/photo-1584679109597-c656b19974c9?auto=format&fit=crop&w=700&q=80',
    specs: { 'Origin': 'Germany', 'Stripes': 'Yellow & Black', 'Lead': 'Super-bonded' }
  },
  {
    id: 'lsm-025', name: 'Faber-Castell 2B Pencil', slug: 'faber-castell-2b-pencil', sku: 'LSM-PNC-FC-2B-025',
    category: 'Pencils', subcategory: 'Drawing Pencils', brand: 'Faber-Castell',
    price: 45, wholesalePrice: 35, compareAtPrice: 55, unit: 'Piece', packSize: '12 Pieces Pack', minWholesaleQty: 24,
    stock: 1200, stockStatus: 'in_stock' as const, rating: 4.9, reviewsCount: 56,
    featured: false, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['faber castell', '2b pencil', 'exam scanner', 'sketching'],
    desc: 'Soft dark 2B lead pencil recommended for computerized OMR answer sheet scanning, shading, and freehand sketching.',
    img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80',
    specs: { 'Grade': '2B Dark Soft', 'OMR Scanner Approved': 'Yes' }
  },
  {
    id: 'lsm-026', name: 'Drawing Pencil Set', slug: 'drawing-pencil-set', sku: 'LSM-PNC-DRW-026',
    category: 'Pencils', subcategory: 'Art Sets', brand: 'Faber-Castell',
    price: 380, wholesalePrice: 310, compareAtPrice: 450, unit: 'Set', packSize: 'Set of 6 Pencils', minWholesaleQty: 15,
    stock: 450, stockStatus: 'in_stock' as const, rating: 4.8, reviewsCount: 31,
    featured: true, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['drawing set', 'sketch set', 'hb 2b 4b 6b'],
    desc: 'Artist graded drawing pencil set containing 2H, HB, B, 2B, 4B, and 6B tonal pencils in a protective metal tin.',
    img: 'https://images.unsplash.com/photo-1584679109597-c656b19974c9?auto=format&fit=crop&w=700&q=80',
    specs: { 'Gradations': '2H to 6B', 'Container': 'Slim tin box' }
  },
  {
    id: 'lsm-027', name: 'Sketch Pencil Set', slug: 'sketch-pencil-set', sku: 'LSM-PNC-SKT-027',
    category: 'Pencils', subcategory: 'Art Sets', brand: 'Staedtler',
    price: 750, wholesalePrice: 620, compareAtPrice: 890, unit: 'Set', packSize: 'Set of 12 Pencils', minWholesaleQty: 10,
    stock: 220, stockStatus: 'in_stock' as const, rating: 5.0, reviewsCount: 38,
    featured: false, bestSeller: false, newArrival: true, wholesaleAvailable: true,
    tags: ['staedtler sketch', '12 pencils', 'fine art'],
    desc: 'Comprehensive 12-degree graphite sketch set spanning 6B to 4H. Preferred by architecture students across Lahore NCA and PU.',
    img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80',
    specs: { 'Range': '4H, 3H, 2H, H, F, HB, B, 2B, 3B, 4B, 5B, 6B', 'Finish': 'Classic Blue' }
  },
  {
    id: 'lsm-028', name: 'Colored Pencil Set 12 Colors', slug: 'colored-pencil-set-12-colors', sku: 'LSM-PNC-COL-12-028',
    category: 'Pencils', subcategory: 'Color Pencils', brand: 'Dux',
    price: 180, wholesalePrice: 145, compareAtPrice: 220, unit: 'Set', packSize: '12 Colors Box', minWholesaleQty: 25,
    stock: 950, stockStatus: 'in_stock' as const, rating: 4.7, reviewsCount: 42,
    featured: false, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['colored pencils', '12 colors', 'dux colors'],
    desc: 'Bright and highly pigmented 12-color pencil set with smooth wax-oil binder. Non-toxic formulation safe for kids.',
    img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80',
    specs: { 'Colors Count': '12 Shades', 'Body': 'Hexagonal wood' }
  },
  {
    id: 'lsm-029', name: 'Colored Pencil Set 24 Colors', slug: 'colored-pencil-set-24-colors', sku: 'LSM-PNC-COL-24-029',
    category: 'Pencils', subcategory: 'Color Pencils', brand: 'Faber-Castell',
    price: 520, wholesalePrice: 420, compareAtPrice: 620, unit: 'Set', packSize: '24 Colors Box', minWholesaleQty: 15,
    stock: 420, stockStatus: 'in_stock' as const, rating: 4.9, reviewsCount: 49,
    featured: true, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['24 colors', 'faber castell colors', 'school art'],
    desc: 'Classic 24 brilliant color pencils with SV bonding preventing tip breakage even when dropped. Includes gold and silver tones.',
    img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80',
    specs: { 'Colors Count': '24 Shades', 'Special Pigments': 'Silver & Gold included' }
  },
  {
    id: 'lsm-030', name: 'Mechanical Pencil', slug: 'mechanical-pencil', sku: 'LSM-PNC-MEC-030',
    category: 'Pencils', subcategory: 'Mechanical Pencils', brand: 'Piano',
    price: 90, wholesalePrice: 70, compareAtPrice: 110, unit: 'Piece', packSize: 'Single Piece', minWholesaleQty: 30,
    stock: 680, stockStatus: 'in_stock' as const, rating: 4.6, reviewsCount: 23,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['mechanical pencil', 'clutch pencil', 'shaker'],
    desc: 'Sturdy ergonomic mechanical pencil with cushioned tip mechanism and concealed top eraser.',
    img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80',
    specs: { 'Lead Diameter': '0.7mm', 'Body': 'Soft rubberized barrel' }
  },
  {
    id: 'lsm-031', name: '0.5mm Mechanical Pencil', slug: '0-5mm-mechanical-pencil', sku: 'LSM-PNC-MEC05-031',
    category: 'Pencils', subcategory: 'Mechanical Pencils', brand: 'Pentel',
    price: 240, wholesalePrice: 195, compareAtPrice: 280, unit: 'Piece', packSize: 'Single Piece', minWholesaleQty: 20,
    stock: 350, stockStatus: 'in_stock' as const, rating: 4.9, reviewsCount: 37,
    featured: false, bestSeller: false, newArrival: true, wholesaleAvailable: true,
    tags: ['pentel 0.5', 'drafting pencil', 'fine pencil'],
    desc: 'Japanese Pentel 0.5mm precision mechanical pencil featuring a fixed 4mm metal drafting sleeve and knurled finger grip.',
    img: 'https://images.unsplash.com/photo-1584679109597-c656b19974c9?auto=format&fit=crop&w=700&q=80',
    specs: { 'Lead Diameter': '0.5mm Precision', 'Sleeve': '4mm fixed steel' }
  },
  {
    id: 'lsm-032', name: 'Mechanical Pencil Lead Pack', slug: 'mechanical-pencil-lead-pack', sku: 'LSM-PNC-LED-032',
    category: 'Pencils', subcategory: 'Accessories', brand: 'Faber-Castell',
    price: 80, wholesalePrice: 62, compareAtPrice: 100, unit: 'Pack', packSize: 'Tube of 24 Leads', minWholesaleQty: 40,
    stock: 1100, stockStatus: 'in_stock' as const, rating: 4.8, reviewsCount: 29,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['lead refill', '0.5mm lead', '0.7mm lead'],
    desc: 'Ultra-polymer extra-dark 2B / HB replacement leads for mechanical pencils. Resistant to breakage with smooth gliding formula.',
    img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80',
    specs: { 'Count': '24 leads per tube', 'Sizes': '0.5mm & 0.7mm available' }
  },

  // 3. Notebooks & Registers (15 products)
  {
    id: 'lsm-033', name: 'A4 Single Line Notebook', slug: 'a4-single-line-notebook', sku: 'LSM-NTB-A4S-033',
    category: 'Notebooks & Registers', subcategory: 'School Notebooks', brand: 'Bahadur',
    price: 180, wholesalePrice: 140, compareAtPrice: 220, unit: 'Book', packSize: '12 Books Pack', minWholesaleQty: 36,
    stock: 1400, stockStatus: 'in_stock' as const, rating: 4.8, reviewsCount: 46,
    featured: true, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['a4 notebook', 'single line', 'school copy', 'urdu bazar'],
    desc: '120-page A4 single line exercise book with high brightness 70 GSM paper. Smooth surface with clear margins for school homework.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    specs: { 'Pages': '120 Pages', 'Size': 'A4 (210 x 297mm)', 'Paper': '70 GSM White', 'Ruling': 'Single Line' }
  },
  {
    id: 'lsm-034', name: 'A4 Double Line Notebook', slug: 'a4-double-line-notebook', sku: 'LSM-NTB-A4D-034',
    category: 'Notebooks & Registers', subcategory: 'School Notebooks', brand: 'Bahadur',
    price: 180, wholesalePrice: 140, compareAtPrice: 220, unit: 'Book', packSize: '12 Books Pack', minWholesaleQty: 36,
    stock: 900, stockStatus: 'in_stock' as const, rating: 4.7, reviewsCount: 22,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['double line', 'urdu copy', 'elementary school'],
    desc: 'A4 double line notebook designed for early handwriting, Urdu and English script practice.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    specs: { 'Pages': '120 Pages', 'Ruling': 'Double Line Practice', 'Binding': 'Center staple' }
  },
  {
    id: 'lsm-035', name: 'A4 Plain Notebook', slug: 'a4-plain-notebook', sku: 'LSM-NTB-A4P-035',
    category: 'Notebooks & Registers', subcategory: 'Blank Notebooks', brand: 'Oxford Style',
    price: 190, wholesalePrice: 150, compareAtPrice: 230, unit: 'Book', packSize: '12 Books Pack', minWholesaleQty: 24,
    stock: 750, stockStatus: 'in_stock' as const, rating: 4.8, reviewsCount: 30,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['plain notebook', 'blank paper', 'diagram book'],
    desc: 'Unruled pure white A4 notebook suitable for biology diagrams, physics sketches, and project assignments.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    specs: { 'Pages': '140 Pages', 'Ruling': 'Plain Blank', 'Paper': '75 GSM' }
  },
  {
    id: 'lsm-036', name: 'A5 Spiral Notebook', slug: 'a5-spiral-notebook', sku: 'LSM-NTB-A5S-036',
    category: 'Notebooks & Registers', subcategory: 'Spiral Notebooks', brand: 'LSM Master',
    price: 220, wholesalePrice: 175, compareAtPrice: 270, unit: 'Book', packSize: '6 Books Pack', minWholesaleQty: 24,
    stock: 1200, stockStatus: 'in_stock' as const, rating: 4.9, reviewsCount: 58,
    featured: true, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['spiral notebook', 'a5', 'wirebound', 'college notebook'],
    desc: 'Twin-wire spiral bound A5 notebook with durable plastic frosted polypropylene cover and micro-perforated tear-out pages.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    specs: { 'Pages': '160 Pages', 'Size': 'A5', 'Binding': 'Twin-ring metal wire' }
  },
  {
    id: 'lsm-037', name: 'A5 Hard Cover Notebook', slug: 'a5-hard-cover-notebook', sku: 'LSM-NTB-A5H-037',
    category: 'Notebooks & Registers', subcategory: 'Hardcover Notebooks', brand: 'LSM Master',
    price: 380, wholesalePrice: 300, compareAtPrice: 450, unit: 'Book', packSize: 'Single Book', minWholesaleQty: 20,
    stock: 600, stockStatus: 'in_stock' as const, rating: 4.8, reviewsCount: 39,
    featured: false, bestSeller: false, newArrival: true, wholesaleAvailable: true,
    tags: ['hard cover', 'a5 diary', 'executive notes'],
    desc: 'Sturdy book-bound A5 hard cover notebook with ribbon bookmark and elastic closure strap. Suitable for corporate meeting logs.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    specs: { 'Cover': 'Hardbound PU Leatherette', 'Pages': '192 Ruled Pages', 'Paper': '80 GSM Ivory' }
  },
  {
    id: 'lsm-038', name: 'A5 Soft Cover Notebook', slug: 'a5-soft-cover-notebook', sku: 'LSM-NTB-A5C-038',
    category: 'Notebooks & Registers', subcategory: 'Softcover Notebooks', brand: 'Bahadur',
    price: 150, wholesalePrice: 115, compareAtPrice: 180, unit: 'Book', packSize: '12 Books Pack', minWholesaleQty: 36,
    stock: 850, stockStatus: 'in_stock' as const, rating: 4.6, reviewsCount: 24,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['soft cover', 'lightweight', 'flexible notebook'],
    desc: 'Lightweight flexible card cover A5 exercise copy easy to carry in backpacks and laptop sleeves.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    specs: { 'Cover': '300 GSM Laminated Card', 'Pages': '96 Pages' }
  },
  {
    id: 'lsm-039', name: 'College Notebook', slug: 'college-notebook', sku: 'LSM-NTB-COL-039',
    category: 'Notebooks & Registers', subcategory: 'College Registers', brand: 'Bahadur',
    price: 320, wholesalePrice: 250, compareAtPrice: 380, unit: 'Book', packSize: '6 Books Pack', minWholesaleQty: 24,
    stock: 920, stockStatus: 'in_stock' as const, rating: 4.8, reviewsCount: 41,
    featured: true, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['college register', 'large copy', 'pakistan college'],
    desc: 'Heavy-duty 240-page college register with stitched spine and water-resistant glazed cover. Ideal for science and engineering students.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    specs: { 'Pages': '240 Pages', 'Spine': 'Thread sewn + tape reinforced', 'Paper': '70 GSM' }
  },
  {
    id: 'lsm-040', name: 'School Notebook', slug: 'school-notebook', sku: 'LSM-NTB-SCH-040',
    category: 'Notebooks & Registers', subcategory: 'School Notebooks', brand: 'Bahadur',
    price: 140, wholesalePrice: 105, compareAtPrice: 170, unit: 'Book', packSize: '12 Books Pack', minWholesaleQty: 48,
    stock: 2800, stockStatus: 'in_stock' as const, rating: 4.7, reviewsCount: 65,
    featured: false, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['school copy', 'urdu copy', 'english copy'],
    desc: 'Standard curriculum school notebook with name slip and schedule timetable printed on inside cover.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    specs: { 'Pages': '96 Pages', 'Size': 'Standard School (18x24cm)' }
  },
  {
    id: 'lsm-041', name: 'Executive Notebook', slug: 'executive-notebook', sku: 'LSM-NTB-EXE-041',
    category: 'Notebooks & Registers', subcategory: 'Executive Diaries', brand: 'LSM Master',
    price: 650, wholesalePrice: 520, compareAtPrice: 780, unit: 'Book', packSize: 'Single Piece', minWholesaleQty: 10,
    stock: 310, stockStatus: 'in_stock' as const, rating: 4.9, reviewsCount: 35,
    featured: true, bestSeller: false, newArrival: true, wholesaleAvailable: true,
    tags: ['executive notebook', 'pen holder', 'leatherette'],
    desc: 'Luxury corporate executive planner with built-in pen holder loop, expandable rear document pocket and gilded paper edges.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    specs: { 'Pages': '224 Pages', 'Paper': '85 GSM Cream Eye-Protecting', 'Cover': 'Thermal PU' }
  },
  {
    id: 'lsm-042', name: 'Premium Journal', slug: 'premium-journal', sku: 'LSM-NTB-JRN-042',
    category: 'Notebooks & Registers', subcategory: 'Journals', brand: 'Oxford Style',
    price: 550, wholesalePrice: 440, compareAtPrice: 650, unit: 'Book', packSize: 'Single Piece', minWholesaleQty: 12,
    stock: 240, stockStatus: 'in_stock' as const, rating: 5.0, reviewsCount: 29,
    featured: false, bestSeller: false, newArrival: true, wholesaleAvailable: true,
    tags: ['journal', 'bullet journal', 'dotted notebook'],
    desc: 'Dot-grid 5mm premium creative journal crafted for bullet journaling, calligraphy, and thought planning. Zero ink bleed-through.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    specs: { 'Grid': '5mm Dotted Matrix', 'Paper': '100 GSM Acid-free', 'Pages': '160 Pages' }
  },
  {
    id: 'lsm-043', name: 'Business Notebook', slug: 'business-notebook', sku: 'LSM-NTB-BUS-043',
    category: 'Notebooks & Registers', subcategory: 'Office Registers', brand: 'LSM Master',
    price: 420, wholesalePrice: 340, compareAtPrice: 500, unit: 'Book', packSize: 'Pack of 3', minWholesaleQty: 15,
    stock: 480, stockStatus: 'in_stock' as const, rating: 4.8, reviewsCount: 21,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['business notes', 'office stationery', 'ruled pad'],
    desc: 'Professional wire-bound presentation notebook with date header, action items margin and quick reference calendars.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    specs: { 'Pages': '160 Pages', 'Layout': 'Action item & meeting notes' }
  },
  {
    id: 'lsm-044', name: 'Pocket Notebook', slug: 'pocket-notebook', sku: 'LSM-NTB-PKT-044',
    category: 'Notebooks & Registers', subcategory: 'Pocket Pads', brand: 'Bahadur',
    price: 70, wholesalePrice: 52, compareAtPrice: 90, unit: 'Piece', packSize: 'Pack of 5', minWholesaleQty: 30,
    stock: 1500, stockStatus: 'in_stock' as const, rating: 4.6, reviewsCount: 18,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['pocket book', 'mini memo', 'reporter pad'],
    desc: 'Handy pocket size (3.5 x 5.5 inch) reporter memo notebook with rounded corners and sturdy backing board.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    specs: { 'Size': '9 x 14 cm', 'Pages': '80 Pages', 'Binding': 'Top spiral' }
  },
  {
    id: 'lsm-045', name: 'Drawing Notebook', slug: 'drawing-notebook', sku: 'LSM-NTB-DRW-045',
    category: 'Notebooks & Registers', subcategory: 'Drawing Books', brand: 'Oxford Style',
    price: 240, wholesalePrice: 190, compareAtPrice: 290, unit: 'Book', packSize: '6 Books Pack', minWholesaleQty: 24,
    stock: 670, stockStatus: 'in_stock' as const, rating: 4.8, reviewsCount: 33,
    featured: false, bestSeller: false, newArrival: false, wholesaleAvailable: true,
    tags: ['drawing book', 'art paper', 'heavy weight'],
    desc: 'A4 landscape drawing notebook with thick cartridge paper suitable for colored pencils, crayons and light water wash.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    specs: { 'Pages': '48 Heavy Cartridge Pages', 'Paper Weight': '120 GSM', 'Orientation': 'Landscape' }
  },
  {
    id: 'lsm-046', name: 'Sketch Book', slug: 'sketch-book', sku: 'LSM-NTB-SKT-046',
    category: 'Notebooks & Registers', subcategory: 'Sketch Books', brand: 'Oxford Style',
    price: 490, wholesalePrice: 390, compareAtPrice: 580, unit: 'Book', packSize: 'Single Book', minWholesaleQty: 12,
    stock: 390, stockStatus: 'in_stock' as const, rating: 4.9, reviewsCount: 44,
    featured: false, bestSeller: false, newArrival: true, wholesaleAvailable: true,
    tags: ['sketch book', 'hardcover sketchbook', 'fine art'],
    desc: 'Spiral bound heavy-weight sketch pad featuring 150 GSM micro-textured paper for charcoal, pastels and ink sketches.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    specs: { 'Pages': '80 Sheets', 'Paper': '150 GSM Textured Artist White' }
  },
  {
    id: 'lsm-047', name: 'Spiral Register', slug: 'spiral-register', sku: 'LSM-NTB-REG-047',
    category: 'Notebooks & Registers', subcategory: 'Office Registers', brand: 'Bahadur',
    price: 360, wholesalePrice: 285, compareAtPrice: 420, unit: 'Book', packSize: '6 Books Pack', minWholesaleQty: 20,
    stock: 820, stockStatus: 'in_stock' as const, rating: 4.7, reviewsCount: 37,
    featured: true, bestSeller: true, newArrival: false, wholesaleAvailable: true,
    tags: ['spiral register', 'accounting register', 'urdu bazar'],
    desc: '300-page extra-large spiral register with divider tabs. Widely used in Urdu Bazar wholesale shops for daily sales ledgers.',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    specs: { 'Pages': '300 Pages', 'Dividers': '3 Plastic index sections', 'Size': '21 x 33 cm' }
  }
];
