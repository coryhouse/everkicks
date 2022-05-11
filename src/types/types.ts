export type Shoe = {
  brand: string;
  name: string;
  // Exercise 1: Add these fields to ManageShoe.
  // Display them on both ManageShoe and Home.
  size: number;
  price: number;
  releaseDate: string;
};

export type ReplaceTypes<T, V> = { [K in keyof T]: T[K] extends Array<infer U> ? ReplaceTypes<U, V>[] : V };