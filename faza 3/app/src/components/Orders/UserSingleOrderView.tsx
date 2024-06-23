import { Depths, Label, Stack } from "@fluentui/react";
import { OrderApi } from "../../api/OrderApi";
import { UserApi } from "../../api/UserApi";
import { ColorTheme } from "../../shared/Constants";
import Header from "../Header/Header";

export const UserSingleOrderView = () => {
  const id = Number.parseInt(window.location.pathname.split("/")[2]);
  const loggedUser = UserApi.getInstance().LogedUser;
  const order = OrderApi.getInstance()
    .getAllOrdersForUser(loggedUser.username)
    .filter((o) => o.id === id)[0];

  const getTextColor = (status: string) => {
    switch (status) {
      case "In progress":
        return ColorTheme.COLOR_TEXT;
      case "Prihvaćena":
        return "green";
      case "Odbijena":
        return "red";
      default:
        return ColorTheme.COLOR_TEXT;
    }
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
        horizontalAlign="center"
        verticalAlign="center"
        tokens={{ childrenGap: "l1" }}
        styles={{
          root: {
            paddingTop: "20%",
          },
        }}
      >
        <Stack horizontal tokens={{ childrenGap: "s1" }}>
          <Label
            styles={{
              root: { color: ColorTheme.COLOR_TEXT, fontSize: "x-large" },
            }}
          >
            Status narudžbine:
          </Label>
          <Label
            styles={{
              root: { color: getTextColor(order.status), fontSize: "x-large" },
            }}
          >
            {order.status}
          </Label>
        </Stack>
        <Label
          styles={{
            root: { color: ColorTheme.COLOR_TEXT, fontSize: "x-large" },
          }}
        >
          {"Ukupna cena: "}
          {order.sweets.reduce((acc, item) => acc + item.quantity, 0)}
          {"RSD"}
        </Label>
        {order.sweets.map((item) => (
          <Stack
            styles={{
              root: {
                width: "100%",
                backgroundColor: ColorTheme.COLOR_SECONDARY,
                boxShadow: Depths.depth64,
                borderRadius: "0.4rem",
              },
            }}
            horizontalAlign="center"
            verticalAlign="center"
            horizontal
            tokens={{ childrenGap: "l1", padding: "l1" }}
          >
            <Label
              styles={{
                root: { color: ColorTheme.COLOR_TEXT, fontSize: "x-large" },
              }}
            >
              {item.cakeName}
            </Label>
            <Label
              styles={{
                root: { color: ColorTheme.COLOR_TEXT, fontSize: "x-large" },
              }}
            >
              {item.quantity}
            </Label>
            <Label
              styles={{
                root: { color: ColorTheme.COLOR_TEXT, fontSize: "x-large" },
              }}
            >
              {item.pricePerCake} RSD
            </Label>
            <Label
              styles={{
                root: { color: ColorTheme.COLOR_TEXT, fontSize: "x-large" },
              }}
            >
              {item.totalPrice} RSD
            </Label>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
