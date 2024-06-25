import { Label, Stack } from "@fluentui/react";
import { CakeApi } from "../../api/CakeApi";
import Header from "../Header/Header";
import CakeCard from "../Home/CakeCard";

export const ProductsMobile = () => {
  // get from url
  const torte = window.location.href.includes("torte");
  const cakes = CakeApi.getInstance().Cakes.filter(
    (c) => c.type === (torte ? "torta" : "kolac")
  );

  return (
    <Stack
      styles={{
        root: {
          minHeight: "100vh",
          width: "100vw",
        },
      }}
    >
      <Header />
      <Stack
        horizontalAlign={"center"}
        verticalAlign={"start"}
        styles={{
          root: {
            width: "100%",
            height: "100%",
            // make it scrollable on small screens
            "@media (max-width: 600px)": {
              overflow: "auto",
              flexDirection: "column",
              alignItems: "center",
            },
          },
        }}
      >
        <Stack
          // add child gap on mobile screens
          tokens={{ childrenGap: "l1" }}
          styles={{
            root: {
              paddingTop: "25%",
            },
          }}
          horizontalAlign="center"
        >
          <Label
            styles={{
              root: {
                fontSize: "20px",
              },
            }}
          >
            {torte ? "Torte" : "Kolači"}
          </Label>
          {cakes.map((cake) => (
            <CakeCard
              imageUrl={"../" + process.env.PUBLIC_URL + cake.picture}
              title={cake.name}
              description={cake.description}
              id={cake.id}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
