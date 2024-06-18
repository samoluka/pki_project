// basic login component using fluent ui
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
import Header from "../Header";

const PersonalInfo = () => {
  const { firstName, lastName, username, phoneNumber, address } =
    UserApi.getInstance().LogedUser;

  // create state from local storage
  const [user, setUser] = useState({
    firstName: firstName,
    lastName: lastName,
    username: username,
    phoneNumber: phoneNumber,
    address: address,
  });

  const [message, setMessage] = useState("");

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
          Lične informacije
        </Label>
        <Stack
          horizontalAlign="center"
          styles={{ root: { width: "fit-content" } }}
          tokens={{ childrenGap: "l1" }}
        >
          <TextField
            label="Korisničko ime"
            value={user.username}
            disabled
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
            label="Ime"
            value={user.firstName}
            styles={{
              root: {
                borderColor: ColorTheme.COLOR_TEXT,
                color: ColorTheme.COLOR_TEXT,
              },
              field: {
                backgroundClip: ColorTheme.COLOR_TEXT,
              },
            }}
            onChange={(_, value) => {
              setUser({ ...user, firstName: value });
            }}
          />
          <TextField
            label="Prezime"
            value={user.lastName}
            styles={{
              root: {
                borderColor: ColorTheme.COLOR_TEXT,
                color: ColorTheme.COLOR_TEXT,
              },
              field: {
                backgroundClip: ColorTheme.COLOR_TEXT,
              },
            }}
            onChange={(_, value) => {
              setUser({ ...user, lastName: value });
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
            onChange={(_, value) => {
              setUser({ ...user, address: value });
            }}
          />
          <TextField
            label="Broj telefona"
            value={user.phoneNumber}
            styles={{
              root: {
                borderColor: ColorTheme.COLOR_TEXT,
                color: ColorTheme.COLOR_TEXT,
              },
              field: {
                backgroundClip: ColorTheme.COLOR_TEXT,
              },
            }}
            onChange={(_, value) => {
              setUser({ ...user, phoneNumber: value });
            }}
          />
          <PrimaryButton
            text="Sačuvaj promene"
            styles={{
              ...commonButtonStyles,
            }}
            onClick={() => {
              // save changes in localstorage and in UserApi
              const storedUser = UserApi.getInstance().LogedUser;
              const updatedUser = {
                ...storedUser,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                address: user.address,
              };
              console.log("updatedUser", updatedUser);
              localStorage.setItem("user", JSON.stringify(updatedUser));
              UserApi.getInstance().updateUser(updatedUser);
              setMessage("Uspešno ste sačuvali promene!");
            }}
          />
          {message && (
            <MessageBar messageBarType={MessageBarType.success}>
              {message}
            </MessageBar>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PersonalInfo;
