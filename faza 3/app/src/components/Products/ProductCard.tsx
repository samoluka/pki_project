import { Label, Stack } from "@fluentui/react";
import { Cake } from "../../models/Cake";
import { ColorTheme, cardStyle } from "../../shared/Constants";

export const ProductCard = (props: { product: Cake }) => {
  const { product } = props;
  return (
    <Stack
      styles={{
        root: {
          ...cardStyle,
          backgroundColor: ColorTheme.COLOR_SECONDARY,
          width: "400px",
          height: "fit-content",
        },
      }}
      horizontalAlign="center"
      verticalAlign="center"
      tokens={{ padding: "s1", childrenGap: "s1" }}
    >
      <img
        src={process.env.PUBLIC_URL + product.picture}
        alt="cake"
        style={{
          height: "120px",
        }}
        onClick={() => {
          document.location.href = "/product/" + product.id;
        }}
      />
      <Label
        styles={{
          root: {
            fontSize: "normal",
          },
        }}
      >
        {product.name}
      </Label>
    </Stack>
  );
};
