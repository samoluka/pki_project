import exp from "constants";
import Header from "../Header";
import { IconButton, Stack } from "@fluentui/react";
import CakeCard from "./CakeCard";
import { ColorTheme } from "../../shared/Constants";

const Home = () => {
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
        />
        <CakeCard
          imageUrl={process.env.PUBLIC_URL + "/images/cakePhoto1.png"}
          title="Dobra torta 1"
          description="Super dobra torta trebate probati"
        />
        <CakeCard
          imageUrl={process.env.PUBLIC_URL + "/images/cakePhoto1.png"}
          title="Dobra torta 1"
          description="Super dobra torta trebate probati. Super dobra torta trebate probati. Super dobra torta trebate probati. Super dobra torta trebate probati. Super dobra torta trebate probati. Super dobra torta trebate probati. "
        />
        <CakeCard
          imageUrl={process.env.PUBLIC_URL + "/images/cakePhoto1.png"}
          title="Dobra torta 1"
          description="Super dobra torta trebate probati"
        />
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
        />
      </Stack>
    </Stack>
  );
};

export default Home;
