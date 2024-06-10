import { Stack } from "@fluentui/react";
import { ColorTheme, cardStyle } from "../../shared/Constants";

export interface ICakeCardProps {
  imageUrl: string;
  title: string;
  description: string;
  id: number;
}

const CakeCard = (props: ICakeCardProps) => {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={{
        root: {
          width: "400px",
          height: "500px",
          backgroundColor: ColorTheme.COLOR_SECONDARY,
          ...cardStyle,
        },
      }}
      tokens={{ padding: "l1" }}
    >
      <img
        onClick={() => {
          document.location.href = "/product/" + props.id;
        }}
        src={props.imageUrl}
        alt="cake"
        style={{
          width: "300px",
          height: "180px",
        }}
      />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </Stack>
  );
};

export default CakeCard;
