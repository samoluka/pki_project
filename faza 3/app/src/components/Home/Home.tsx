import { IconButton, Stack } from "@fluentui/react";
import { useState } from "react";
import { CakeApi } from "../../api/CakeApi";
import { ColorTheme } from "../../shared/Constants";
import Header from "../Header";
import CakeCard from "./CakeCard";

const Home = () => {
  const [indexLeft, setIndexLeft] = useState(0);

  const cakes = CakeApi.getInstance().Cakes;

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
        horizontal
        horizontalAlign="space-evenly"
        verticalAlign="center"
        styles={{
          root: {
            width: "100%",
            height: "100%",
          },
        }}
      >
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
      </Stack>
    </Stack>
  );
};

export default Home;
