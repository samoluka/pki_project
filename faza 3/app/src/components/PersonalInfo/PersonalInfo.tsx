// basic login component using fluent ui
import { useContext, useEffect, useState } from "react";
import {
  Label,
  Link,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import {
  AppFontFamily,
  AppName,
  ColorTheme,
  cardStyle,
} from "../../shared/Constants";
import UserStateStore from "../../stores/UsersStateStore";
import User from "../../models/User";
import { UserApi } from "../../api/UserApi";

const PersonalInfo = () => {
  const { firstName, lastName, username, password, phoneNumber, address } =
    JSON.parse(localStorage.getItem("user"));

  const checkIfDisabled = () => {
    return username === "" || password === "";
  };

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={{
        root: {
          width: "600px",
          height: "850px",
          backgroundColor: ColorTheme.COLOR_SECONDARY,
          ...cardStyle,
        },
      }}
    >
      <Label
        styles={{
          root: {
            color: ColorTheme.COLOR_TEXT,
            fontFamily: `${AppFontFamily}`,
            fontSize: "80px",
          },
        }}
      >
        {AppName}
      </Label>
      <Stack
        horizontalAlign="center"
        styles={{ root: { width: "fit-content" } }}
        tokens={{ childrenGap: "l1" }}
      >
        <TextField
          label="Ime"
          value={firstName}
          styles={{
            root: {
              borderColor: ColorTheme.COLOR_TEXT,
              color: ColorTheme.COLOR_TEXT,
            },
            field: {
              backgroundClip: ColorTheme.COLOR_TEXT,
            },
          }}
        />
        <TextField
          label="Prezime"
          value={lastName}
          styles={{
            root: {
              borderColor: ColorTheme.COLOR_TEXT,
              color: ColorTheme.COLOR_TEXT,
            },
            field: {
              backgroundClip: ColorTheme.COLOR_TEXT,
            },
          }}
        />
        <TextField
          label="Korisničko ime"
          value={username}
          styles={{
            root: {
              borderColor: ColorTheme.COLOR_TEXT,
              color: ColorTheme.COLOR_TEXT,
            },
            field: {
              backgroundClip: ColorTheme.COLOR_TEXT,
            },
          }}
        />
        <TextField
          label="Adresa"
          value={address}
          styles={{
            root: {
              borderColor: ColorTheme.COLOR_TEXT,
              color: ColorTheme.COLOR_TEXT,
            },
            field: {
              backgroundClip: ColorTheme.COLOR_TEXT,
            },
          }}
        />
        <TextField
          label="Broj telefona"
          value={phoneNumber}
          styles={{
            root: {
              borderColor: ColorTheme.COLOR_TEXT,
              color: ColorTheme.COLOR_TEXT,
            },
            field: {
              backgroundClip: ColorTheme.COLOR_TEXT,
            },
          }}
        />
        <PrimaryButton
          disabled={checkIfDisabled()}
          text="Izmeni podatke"
          styles={{
            root: {
              width: "100%",
              backgroundColor: ColorTheme.COLOR_TEXT,
              borderColor: ColorTheme.COLOR_TEXT,
            },
            rootHovered: {
              backgroundColor: ColorTheme.COLOR_HOVERED,
              borderColor: ColorTheme.COLOR_HOVERED,
            },
            rootPressed: {
              backgroundColor: ColorTheme.COLOR_HOVERED,
              borderColor: ColorTheme.COLOR_HOVERED,
            },
          }}
        />
        <PrimaryButton
          disabled={true}
          text="Sačuvaj promene"
          styles={{
            root: {
              width: "100%",
              backgroundColor: ColorTheme.COLOR_TEXT,
              borderColor: ColorTheme.COLOR_TEXT,
            },
            rootHovered: {
              backgroundColor: ColorTheme.COLOR_HOVERED,
              borderColor: ColorTheme.COLOR_HOVERED,
            },
            rootPressed: {
              backgroundColor: ColorTheme.COLOR_HOVERED,
              borderColor: ColorTheme.COLOR_HOVERED,
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default PersonalInfo;
