import {
  Label,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { useState } from "react";
import { UserApi } from "../../api/UserApi";
import {
  ColorTheme,
  cardStyle,
  commonButtonStyles,
} from "../../shared/Constants";
import Header from "../Header/Header";

const ChangePassword = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageBarType>(
    MessageBarType.success
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");

  return (
    <Stack
      styles={{
        root: {
          minHeight: "100vh",
          width: "100vw",
        },
      }}
      horizontalAlign="center"
    >
      <Header />
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        verticalFill
        styles={{
          root: {
            width: "600px",
            height: "600px",
            marginTop: "7%",
            backgroundColor: ColorTheme.COLOR_SECONDARY,
            ...cardStyle,
            // if it is mobile, make it transparent and full screen
            "@media (max-width: 600px)": {
              width: "100vw",
              height: "100vh",
              overflow: "auto",
              backgroundColor: "transparent",
            },
          },
        }}
      >
        <Label
          styles={{
            root: {
              color: ColorTheme.COLOR_TEXT,
              fontSize: "40px",
            },
          }}
        >
          Promena lozinke
        </Label>
        <Stack
          horizontalAlign="center"
          styles={{ root: { width: "fit-content" } }}
          tokens={{ childrenGap: "l1" }}
        >
          <TextField
            label="Stara lozinka"
            type="password"
            value={oldPassword}
            onChange={(_, value) => setOldPassword(value)}
          />
          <TextField
            label="Nova lozinka"
            type="password"
            value={newPassword}
            onChange={(_, value) => setNewPassword(value)}
          />
          <TextField
            label="Ponovite novu lozinku"
            type="password"
            value={repeatedNewPassword}
            onChange={(_, value) => setRepeatedNewPassword(value)}
          />
          <PrimaryButton
            text="Sačuvaj promene"
            styles={{
              ...commonButtonStyles,
            }}
            disabled={
              oldPassword === "" ||
              newPassword === "" ||
              repeatedNewPassword === "" ||
              newPassword.length < 8 ||
              newPassword !== repeatedNewPassword
            }
            onClick={() => {
              const currentPassword = UserApi.getInstance().LogedUser.password;
              if (currentPassword !== oldPassword) {
                setMessage("Uneta stara lozinka nije ispravna.");
                setMessageType(MessageBarType.error);
                return;
              }
              setOldPassword("");
              setNewPassword("");
              setRepeatedNewPassword("");
              setMessage("Uspešno ste promenili lozinku.");
              setMessageType(MessageBarType.success);
              UserApi.getInstance().updateUser({
                ...UserApi.getInstance().LogedUser,
                password: newPassword,
              });
            }}
          />
          {message && (
            <MessageBar
              messageBarType={messageType}
              onDismiss={() => {
                setMessage("");
                setMessageType(MessageBarType.success);
              }}
            >
              {message}
            </MessageBar>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ChangePassword;
