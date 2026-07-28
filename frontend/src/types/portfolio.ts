export interface PortfolioCategory {
  id: number;
  name: string;
  slug: string;
}

export interface PortfolioCategoryFormData {
  name: string;
  slug: string;
}

export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  gallery: string[];
  category: PortfolioCategory;
}

export interface PortfolioProjectFormData {
  title: string;
  description: string;
  coverImage: string;
  gallery: string[];
  categoryId: number;
}
