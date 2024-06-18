import { Order } from "../models/Order";

export class OrderApi {
  private allOrders: Order[];
  private static instance: OrderApi;
  public static getInstance() {
    if (!OrderApi.instance) {
      OrderApi.instance = new OrderApi();
    }
    return OrderApi.instance;
  }
  private constructor() {
    const ordersString = localStorage.getItem("orders");
    if (ordersString) {
      this.allOrders = JSON.parse(ordersString);
    } else {
      this.allOrders = [];
      localStorage.setItem("orders", JSON.stringify(this.allOrders));
    }
  }

  public getCurrentOrder() {
    // get the current order from local storage
    const orderString = localStorage.getItem("order");
    return orderString ? JSON.parse(orderString) : undefined;
  }

  public updateCurrentOrder(order: Order) {
    localStorage.setItem("order", JSON.stringify(order));
  }

  public addOrder(order: Order) {
    this.allOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(this.allOrders));
    // empty the current order
    localStorage.removeItem("order");
  }

  public getAllOrdersForUser(username: string) {
    return this.allOrders.filter((order) => order.username === username);
  }
}
