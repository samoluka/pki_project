import { Depths, Label, Stack } from "@fluentui/react";
import { useState } from "react";
import { OrderApi } from "../../api/OrderApi";
import { Order } from "../../models/Order";
import { ColorTheme } from "../../shared/Constants";
import Header from "../Header/Header";
import { SingleOrder } from "./SingleOrder";

export const OrdersReview = () => {
  const [orders, setOrders] = useState<Order[]>(
    OrderApi.getInstance().getAllOrders()
  );

  const refreshOrders = () => {
    setOrders([...OrderApi.getInstance().getAllOrders()]);
  };

  return (
    <Stack
      styles={{
        root: {
          minHeight: "100vh",
          width: "100vw",
        },
      }}
      horizontalAlign="center"
      verticalAlign="start"
    >
      <Header />
      <Stack
        styles={{
          root: {
            width: "80%",
            minHeight: "50%",
            height: "fit-content",
            backgroundColor: ColorTheme.COLOR_SECONDARY,
            boxShadow: Depths.depth64,
            borderRadius: "0.4rem",
            marginTop: "10%",
            overflowY: "auto",
          },
        }}
        horizontalAlign="center"
        tokens={{ childrenGap: "l1", padding: "s1" }}
      >
        <Label
          styles={{
            root: { color: ColorTheme.COLOR_TEXT, fontSize: "xx-large" },
          }}
        >
          Narudžbine
        </Label>
        {orders.map((order) => (
          <SingleOrder
            key={order.id}
            order={order}
            acceptCallback={(order) => {
              OrderApi.getInstance().acceptOrder(order);
              refreshOrders();
            }}
            declineCallback={(order) => {
              OrderApi.getInstance().declineOrder(order);
              refreshOrders();
            }}
            deleteCallback={(order) => {
              OrderApi.getInstance().deleteOrder(order);
              refreshOrders();
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};
