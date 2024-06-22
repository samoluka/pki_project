import {
  IconButton,
  Label,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
} from "@fluentui/react";
import { useState } from "react";
import { OrderApi } from "../../api/OrderApi";
import { Order } from "../../models/Order";
import {
  ColorTheme,
  cardStyle,
  commonButtonStyles,
} from "../../shared/Constants";
import Header from "../Header/Header";

export const OrdersPage = () => {
  const [order, setOrder] = useState<Order | undefined>(
    OrderApi.getInstance().getCurrentOrder()
  );
  const [message, setMessage] = useState("");

  const setOrderFull = (order: Order) => {
    OrderApi.getInstance().updateCurrentOrder(order);
    setOrder(order);
  };

  const deleteProductFromCart = (index: number) => {
    let newOrder = {
      ...order,
      sweets: order.sweets.filter((_, i) => i !== index),
    };
    if (newOrder.sweets.length === 0) {
      newOrder = undefined;
    }
    setOrderFull(newOrder);
    newOrder
      ? localStorage.setItem("order", JSON.stringify(newOrder))
      : localStorage.removeItem("order");
  };

  const addOrderToGlobalOrder = (order: Order) => {
    OrderApi.getInstance().addOrder(order);
    setOrderFull(undefined);
    localStorage.removeItem("order");
    setMessage("Narudžbina je poslata!");
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
            width: "100%",
            overflowY: "auto", // Add scrolling to the stack
            marginTop: "7%",
            // add 25% padding if it is mobile
            "@media (max-width: 600px)": {
              paddingTop: "20%",
            },
          },
        }}
        verticalAlign="start"
        horizontalAlign="center"
        tokens={{ childrenGap: "l1", padding: "l1" }}
      >
        {message && (
          <MessageBar
            messageBarType={MessageBarType.success}
            onDismiss={() => setMessage("")}
            styles={{
              root: {
                width: "250px",
                marginBottom: "1%",
              },
            }}
          >
            {message}
          </MessageBar>
        )}
        <Label
          styles={{
            root: {
              fontSize: "x-large",
              // if it is mobile, make it smaller
              "@media (max-width: 600px)": {
                fontSize: "large",
              },
            },
          }}
        >
          Moja korpa
        </Label>
        {order && (
          <Stack
            styles={{
              root: {
                ...cardStyle,
                backgroundColor: ColorTheme.COLOR_SECONDARY,
              },
            }}
            horizontal
            horizontalAlign="space-between"
            tokens={{ childrenGap: "l1", padding: "l1" }}
          >
            <Label
              styles={{
                root: {
                  fontSize: "large",
                  "@media (max-width: 600px)": {
                    fontSize: "small",
                  },
                },
              }}
            >
              Ukupna cena:{" "}
              {order.sweets.reduce(
                (acc, item) => acc + item.pricePerCake * item.quantity,
                0
              )}{" "}
              RSD
            </Label>
            <PrimaryButton
              text="Kreiraj narudžbinu"
              onClick={() => addOrderToGlobalOrder(order)}
              styles={{
                ...commonButtonStyles,
              }}
            />
          </Stack>
        )}
        <Stack
          styles={{
            root: {
              ...cardStyle,
              backgroundColor: ColorTheme.COLOR_SECONDARY,
            },
          }}
          horizontal
          horizontalAlign="space-between"
          tokens={{ childrenGap: "l1", padding: "l1" }}
        >
          <Label
            styles={{
              root: {
                fontSize: "large",
                "@media (max-width: 600px)": {
                  fontSize: "small",
                },
              },
            }}
          >
            Naziv
          </Label>
          <Label
            styles={{
              root: {
                fontSize: "large",
                "@media (max-width: 600px)": {
                  fontSize: "small",
                },
              },
            }}
          >
            količina
          </Label>
          <Label
            styles={{
              root: {
                fontSize: "large",
                "@media (max-width: 600px)": {
                  fontSize: "small",
                },
              },
            }}
          >
            Cena po komadu
          </Label>
          <Label
            styles={{
              root: {
                fontSize: "large",
                "@media (max-width: 600px)": {
                  fontSize: "small",
                },
              },
            }}
          >
            Ukupno
          </Label>
        </Stack>
        {order && (
          <Stack
            tokens={{
              childrenGap: "s1",
              padding: "s1",
            }}
          >
            {order.sweets.map((item, index) => (
              <Stack
                styles={{
                  root: {
                    ...cardStyle,
                    backgroundColor: ColorTheme.COLOR_SECONDARY,
                  },
                }}
                horizontal
                horizontalAlign="space-between"
                tokens={{ childrenGap: "l1", padding: "l1" }}
              >
                <Label
                  styles={{
                    root: {
                      fontSize: "large",
                      "@media (max-width: 600px)": {
                        fontSize: "small",
                      },
                    },
                  }}
                >
                  {item.cakeName}
                </Label>
                <Label
                  styles={{
                    root: {
                      fontSize: "large",
                      "@media (max-width: 600px)": {
                        fontSize: "small",
                      },
                    },
                  }}
                >
                  {item.quantity}
                </Label>
                <Label
                  styles={{
                    root: {
                      fontSize: "large",
                      "@media (max-width: 600px)": {
                        fontSize: "small",
                      },
                    },
                  }}
                >
                  {item.pricePerCake} RSD
                </Label>
                <Label
                  styles={{
                    root: {
                      fontSize: "large",
                      "@media (max-width: 600px)": {
                        fontSize: "small",
                      },
                    },
                  }}
                >
                  {item.pricePerCake * item.quantity} RSD
                </Label>
                <IconButton
                  iconProps={{ iconName: "Delete" }}
                  styles={{
                    root: {
                      color: "red",
                      backgroundColor: "transparent",
                    },
                    rootHovered: {
                      color: "darkRed",
                      backgroundColor: "transparent",
                    },
                    rootChecked: {
                      color: "darkRed",
                      backgroundColor: "transparent",
                    },
                    rootPressed: {
                      color: "darkRed",
                      backgroundColor: "transparent",
                    },
                  }}
                  onClick={() => deleteProductFromCart(index)}
                />
              </Stack>
            ))}
          </Stack>
        )}
        {!order && (
          <Stack
            styles={{
              root: {
                ...cardStyle,
                backgroundColor: ColorTheme.COLOR_SECONDARY,
              },
            }}
            horizontal
            horizontalAlign="space-between"
            tokens={{ childrenGap: "l1", padding: "l1" }}
          >
            <Label
              styles={{
                root: {
                  fontSize: "large",
                  "@media (max-width: 600px)": {
                    fontSize: "small",
                  },
                },
              }}
            >
              Vaša trenutna korpa je prazna
            </Label>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
