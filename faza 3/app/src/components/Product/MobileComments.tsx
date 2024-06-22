import { Label, Stack } from "@fluentui/react";
import { useParams } from "react-router-dom";
import { CakeApi } from "../../api/CakeApi";
import { UserApi } from "../../api/UserApi";
import Header from "../Header/Header";
import { CommentStack } from "./Comment";
import { NewComment } from "./NewComment";

export const MobileComments = () => {
  let { id } = useParams();
  const cake = CakeApi.getInstance().Cakes.find(
    (cake) => cake.id === parseInt(id)
  );
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
            paddingTop: "25%",
          },
        }}
        verticalAlign="start"
        horizontalAlign="center"
        tokens={{ childrenGap: "s1" }}
      >
        <Label styles={{ root: { fontSize: "x-large" } }}>{cake.name}</Label>
        {cake.comments.filter(
          (elem) => elem.username === UserApi.getInstance().LogedUser.username
        ).length === 0 &&
          UserApi.getInstance().LogedUser.role !== "admin" && (
            <NewComment callback={addComment} isMobile={true} />
          )}
        {cake.comments
          .sort((a, b) => {
            // if a.username is equal to localstorage username, a should be first else they are same
            if (a.username === UserApi.getInstance().LogedUser.username)
              return -1;
            return 0;
          })
          .map((_, index) => (
            <CommentStack
              text={cake.comments[index].text}
              rating={cake.comments[index].rating}
              username={cake.comments[index].username}
            />
          ))}
      </Stack>
    </Stack>
  );
};
