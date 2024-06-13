import {
  Label,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  SpinButton,
  Stack,
} from "@fluentui/react";
import { useState } from "react";
import { useParams } from "react-router";
import { CakeApi } from "../../api/CakeApi";
import { Cake } from "../../models/Cake";
import { Order } from "../../models/Order";
import User from "../../models/User";
import {
  ColorTheme,
  cardStyle,
  commonButtonStyles,
} from "../../shared/Constants";
import Header from "../Header";
import { CommentStack } from "./Comment";
import { NewComment } from "./NewComment";

const Product = () => {
  let { id } = useParams();
  const cake = CakeApi.Cakes.find((cake) => cake.id === parseInt(id));
  const { name, description, composition, price, picture } = cake;
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const addProductToCart = (cake: Cake, quantity: number) => {
    const currentUser = JSON.parse(localStorage.getItem("user")) as User;
    const currentOrder =
      ((JSON.parse(localStorage.getItem("order")) as Order) || undefined) ??
      new Order(currentUser.username, [], "In progress");

    currentOrder.sweets.push({
      cakeName: cake.name,
      quantity: quantity,
      pricePerCake: cake.price,
      totalPrice: cake.price * quantity,
    });
    localStorage.setItem("order", JSON.stringify(currentOrder));
    setMessage("Proizvod je dodat u korpu!");
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
          },
        }}
        verticalAlign="start"
        horizontalAlign="center"
      >
        <Stack
          styles={{
            root: {
              ...cardStyle,
              backgroundColor: ColorTheme.COLOR_SECONDARY,
              width: "90%",
              height: "50%",
              marginTop: "7%",
            },
          }}
          verticalAlign="center"
          horizontalAlign="space-evenly"
          horizontal
        >
          <Stack horizontalAlign="center" verticalAlign="center">
            <img
              src={process.env.PUBLIC_URL + picture}
              alt="cake"
              style={{
                width: "600px",
              }}
            />
          </Stack>
          <Stack
            tokens={{ childrenGap: "l1", padding: "l1" }}
            horizontalAlign="center"
          >
            <Label
              styles={{
                root: {
                  fontSize: "56px",
                  color: ColorTheme.COLOR_TEXT,
                },
              }}
            >
              {name}
            </Label>
            <Label
              styles={{
                root: {
                  fontSize: "24px",
                  color: ColorTheme.COLOR_TEXT,
                },
              }}
            >
              {description}
            </Label>
            <Label
              styles={{
                root: {
                  fontSize: "16px",
                  color: ColorTheme.COLOR_TEXT,
                },
              }}
            >
              Sastav: {composition}
            </Label>
            <Stack
              styles={{
                root: {
                  ...cardStyle,
                  backgroundColor: ColorTheme.COLOR_PRIMARY,
                  width: "fit-content",
                  height: "fit-content",
                },
              }}
              tokens={{ childrenGap: "l1", padding: "l1" }}
            >
              <Label
                styles={{
                  root: {
                    fontSize: "24px",
                    color: ColorTheme.COLOR_TEXT,
                  },
                }}
              >
                {price} RSD
              </Label>
            </Stack>
            <Stack
              horizontal
              tokens={{ childrenGap: "l1", padding: "l1" }}
              verticalAlign="center"
            >
              <Label
                styles={{
                  root: {
                    fontSize: "24px",
                    color: ColorTheme.COLOR_TEXT,
                  },
                }}
              >
                Količina:
              </Label>
              <SpinButton
                value={quantity.toString()}
                min={0}
                max={100}
                step={1}
                onChange={(_, value) => setQuantity(parseInt(value))}
                styles={{
                  spinButtonWrapper: {
                    backgroundColor: ColorTheme.COLOR_PRIMARY,
                  },
                  root: {
                    width: "100px",
                  },
                }}
              />
              <PrimaryButton
                text="Dodaj u korpu"
                styles={{
                  ...commonButtonStyles,
                }}
                onClick={() => addProductToCart(cake, quantity)}
              />
            </Stack>
            {message.length > 0 && (
              <MessageBar
                messageBarType={MessageBarType.success}
                onDismiss={() => setMessage("")}
                dismissButtonAriaLabel="Close"
              >
                {message}
              </MessageBar>
            )}
          </Stack>
        </Stack>
        <Stack
          styles={{
            root: {
              width: "60%",
            },
          }}
          tokens={{ padding: "l1", childrenGap: "l1" }}
          horizontalAlign="center"
        >
          {cake.comments.filter(
            (elem) =>
              elem.username ===
              (JSON.parse(localStorage.getItem("user")) as User).username
          ).length === 0 && (
            <NewComment
              callback={function (rating: number, text: string): {} {
                throw new Error("Function not implemented.");
              }}
            />
          )}
          {cake.comments
            .sort((a, b) => {
              // if a.username is equal to localstorage username, a should be first else they are same
              if (
                a.username ===
                (JSON.parse(localStorage.getItem("user")) as User).username
              )
                return -1;
              return 0;
            })
            .map((_, index) =>
              index % 2 === 0 ? (
                <Stack
                  key={index}
                  horizontal
                  styles={{
                    root: {
                      width: "100%",
                      height: "100%",
                    },
                  }}
                  horizontalAlign="space-evenly"
                >
                  <CommentStack
                    text={cake.comments[index].text}
                    rating={cake.comments[index].rating}
                    username={cake.comments[index].username}
                  />
                  {index + 1 < cake.comments.length && (
                    <CommentStack
                      text={cake.comments[index + 1].text}
                      rating={cake.comments[index + 1].rating}
                      username={cake.comments[index + 1].username}
                    />
                  )}
                </Stack>
              ) : (
                <></>
              )
            )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Product;
