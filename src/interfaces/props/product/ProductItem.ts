export interface ProductItemProps {
  className: string;
  id: number;
  image_src: string;
  vendor: string;
  name: string;
  price: number;
  compareAtPrice: number;
  options: { id: number; size: string }[];
}
