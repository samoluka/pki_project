import {
  ActionButton,
  FontSizes,
  IconButton,
  IconFontSizes,
  Label,
  Stack,
  getTheme,
} from "@fluentui/react";
import { AppFontFamily, AppName, ColorTheme } from "../shared/Constants";

const Header = () => {
  return (
    <Stack
      horizontal
      verticalAlign="center"
      grow={0}
      styles={{
        root: {
          backgroundColor: ColorTheme.COLOR_PRIMARY,
          minHeight: "100px",
          width: "100vw",
          position: "fixed",
          zIndex: 2,
          boxShadow: getTheme().effects.elevation8,
        },
      }}
      horizontalAlign="space-between"
    >
      <Stack horizontal tokens={{ childrenGap: "l1" }}>
        <ActionButton
          text={"Početna"}
          styles={{
            root: {
              textHeight: "50px",
              width: "fit-content",
              borderColor: "transparent",
              fontSize: FontSizes.size32,
              color: ColorTheme.COLOR_TEXT,
            },
          }}
        />
        <ActionButton
          text={"Proizvodi"}
          styles={{
            root: {
              textHeight: "50px",
              width: "fit-content",
              borderColor: "transparent",
              fontSize: FontSizes.size32,
              color: ColorTheme.COLOR_TEXT,
            },
          }}
        />
        <ActionButton
          text={"Infromacije"}
          styles={{
            root: {
              textHeight: "50px",
              width: "fit-content",
              borderColor: "transparent",
              fontSize: FontSizes.size32,
              color: ColorTheme.COLOR_TEXT,
            },
          }}
        />
        <ActionButton
          text={"Korpa"}
          styles={{
            root: {
              textHeight: "50px",
              width: "fit-content",
              borderColor: "transparent",
              fontSize: FontSizes.size32,
              color: ColorTheme.COLOR_TEXT,
            },
          }}
        />
      </Stack>
      <Stack horizontal tokens={{ childrenGap: "l1", padding: "l1" }}>
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
        <Stack verticalAlign="space-between" tokens={{ childrenGap: "l1" }}>
          <IconButton
            iconProps={{ iconName: "SignOut" }}
            size={1}
            title="Emoji"
            ariaLabel="Emoji"
            styles={{
              icon: {
                fontSize: 30,
                color: ColorTheme.COLOR_TEXT,
              },
            }}
          />
          <IconButton
            iconProps={{ iconName: "Ringer" }}
            size={1}
            title="Emoji"
            ariaLabel="Emoji"
            styles={{
              icon: {
                fontSize: 30,
                color: ColorTheme.COLOR_TEXT,
              },
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
