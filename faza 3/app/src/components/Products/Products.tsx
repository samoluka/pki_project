import { IconButton, Label, Stack } from "@fluentui/react";
import { useState } from "react";
import { CakeApi } from "../../api/CakeApi";
import { ColorTheme } from "../../shared/Constants";
import Header from "../Header";
import { ProductCard } from "./ProductCard";

export const Products = () => {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  const products = CakeApi.getInstance().Cakes;
  const torte = products.filter((product) => product.type === "torta");
  const kolaci = products.filter((product) => product.type === "kolac");

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
            marginTop: "5%",
          },
        }}
        verticalAlign="start"
        horizontalAlign="center"
        horizontal
      >
        <Stack
          styles={{
            root: {
              width: "50%",
              height: "100%",
            },
          }}
          horizontalAlign="center"
          verticalAlign="space-between"
          tokens={{ childrenGap: "l1", padding: "l1" }}
        >
          <Stack horizontalAlign="center" verticalAlign="center">
            <Label
              styles={{
                root: {
                  fontSize: "x-large",
                },
              }}
            >
              Torte
            </Label>
            <Stack tokens={{ childrenGap: "l1" }}>
              {torte.slice(leftIndex * 3, leftIndex * 3 + 3).map((product) => (
                <ProductCard product={product} />
              ))}
            </Stack>
          </Stack>
          <Stack horizontal tokens={{ childrenGap: "l1" }}>
            <IconButton
              iconProps={{ iconName: "DoubleChevronLeft12" }}
              disabled={leftIndex === 0 || torte.length === 0}
              onClick={() => setLeftIndex(leftIndex - 1)}
              styles={{
                root: {
                  color: ColorTheme.COLOR_TEXT,
                },
                rootHovered: {
                  color: ColorTheme.COLOR_HOVERED,
                  backgroundColor: "transparent",
                },
              }}
            />
            <Label>{leftIndex}</Label>
            <IconButton
              iconProps={{ iconName: "DoubleChevronRight12" }}
              disabled={leftIndex * 3 + 3 >= torte.length}
              onClick={() => setLeftIndex(leftIndex + 1)}
              styles={{
                root: {
                  color: ColorTheme.COLOR_TEXT,
                },
                rootHovered: {
                  color: ColorTheme.COLOR_HOVERED,
                  backgroundColor: "transparent",
                },
              }}
            />
          </Stack>
        </Stack>
        <Stack
          styles={{
            root: {
              width: "50%",
              height: "100%",
            },
          }}
          horizontalAlign="center"
          verticalAlign="space-between"
          tokens={{ childrenGap: "l1", padding: "l1" }}
        >
          <Stack horizontalAlign="center" verticalAlign="center">
            <Label
              styles={{
                root: {
                  fontSize: "x-large",
                },
              }}
            >
              Kolači
            </Label>
            <Stack tokens={{ childrenGap: "l1" }}>
              {kolaci
                .slice(rightIndex * 3, rightIndex * 3 + 3)
                .map((product) => (
                  <ProductCard product={product} />
                ))}
            </Stack>
          </Stack>
          <Stack horizontal tokens={{ childrenGap: "l1" }}>
            <IconButton
              iconProps={{ iconName: "DoubleChevronLeft12" }}
              disabled={rightIndex === 0 || kolaci.length === 0}
              onClick={() => setRightIndex(rightIndex - 1)}
              styles={{
                root: {
                  color: ColorTheme.COLOR_TEXT,
                },
                rootHovered: {
                  color: ColorTheme.COLOR_HOVERED,
                  backgroundColor: "transparent",
                },
              }}
            />
            <Label>{rightIndex}</Label>
            <IconButton
              iconProps={{ iconName: "DoubleChevronRight12" }}
              disabled={rightIndex * 3 + 3 >= kolaci.length}
              onClick={() => setRightIndex(rightIndex + 1)}
              styles={{
                root: {
                  color: ColorTheme.COLOR_TEXT,
                },
                rootHovered: {
                  color: ColorTheme.COLOR_HOVERED,
                  backgroundColor: "transparent",
                },
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
