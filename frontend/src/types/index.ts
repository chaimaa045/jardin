export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  icon?: string;
  image?: string;
  slug: string;
}

export interface Project {
  id: string;
  title: string;
  // On remplace les 4 anciennes catégories par 'string' 
  // pour accepter toutes vos nouvelles catégories (Riads, Poterie, Cascades, etc.)
  category: string; 
  description: string;
  // On remplace 'image' par 'coverImage' pour correspondre au nouveau système
  coverImage: string; 
  // On ajoute le tableau pour la Lightbox
  gallery: string[]; 
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}
