export interface Product {
  id: number;
  vendor: string;
  name: string;
  imageSrc: string;
  price: number;
  tag: string;
  index: string;
  compareAtPrice: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  options: Option[];
}
interface Option {
  id: number;
  size: string;
}
export interface DisplayProduct {
  products: Product[];
  totalPages: number;
  totalRecords: number;
  isLoading: boolean;
}
export interface ProductExists {
    productId: number;
    quantity: number;
    size: {
      id: number;
      size: string;
    };
  }