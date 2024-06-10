import {
  ActionButton,
  CommandBarButton,
  FontSizes,
  IconButton,
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
          height: "100px",
          maxHeight: "100px",
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
          onClick={() => {
            // redirect to change password
            document.location.href = "/home";
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
          onClick={() => {
            // redirect to change password
            document.location.href = "/products";
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
        <CommandBarButton
          text="Informacije"
          menuProps={{
            items: [
              {
                key: "licne",
                text: "Licne informacije",
                onClick: () => {
                  // redirect to personal info
                  document.location.href = "/personal-info";
                },
              },
              {
                key: "lozinka",
                text: "Promena lozinke",
                onClick: () => {
                  // redirect to change password
                  document.location.href = "/change-password";
                },
              },
            ],
          }}
          styles={{
            root: {
              textHeight: "50px",
              width: "fit-content",
              borderColor: "transparent",
              fontSize: FontSizes.size32,
              color: ColorTheme.COLOR_TEXT,
              backgroundColor: "transparent",
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
