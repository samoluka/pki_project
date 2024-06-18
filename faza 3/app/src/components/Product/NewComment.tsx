import {
  PrimaryButton,
  Rating,
  RatingSize,
  Stack,
  TextField,
} from "@fluentui/react";
import { useState } from "react";
import {
  ColorTheme,
  cardStyle,
  commonButtonStyles,
} from "../../shared/Constants";

export const NewComment = (props: {
  callback: (rating: number, text: string) => void;
}) => {
  const [rating, setRating] = useState(3);
  const [text, setText] = useState("");

  return (
    <Stack
      styles={{
        root: {
          backgroundColor: ColorTheme.COLOR_PRIMARY,
          ...cardStyle,
          width: "700px",
          height: "150px",
        },
      }}
      tokens={{ padding: "l1", childrenGap: "l1" }}
      horizontalAlign="center"
      verticalAlign="center"
      horizontal
    >
      <TextField
        label="Komentar:"
        type="text"
        value={text}
        onChange={(e, value) => setText(value)}
        multiline
        cols={50}
        rows={5}
      />
      <Stack>
        <Rating
          max={5}
          rating={rating}
          size={RatingSize.Large}
          onChange={(_, value) => {
            setRating(value);
          }}
        />
        <PrimaryButton
          text="Sačuvaj komentar"
          styles={{
            ...commonButtonStyles,
          }}
          onClick={() => props.callback(rating, text)}
        />
      </Stack>
    </Stack>
  );
};
