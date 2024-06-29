import { OrderNotification } from "../models/OrderNotification";

export class NotificationApi {
  private static instance: NotificationApi;
  private notifications: OrderNotification[];

  static getInstance() {
    if (!NotificationApi.instance) {
      NotificationApi.instance = new NotificationApi();
    }
    return NotificationApi.instance;
  }

  constructor() {
    // read from local storage
    const notifications = localStorage.getItem("notifications");
    if (notifications) {
      this.notifications = JSON.parse(notifications);
    } else {
      this.notifications = [];
    }
    // write to local storage
    this.saveNotifications();
  }

  private saveNotifications() {
    localStorage.setItem("notifications", JSON.stringify(this.notifications));
  }

  public addNotification(notification: OrderNotification) {
    this.notifications.push(notification);
    this.saveNotifications();
  }

  public removeNotification(notification: OrderNotification) {
    this.notifications = this.notifications.filter(
      (n) => n.order_id !== notification.order_id
    );
    this.saveNotifications();
  }

  public getNotificationsForUser(username: string) {
    return this.notifications.filter((n) => n.username === username);
  }
}
