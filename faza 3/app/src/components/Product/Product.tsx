import {
  Label,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  SpinButton,
  Stack,
} from "@fluentui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CakeApi } from "../../api/CakeApi";
import { OrderApi } from "../../api/OrderApi";
import { UserApi } from "../../api/UserApi";
import { Cake } from "../../models/Cake";
import { Order } from "../../models/Order";
import {
  ColorTheme,
  cardStyle,
  commonButtonStyles,
} from "../../shared/Constants";
import Header from "../Header/Header";
import { CommentStack } from "./Comment";
import { NewComment } from "./NewComment";

const Product = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let { id } = useParams();
  const cake = CakeApi.getInstance().Cakes.find(
    (cake) => cake.id === parseInt(id)
  );
  const { name, description, composition, price, picture, promoPrice } = cake;
  const [quantity, setQuantity] = useState(1);
  const [newPrice, setNewPrice] = useState(promoPrice ?? price);
  const [message, setMessage] = useState("");

  const addProductToCart = (cake: Cake, quantity: number) => {
    const currentUser = UserApi.getInstance().LogedUser;
    const currentOrder =
      OrderApi.getInstance().getCurrentOrder() ??
      new Order(
        currentUser.username,
        [],
        "In progress", // get random order id
        Math.floor(Math.random() * 1000000)
      );

    currentOrder.sweets.push({
      cakeName: cake.name,
      quantity: quantity,
      pricePerCake: cake.promoPrice ?? cake.price,
      totalPrice: cake.price * quantity,
    });

    OrderApi.getInstance().updateCurrentOrder(currentOrder);

    setMessage("Proizvod je dodat u korpu!");
  };

  const addComment = (rating: number, text: string): void => {
    const currentUser = UserApi.getInstance().LogedUser;
    cake.comments.push({
      rating: rating,
      text: text,
      username: currentUser.username,
    });
    CakeApi.getInstance().updateCake(cake);
    // reload the page
    window.location.reload();
  };

  const removePromoPrice = () => {
    cake.promoPrice = undefined;
    CakeApi.getInstance().updateCake(cake);
    setMessage("Promocija je uklonjena!");
  };

  const addPromoPrice = () => {
    cake.promoPrice = newPrice;
    CakeApi.getInstance().updateCake(cake);
    // reload the page
    window.location.reload();
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
            height: "100%",
            overflowY: "auto", // Add scrolling to the stack
          },
        }}
        verticalAlign="start"
        horizontalAlign="center"
        tokens={{ padding: "s1" }}
      >
        {isMobile && (
          <img
            src={"../" + process.env.PUBLIC_URL + picture}
            alt="cake"
            style={{
              height: "200px",
              marginTop: "30%",
            }}
          />
        )}
        <Stack
          styles={{
            root: {
              ...cardStyle,
              backgroundColor: ColorTheme.COLOR_SECONDARY,
              width: "90%",
              height: "60%",
              marginTop: "7%",
            },
          }}
          verticalAlign="center"
          horizontalAlign="space-evenly"
          horizontal={!isMobile}
        >
          {!isMobile && (
            <Stack horizontalAlign="center" verticalAlign="center">
              <img
                src={"../" + process.env.PUBLIC_URL + picture}
                alt="cake"
                style={{
                  height: "300px",
                }}
              />
            </Stack>
          )}
          <Stack
            tokens={{ childrenGap: isMobile ? "s1" : "l1", padding: "l1" }}
            horizontalAlign="center"
          >
            <Label
              styles={{
                root: {
                  fontSize: isMobile ? "xx-large" : "56px",
                  color: ColorTheme.COLOR_TEXT,
                },
              }}
            >
              {name}
            </Label>
            <Label
              styles={{
                root: {
                  fontSize: isMobile ? "large" : "24px",
                  color: ColorTheme.COLOR_TEXT,
                },
              }}
            >
              {description}
            </Label>
            <Label
              styles={{
                root: {
                  fontSize: isMobile ? "normal" : "16px",
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
              tokens={{ childrenGap: isMobile ? "s1" : "l1", padding: "s1" }}
            >
              <Label
                styles={{
                  root: {
                    fontSize: isMobile ? "large" : "24px",
                    color: ColorTheme.COLOR_TEXT,
                  },
                }}
              >
                {UserApi.getInstance().LogedUser.role === "admin"
                  ? price
                  : promoPrice ?? price}{" "}
                RSD
              </Label>
            </Stack>
            {UserApi.getInstance().LogedUser.role === "admin" && (
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
                  {promoPrice ? "Promo cena: " : "Nova cena: "}
                </Label>
                <SpinButton
                  value={newPrice.toString()}
                  min={0}
                  max={1000000}
                  step={10}
                  onChange={(_, value) => setNewPrice(parseInt(value))}
                  styles={{
                    spinButtonWrapper: {
                      backgroundColor: ColorTheme.COLOR_PRIMARY,
                    },
                    root: {
                      width: "100px",
                    },
                  }}
                  disabled={promoPrice !== undefined}
                />

                <PrimaryButton
                  text={promoPrice ? "Poništi promociju" : "Kreiraj promociju"}
                  styles={{
                    ...commonButtonStyles,
                  }}
                  onClick={() =>
                    promoPrice ? removePromoPrice() : addPromoPrice()
                  }
                />
              </Stack>
            )}
            {UserApi.getInstance().LogedUser.role !== "admin" && (
              <Stack
                horizontal
                tokens={{ childrenGap: "l1", padding: "l1" }}
                verticalAlign="center"
              >
                <Label
                  styles={{
                    root: {
                      fontSize: isMobile ? "large" : "24px",
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
                {!isMobile && (
                  <PrimaryButton
                    text="Dodaj u korpu"
                    styles={{
                      root: {
                        ...commonButtonStyles.root,
                        width: "200px",
                      },
                      ...commonButtonStyles.rootHovered,
                      ...commonButtonStyles.rootPressed,
                    }}
                    onClick={() => addProductToCart(cake, quantity)}
                  />
                )}
              </Stack>
            )}
            {isMobile && (
              <>
                <PrimaryButton
                  text="Dodaj u korpu"
                  styles={{
                    root: {
                      ...commonButtonStyles.root,
                      width: "200px",
                    },
                    rootHovered: {
                      ...commonButtonStyles.rootHovered,
                    },
                    rootPressed: {
                      ...commonButtonStyles.rootPressed,
                    },
                  }}
                  onClick={() => addProductToCart(cake, quantity)}
                />
                <PrimaryButton
                  text="Komentari"
                  styles={{
                    root: {
                      ...commonButtonStyles.root,
                      width: "200px",
                    },
                    rootHovered: {
                      ...commonButtonStyles.rootHovered,
                    },
                    rootPressed: {
                      ...commonButtonStyles.rootPressed,
                    },
                  }}
                  onClick={() => {
                    // redirect to comments
                    document.location.href = `/comments/${id}`;
                  }}
                />
              </>
            )}
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
        {!isMobile && (
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
                elem.username === UserApi.getInstance().LogedUser.username
            ).length === 0 &&
              UserApi.getInstance().LogedUser.role !== "admin" && (
                <NewComment callback={addComment} />
              )}
            {cake.comments
              .sort((a, b) => {
                // if a.username is equal to localstorage username, a should be first else they are same
                if (a.username === UserApi.getInstance().LogedUser.username)
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
        )}
      </Stack>
    </Stack>
  );
};

export default Product;
