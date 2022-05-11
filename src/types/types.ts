export interface NewShoe {
  brand: string;
  name: string;
  size: number;
  price: number;
  releaseDate: string;
}

export interface Shoe extends NewShoe {
  id: number;
}
