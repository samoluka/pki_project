import { Depths, IconButton, Label, Stack } from "@fluentui/react";
import { useState } from "react";
import { UserApi } from "../../api/UserApi";
import { Order } from "../../models/Order";
import { ColorTheme } from "../../shared/Constants";

export const SingleOrder = (props: {
  order: Order;
  acceptCallback: (order: Order) => void;
  declineCallback: (order: Order) => void;
  deleteCallback: (order: Order) => void;
}) => {
  const user = UserApi.getInstance()
    .getAllUsers()
    .filter((u) => u.username === props.order.username)[0];
  const inProgress = props.order.status === "In progress";
  const [expanded, setExpanded] = useState(false);

  return (
    <Stack
      styles={{
        root: {
          width: "80%",
          backgroundColor: ColorTheme.COLOR_SECONDARY,
          boxShadow: Depths.depth64,
          borderRadius: "0.4rem",
          marginTop: "10%",
        },
      }}
      horizontalAlign="center"
      verticalAlign="center"
      tokens={{ childrenGap: "l1", padding: "s1" }}
    >
      <Stack
        horizontal
        horizontalAlign="center"
        verticalAlign="center"
        tokens={{ childrenGap: "l1" }}
      >
        <Label
          styles={{
            root: { color: ColorTheme.COLOR_TEXT, fontSize: "x-large" },
          }}
        >
          {props.order.username}
        </Label>
        <Label
          styles={{
            root: { color: ColorTheme.COLOR_TEXT, fontSize: "x-large" },
          }}
        >
          {user.phoneNumber}
        </Label>
        <Label
          styles={{
            root: { color: ColorTheme.COLOR_TEXT, fontSize: "x-large" },
          }}
        >
          {props.order.sweets.reduce((acc, item) => acc + item.quantity, 0)}
          {"RSD"}
        </Label>
        {!inProgress && (
          <>
            <Label
              styles={{
                root: {
                  color: props.order.status === "Prihvaćena" ? "green" : "red",
                  fontSize: "x-large",
                },
              }}
            >
              {props.order.status}
            </Label>
            <IconButton
              iconProps={{ iconName: "Delete" }}
              title="Delete"
              ariaLabel="Delete"
              styles={{
                icon: {
                  fontSize: 40,
                  color: "red",
                },
              }}
              onClick={() => {
                props.deleteCallback(props.order);
              }}
            />
          </>
        )}
        {inProgress && (
          <>
            <IconButton
              iconProps={{ iconName: "Accept" }}
              title="Accept"
              ariaLabel="Accept"
              styles={{
                icon: {
                  fontSize: 40,
                  color: "green",
                },
              }}
              onClick={() => {
                props.acceptCallback(props.order);
              }}
            />
            <IconButton
              iconProps={{ iconName: "Cancel" }}
              title="Cancel"
              ariaLabel="Cancel"
              styles={{
                icon: {
                  fontSize: 40,
                  color: "red",
                },
              }}
              onClick={() => {
                props.declineCallback(props.order);
              }}
            />
          </>
        )}
        <IconButton
          iconProps={{
            iconName: expanded ? "DoubleChevronUp" : "DoubleChevronDown",
          }}
          title="Emoji"
          ariaLabel="Emoji"
          styles={{
            icon: {
              fontSize: 40,
              color: "black",
            },
          }}
          onClick={() => {
            setExpanded(!expanded);
          }}
        />
      </Stack>
      {expanded &&
        props.order.sweets.map((item) => (
          <Stack
            styles={{
              root: {
                width: "80%",
                backgroundColor: ColorTheme.COLOR_SECONDARY,
                boxShadow: Depths.depth64,
                borderRadius: "0.4rem",
              },
            }}
            horizontalAlign="center"
            verticalAlign="center"
            horizontal
            tokens={{ childrenGap: "l1" }}
          >
            <Label
              styles={{
                root: { color: ColorTheme.COLOR_TEXT, fontSize: "x-large" },
              }}
            >
              {item.cakeName}
            </Label>
            <Label
              styles={{
                root: { color: ColorTheme.COLOR_TEXT, fontSize: "x-large" },
              }}
            >
              {item.quantity}
            </Label>
            <Label
              styles={{
                root: { color: ColorTheme.COLOR_TEXT, fontSize: "x-large" },
              }}
            >
              {item.pricePerCake} RSD
            </Label>
            <Label
              styles={{
                root: { color: ColorTheme.COLOR_TEXT, fontSize: "x-large" },
              }}
            >
              {item.totalPrice} RSD
            </Label>
          </Stack>
        ))}
    </Stack>
  );
};
