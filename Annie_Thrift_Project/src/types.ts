export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  category: 'gift-boxes' | 'boulangerie' | 'morning-suite' | 'celebration-cakes';
}

export interface Category {
  id: string;
  name: string;
  description: string;
}
