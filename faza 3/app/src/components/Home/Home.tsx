import { IconButton, Label, Stack } from "@fluentui/react";
import { useEffect, useState } from "react";
import { CakeApi } from "../../api/CakeApi";
import { ColorTheme } from "../../shared/Constants";
import Header from "../Header/Header";
import CakeCard from "./CakeCard";

const Home = () => {
  const [indexLeft, setIndexLeft] = useState(0);

  const cakes = CakeApi.getInstance().Cakes;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        horizontal={!isMobile}
        horizontalAlign={isMobile ? "center" : "space-between"}
        verticalAlign={isMobile ? "center" : "start"}
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
        {!isMobile && (
          <>
            <IconButton
              iconProps={{ iconName: "DoubleChevronLeft12" }}
              title="Emoji"
              ariaLabel="Emoji"
              styles={{
                icon: {
                  fontSize: 60,
                  color: ColorTheme.COLOR_TEXT,
                },
              }}
              disabled={indexLeft === 0 || cakes.length === 0}
              onClick={() => {
                if (indexLeft > 0) {
                  setIndexLeft(indexLeft - 1);
                }
              }}
            />
            {cakes[indexLeft] && (
              <CakeCard
                imageUrl={process.env.PUBLIC_URL + cakes[indexLeft].picture}
                title={cakes[indexLeft].name}
                description={cakes[indexLeft].description}
                id={cakes[indexLeft].id}
              />
            )}
            {cakes[indexLeft + 1] && (
              <CakeCard
                imageUrl={process.env.PUBLIC_URL + cakes[indexLeft + 1].picture}
                title={cakes[indexLeft + 1].name}
                description={cakes[indexLeft + 1].description}
                id={cakes[indexLeft + 1].id}
              />
            )}
            {cakes[indexLeft + 2] && (
              <CakeCard
                imageUrl={process.env.PUBLIC_URL + cakes[indexLeft + 2].picture}
                title={cakes[indexLeft + 2].name}
                description={cakes[indexLeft + 2].description}
                id={cakes[indexLeft + 2].id}
              />
            )}
            <IconButton
              iconProps={{ iconName: "DoubleChevronRight12" }}
              title="Emoji"
              ariaLabel="Emoji"
              styles={{
                icon: {
                  fontSize: 60,
                  color: ColorTheme.COLOR_TEXT,
                },
              }}
              disabled={indexLeft + 2 > cakes.length - 2}
              onClick={() => {
                if (indexLeft + 2 < cakes.length) {
                  setIndexLeft(indexLeft + 1);
                }
              }}
            />
          </>
        )}
        {isMobile && (
          <Stack
            // add child gap on mobile screens
            tokens={{ childrenGap: "l1" }}
            styles={{
              root: {
                // todo: debug this margin
                marginTop: "4000px",
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
              Promocije
            </Label>
            {cakes.map((cake) => (
              <CakeCard
                imageUrl={process.env.PUBLIC_URL + cake.picture}
                title={cake.name}
                description={cake.description}
                id={cake.id}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Home;
