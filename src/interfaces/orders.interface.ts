export default interface Order {
  id?: number;
  userId: number;
}

export interface OrderGetAllResponse {
  id: number,
  userId: number,
  products: number;
}