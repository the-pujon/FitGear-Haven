export interface Order {
  totalAmount: number;
  paymentMethod: "COD" | "Stripe";
  status?: "Pending" | "Completed" | "Cancelled";
  city: string;
  address: string;
  phone: string;
  email: string;
  products: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}
