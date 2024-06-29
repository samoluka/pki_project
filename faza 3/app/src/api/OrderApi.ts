import orders from "../data/orders.json";
import { Order } from "../models/Order";
import { NotificationApi } from "./NotificationApi";

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
      this.allOrders = orders;
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

  public acceptOrder(order: Order) {
    const index = this.allOrders.findIndex((o) => o.id === order.id);
    if (index !== -1) {
      this.allOrders[index].status = "Prihvaćena";
      localStorage.setItem("orders", JSON.stringify(this.allOrders));
    }
    NotificationApi.getInstance().addNotification({
      username: order.username,
      order_id: order.id,
    });
  }

  public declineOrder(order: Order) {
    const index = this.allOrders.findIndex((o) => o.id === order.id);
    if (index !== -1) {
      this.allOrders[index].status = "Odbijena";
      localStorage.setItem("orders", JSON.stringify(this.allOrders));
    }
    NotificationApi.getInstance().addNotification({
      username: order.username,
      order_id: order.id,
    });
  }

  public deleteOrder(order: Order) {
    const index = this.allOrders.findIndex((o) => o.id === order.id);
    if (index !== -1) {
      this.allOrders.splice(index, 1);
      localStorage.setItem("orders", JSON.stringify(this.allOrders));
    }
  }

  public getAllOrdersForUser(username: string) {
    return this.allOrders.filter((order) => order.username === username);
  }

  public getAllOrders() {
    return this.allOrders;
  }
}
