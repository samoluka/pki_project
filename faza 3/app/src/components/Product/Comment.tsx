import { Label, Rating, Stack } from "@fluentui/react";
import { UserApi } from "../../api/UserApi";
import { ColorTheme, cardStyle } from "../../shared/Constants";

export const CommentStack = (props: {
  rating: number;
  text: string;
  username: string;
}) => {
  // if username is equal to localstorage username, background color should be primary else secondary
  const backgroundColor =
    props.username === UserApi.getInstance().LogedUser.username
      ? ColorTheme.COLOR_PRIMARY
      : ColorTheme.COLOR_SECONDARY;
  return (
    <Stack
      styles={{
        root: {
          backgroundColor: backgroundColor,
          ...cardStyle,
          width: "300px",
          height: "150px",
        },
      }}
      tokens={{ padding: "l1", childrenGap: "l1" }}
      horizontalAlign="center"
      verticalAlign="center"
    >
      <Label>{props.text}</Label>
      <Rating
        max={5}
        rating={props.rating}
        readOnly
        styles={{ root: { marginTop: "8px" } }}
      />
    </Stack>
  );
};
