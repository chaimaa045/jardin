export type CategoryId =
  | 'all'
  | 'jardins'
  | 'villas'
  | 'cafe-resto'
  | 'chantiers'
  | 'transport'
  | 'cascades'
  | 'plantes'
  | 'poterie';

export interface Category {
  id: CategoryId;
  label: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  categoryId: CategoryId;
  coverImage: string; 
  gallery: string[];  
  description: string;
}

export const getPortfolioCategories = (t: any): Category[] => [
  { id: 'all', label: t('Portfolio.categories.all') },
  { id: 'jardins', label: t('Portfolio.categories.jardins') },
  { id: 'villas', label: t('Portfolio.categories.villas') },
  { id: 'cafe-resto', label: t('Portfolio.categories.cafe-resto') },
  { id: 'cascades', label: t('Portfolio.categories.cascades') },
  { id: 'plantes', label: t('Portfolio.categories.plantes') },
  { id: 'poterie', label: t('Portfolio.categories.poterie') },
  { id: 'chantiers', label: t('Portfolio.categories.chantiers') },
  { id: 'transport', label: t('Portfolio.categories.transport') },
];

export const getPortfolioItems = (t: any): PortfolioItem[] => [
  {
    id: '1',
    title: t('Portfolio.items.1.title'),
    category: t('Portfolio.items.1.category'),
    categoryId: 'jardins',
    coverImage: '/images/jardins/jar1.jpeg',
    gallery: ['/images/jardins/jar1.jpeg',
       '/images/jardins/jar2.jpeg',
        '/images/jardins/jar3.jpeg', '/images/jardins/fac.jpeg', '/images/jardins/jar4.jpeg',
        '/images/jardins/jar5.jpeg', '/images/jardins/jar6.jpeg', '/images/jardins/jar7.jpeg',
        '/images/jardins/jar8.jpeg', '/images/jardins/jar9.jpeg', '/images/jardins/jar10.jpeg',
        '/images/jardins/jar11.jpeg', '/images/jardins/jar12.jpeg', '/images/jardins/jar13.jpeg',
        '/images/jardins/jar14.jpeg', '/images/jardins/jar15.jpeg', '/images/jardins/jar99.jpeg',
        '/images/jardins/jar999.jpeg',
      ],
    description: t('Portfolio.items.1.description'),
  },
  {
    id: '2',
    title: t('Portfolio.items.2.title'),
    category: t('Portfolio.items.2.category'),
    categoryId: 'villas',
    coverImage: '/images/villa/villa1.jpeg',
    gallery: ['/images/villa/villa1.jpeg',
      '/images/villa/villa2.jpeg', '/images/villa/villa3.jpeg', '/images/villa/villa4.jpeg',
    ],
    description: t('Portfolio.items.2.description'),
  },
  {
    id: '3',
    title: t('Portfolio.items.3.title'),
    category: t('Portfolio.items.3.category'),
    categoryId: 'plantes',
    coverImage: '/images/pots_plantes/cov.jpeg',
    gallery: ['/images/pots_plantes/cov.jpeg',
      '/images/pots_plantes/pl11.jpeg', '/images/pots_plantes/pl33.jpeg', '/images/pots_plantes/pl44.jpeg',
      '/images/pots_plantes/pl66.jpeg', 
      '/images/pots_plantes/pl1.jpeg', '/images/pots_plantes/pl2.jpeg', '/images/pots_plantes/pl3.jpeg',
      '/images/pots_plantes/pl5.jpeg', '/images/pots_plantes/pl8.jpeg',

    ],
    description: t('Portfolio.items.3.description'),
  },
  {
    id: '4',
    title: t('Portfolio.items.4.title'),
    category: t('Portfolio.items.4.category'),
    categoryId: 'cafe-resto',
    coverImage: '/images/cafe/caf1.jpeg',
    gallery: ['/images/cafe/caf1.jpeg',
      '/images/cafe/caf2.jpeg', '/images/cafe/caf3.jpeg', '/images/cafe/caf4.jpeg',
      '/images/cafe/caf5.jpeg', '/images/cafe/caf6.jpeg', '/images/cafe/caf7.jpeg',


    ],
    description: t('Portfolio.items.4.description'),
  },
  {
    id: '5',
    title: t('Portfolio.items.5.title'),
    category: t('Portfolio.items.5.category'),
    categoryId: 'chantiers',
    coverImage: '/images/chantiers/eq1.jpeg',
    gallery: ['/images/chantiers/eq1.jpeg',
      '/images/chantiers/eq2.jpeg', '/images/chantiers/eq3.jpeg', '/images/chantiers/prq.jpeg',
      '/images/chantiers/eq4.jpeg', '/images/chantiers/eq5.jpeg', '/images/chantiers/eq6.jpeg',
      '/images/chantiers/eq7.jpeg', '/images/chantiers/eq8.jpeg', '/images/chantiers/eq9.jpeg',
      '/images/chantiers/eq10.jpeg', '/images/chantiers/eq11.jpeg', '/images/chantiers/eq12.jpeg',
      '/images/chantiers/eq13.jpeg', '/images/chantiers/eq14.jpeg', '/images/chantiers/eq15.jpeg',  
      '/images/chantiers/eq16.jpeg', '/images/chantiers/eq17.jpeg',

    ],
    description: t('Portfolio.items.5.description'),
  },
  {
    id: '6',
    title: t('Portfolio.items.6.title'),
    category: t('Portfolio.items.6.category'),
    categoryId: 'transport',
    coverImage: '/images/transport/trans1.jpeg',
    gallery: ['/images/transport/trans1.jpeg', 
      '/images/transport/trans2.jpeg', '/images/transport/trans3.jpeg', '/images/transport/trans4.jpeg',

    ],
    description: t('Portfolio.items.6.description'),
  },
  {
    id: '7',
    title: t('Portfolio.items.7.title'),
    category: t('Portfolio.items.7.category'),
    categoryId: 'poterie',
    coverImage: '/images/potterie/cov.jpeg',
    gallery: ['/images/potterie/cov.jpeg',
      '/images/potterie/p2.jpeg', '/images/potterie/p3.jpeg', '/images/potterie/p4.jpeg',
      '/images/potterie/p5.jpeg', '/images/potterie/p6.jpeg', '/images/potterie/p7.jpeg',
      '/images/potterie/p666.jpeg', '/images/potterie/p8.jpeg',
    ],
    description: t('Portfolio.items.7.description'),
  },
  {
    id: '8',
    title: t('Portfolio.items.8.title'),
    category: t('Portfolio.items.8.category'),
    categoryId: 'cascades',
    coverImage: '/images/cascade/c1.jpeg',
    gallery: ['/images/cascade/c1.jpeg',
      '/images/cascade/c2.jpeg', '/images/cascade/c3.jpeg',
      

    ],
    description: t('Portfolio.items.8.description'),
  },
];
























































// ///////////////////////
// // 1. Fonction pour récupérer les catégories traduites
// export const getPortfolioCategories = (t: any): Category[] => [
//   { id: 'all', label: t('categories.all') },
//   { id: 'jardins', label: t('categories.jardins') },
//   { id: 'villas', label: t('categories.villas') },
//   { id: 'cafe-resto', label: t('categories.cafe-resto') },
//   { id: 'cascades', label: t('categories.cascades') },
//   { id: 'plantes', label: t('categories.plantes') },
//   { id: 'poterie', label: t('categories.poterie') },
//   { id: 'chantiers', label: t('categories.chantiers') },
//   { id: 'transport', label: t('categories.transport') },
// ];

// // 2. Fonction pour récupérer les projets traduits
// export const getPortfolioItems = (t: any): PortfolioItem[] => [
//   {
//     id: '1',
//     title: t('items.1.title'),
//     category: t('items.1.category'),
//     categoryId: 'jardins',
//     coverImage: '/images/jardins/jar1.jpeg',
//     gallery: [
//       '/images/jardins/jar1.jpeg', '/images/jardins/jar2.jpeg', '/images/jardins/jar3.jpeg',
//       '/images/jardins/fac.jpeg', '/images/jardins/jar4.jpeg', '/images/jardins/jar5.jpeg',
//       '/images/jardins/jar6.jpeg', '/images/jardins/jar7.jpeg', '/images/jardins/jar8.jpeg',
//       '/images/jardins/jar9.jpeg', '/images/jardins/jar10.jpeg', '/images/jardins/jar11.jpeg',
//       '/images/jardins/jar12.jpeg', '/images/jardins/jar13.jpeg', '/images/jardins/jar14.jpeg',
//       '/images/jardins/jar15.jpeg', '/images/jardins/jar99.jpeg', '/images/jardins/jar999.jpeg',
//     ],
//     description: t('items.1.description'),
//   },
//   {
//     id: '2',
//     title: t('items.2.title'),
//     category: t('items.2.category'),
//     categoryId: 'villas',
//     coverImage: '/images/villa/villa1.jpeg',
//     gallery: [
//       '/images/villa/villa1.jpeg', '/images/villa/villa2.jpeg',
//       '/images/villa/villa3.jpeg', '/images/villa/villa4.jpeg',
//     ],
//     description: t('items.2.description'),
//   },
//   {
//     id: '3',
//     title: t('items.3.title'),
//     category: t('items.3.category'),
//     categoryId: 'plantes',
//     coverImage: '/images/pots_plantes/cov.jpeg',
//     gallery: [
//       '/images/pots_plantes/cov.jpeg', '/images/pots_plantes/pl11.jpeg', '/images/pots_plantes/pl33.jpeg',
//       '/images/pots_plantes/pl44.jpeg', '/images/pots_plantes/pl66.jpeg', '/images/pots_plantes/pl5.jpeg',
//       '/images/pots_plantes/pl6.jpeg', '/images/pots_plantes/pl1.jpeg', '/images/pots_plantes/pl2.jpeg',
//       '/images/pots_plantes/pl3.jpeg', '/images/pots_plantes/pl5.jpeg', '/images/pots_plantes/pl8.jpeg',
//     ],
//     description: t('items.3.description'),
//   },
//   {
//     id: '4',
//     title: t('items.4.title'),
//     category: t('items.4.category'),
//     categoryId: 'cafe-resto',
//     coverImage: '/images/cafe/caf1.jpeg',
//     gallery: [
//       '/images/cafe/caf1.jpeg', '/images/cafe/caf2.jpeg', '/images/cafe/caf3.jpeg',
//       '/images/cafe/caf4.jpeg', '/images/cafe/caf5.jpeg', '/images/cafe/caf6.jpeg',
//       '/images/cafe/caf7.jpeg',
//     ],
//     description: t('items.4.description'),
//   },
//   {
//     id: '5',
//     title: t('items.5.title'),
//     category: t('items.5.category'),
//     categoryId: 'chantiers',
//     coverImage: '/images/chantiers/eq1.jpeg',
//     gallery: [
//       '/images/chantiers/eq2.jpeg', '/images/chantiers/eq1.jpeg', '/images/chantiers/eq3.jpeg',
//       '/images/chantiers/prq.jpeg', '/images/chantiers/eq4.jpeg', '/images/chantiers/eq5.jpeg',
//       '/images/chantiers/eq6.jpeg', '/images/chantiers/eq7.jpeg', '/images/chantiers/eq8.jpeg',
//       '/images/chantiers/eq9.jpeg', '/images/chantiers/eq10.jpeg', '/images/chantiers/eq11.jpeg',
//       '/images/chantiers/eq12.jpeg', '/images/chantiers/eq13.jpeg', '/images/chantiers/eq14.jpeg',
//       '/images/chantiers/eq15.jpeg', '/images/chantiers/eq16.jpeg', '/images/chantiers/eq17.jpeg',
//     ],
//     description: t('items.5.description'),
//   },
//   {
//     id: '6',
//     title: t('items.6.title'),
//     category: t('items.6.category'),
//     categoryId: 'transport',
//     coverImage: '/images/transport/trans1.jpeg',
//     gallery: [
//       '/images/transport/trans1.jpeg', '/images/transport/trans2.jpeg',
//       '/images/transport/trans3.jpeg', '/images/transport/trans4.jpeg',
//     ],
//     description: t('items.6.description'),
//   },
//   {
//     id: '7',
//     title: t('items.7.title'),
//     category: t('items.7.category'),
//     categoryId: 'poterie',
//     coverImage: '/images/potterie/cov.jpeg',
//     gallery: [
//       '/images/potterie/cov.jpeg', '/images/potterie/p2.jpeg', '/images/potterie/p3.jpeg',
//       '/images/potterie/p4.jpeg', '/images/potterie/p5.jpeg', '/images/potterie/p6.jpeg',
//       '/images/potterie/p666.jpeg', '/images/potterie/p7.jpeg', '/images/potterie/p8.jpeg',
//     ],
//     description: t('items.7.description'),
//   },
//   {
//     id: '8',
//     title: t('items.8.title'),
//     category: t('items.8.category'),
//     categoryId: 'cascades',
//     coverImage: '/images/cascade/c1.jpeg',
//     gallery: [
//       '/images/cascade/c1.jpeg', '/images/cascade/c2.jpeg', '/images/cascade/c3.jpeg',
//     ],
//     description: t('items.8.description'),
//   },
// ];