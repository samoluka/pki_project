import {
  ActionButton,
  CommandBarButton,
  FontSizes,
  IconButton,
  Label,
  Stack,
  getTheme,
} from "@fluentui/react";
import { OrderApi } from "../api/OrderApi";
import { UserApi } from "../api/UserApi";
import { AppFontFamily, AppName, ColorTheme } from "../shared/Constants";

const Header = () => {
  const user = UserApi.getInstance().LogedUser;

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
        {user.role === "admin" ? (
          <CommandBarButton
            text="Proizvodi"
            menuProps={{
              items: [
                {
                  key: "novi",
                  text: "Novi proizvod",
                  onClick: () => {
                    // redirect to personal info
                    document.location.href = "/new-product";
                  },
                },
                {
                  key: "Pregled",
                  text: "Pregled",
                  onClick: () => {
                    // redirect to change password
                    document.location.href = "/products";
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
        ) : (
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
        )}
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
          text={user.role === "admin" ? "Narudžbine" : "Korpa"}
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
            document.location.href = "/order";
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
        <Stack verticalAlign="center" tokens={{ childrenGap: "l1" }}>
          <IconButton
            iconProps={{ iconName: "SignOut" }}
            size={1}
            title="Emoji"
            ariaLabel="Emoji"
            styles={{
              icon: {
                paddingLeft: "20px",
                fontSize: 30,
                color: ColorTheme.COLOR_TEXT,
              },
            }}
            onClick={() => {
              // clear local storage user key
              localStorage.removeItem("user");
              // redirect to login
              document.location.href = "/";
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
            menuProps={{
              items: OrderApi.getInstance()
                .getAllOrdersForUser(user.username)
                .map((order) => {
                  return {
                    key: order.id.toString(),
                    text: `Porudzbina ${order.id}: ${order.status}`,
                  };
                }),
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
