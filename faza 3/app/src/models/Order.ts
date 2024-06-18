// create an order model, each order has user, cake, queantity, price per cake, total price, and status

export class Order {
  constructor(
    public username,
    public sweets: {
      cakeName: string;
      quantity: number;
      pricePerCake: number;
      totalPrice: number;
    }[],
    public status: string,
    public id: number
  ) {}
}
