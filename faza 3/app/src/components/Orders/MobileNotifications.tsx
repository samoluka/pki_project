import { Label, PrimaryButton, Stack } from "@fluentui/react";
import { OrderApi } from "../../api/OrderApi";
import { UserApi } from "../../api/UserApi";
import {
  ColorTheme,
  cardStyle,
  commonButtonStyles,
} from "../../shared/Constants";
import Header from "../Header/Header";

export const MobileNotifications = () => {
  const user = UserApi.getInstance().LogedUser;
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
        tokens={{ childrenGap: "l1" }}
        styles={{
          root: {
            paddingTop: "20%",
          },
        }}
        horizontalAlign="center"
      >
        <Label
          styles={{
            root: { color: ColorTheme.COLOR_TEXT, fontSize: "x-large" },
          }}
        >
          Obaveštenja
        </Label>
        {OrderApi.getInstance()
          .getAllOrdersForUser(user.username)
          .map((order) => {
            return (
              <Stack
                styles={{
                  root: {
                    ...cardStyle,
                    width: "100%",
                    backgroundColor: ColorTheme.COLOR_SECONDARY,
                  },
                }}
                horizontal
                horizontalAlign="center"
                verticalAlign="center"
                tokens={{ childrenGap: "l1", padding: "l1" }}
              >
                <Label>Narudzbina broj: {order.id.toString()}</Label>
                <Stack
                  horizontal
                  tokens={{ childrenGap: "s1" }}
                  horizontalAlign="center"
                  verticalAlign="center"
                >
                  <Label>Status:</Label>
                  <Label
                    styles={{
                      root: {
                        color: getTextColor(order.status),
                      },
                    }}
                  >
                    {order.status}
                  </Label>
                </Stack>
                <PrimaryButton
                  styles={{ ...commonButtonStyles }}
                  text="Detalji"
                  onClick={() => {
                    // redirect to order details
                    document.location.href = `/order/${order.id}`;
                  }}
                />
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};
