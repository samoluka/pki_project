import {
  IconButton,
  Label,
  Link,
  Panel,
  Stack,
  getTheme,
} from "@fluentui/react";
import { useState } from "react";
import { NotificationApi } from "../../api/NotificationApi";
import { UserApi } from "../../api/UserApi";
import { AppFontFamily, AppName, ColorTheme } from "../../shared/Constants";

export const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuOptions = [
    { text: "Promocije", href: "/home" },
    { text: "Torte", href: "/products/torte" },
    { text: "Kolaci", href: "/products/kolaci" },
    { text: "Licne informacije", href: "/personal-info" },
    { text: "Promena lozinke", href: "/change-password" },
    { text: "Korpa", href: "/order" },
    { text: "Narudzbine", href: "/notifications" },
    { text: "Odjavi se", href: "/logout" },
  ];

  const onMenuClick = (href: string) => {
    if (href === "/logout") {
      // clear local storage user key
      localStorage.removeItem("user");
      // redirect to login
      document.location.href = "/";
    } else {
      document.location.href = href;
    }
  };

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
      tokens={{ padding: "l1" }}
    >
      <Label
        styles={{
          root: {
            color: ColorTheme.COLOR_TEXT,
            fontFamily: `${AppFontFamily}`,
            fontSize: "40px",
          },
        }}
      >
        {AppName}
      </Label>
      <IconButton
        iconProps={{ iconName: "GlobalNavButton" }}
        title="Open menu"
        ariaLabel="Open menu"
        onClick={() => setIsMenuOpen(true)}
      />

      <Panel
        isOpen={isMenuOpen}
        onDismiss={() => setIsMenuOpen(false)}
        closeButtonAriaLabel="Close"
        headerText="Menu"
        styles={{
          main: {
            backgroundColor: ColorTheme.COLOR_SECONDARY,
          },
          header: {
            backgroundColor: ColorTheme.COLOR_SECONDARY,
          },
          commands: {
            backgroundColor: ColorTheme.COLOR_SECONDARY,
          },
        }}
      >
        <Stack tokens={{ childrenGap: "l1", padding: "l1" }}>
          {menuOptions.map((option, index) => (
            <Link
              key={index}
              styles={{
                root: {
                  color:
                    NotificationApi.getInstance().getNotificationsForUser(
                      UserApi.getInstance().LogedUser.username
                    ).length > 0 && option.text === "Narudzbine"
                      ? "red"
                      : ColorTheme.COLOR_TEXT,
                },
              }}
              onClick={() => {
                // if there are notifications and user is clicking on notifications
                if (
                  NotificationApi.getInstance().getNotificationsForUser(
                    UserApi.getInstance().LogedUser.username
                  ).length > 0 &&
                  option.text === "Narudzbine"
                ) {
                  // clear notifications
                  NotificationApi.getInstance()
                    .getNotificationsForUser(
                      UserApi.getInstance().LogedUser.username
                    )
                    .forEach((notification) => {
                      NotificationApi.getInstance().removeNotification(
                        notification
                      );
                    });
                }
                onMenuClick(option.href);
              }}
            >
              {option.text}
            </Link>
          ))}
        </Stack>
      </Panel>
    </Stack>
  );
};
