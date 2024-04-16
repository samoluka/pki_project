// basic login component using fluent ui
import { useContext, useState } from "react";
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
} from "../shared/Constants";
import UserStateStore from "../stores/UsersStateStore";
import User from "../models/User";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repetedPassword, setRepetedPassword] = useState("");
  const [adress, setAdress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const userStore = useContext(UserStateStore);

  const handleRegister = () => {
    userStore
      .register(
        new User(
          username,
          password,
          firstName,
          lastName,
          adress,
          phoneNumber,
          "user"
        )
      )
      .then(() => setMessage("Uspešno ste se registrovali"));
  };

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
          onChange={(e, newValue) => setFirstName(newValue!)}
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
          onChange={(e, newValue) => setLastName(newValue!)}
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
          onChange={(e, newValue) => setUsername(newValue!)}
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
          label="Lozinka"
          type="password"
          value={password}
          onChange={(e, newValue) => setPassword(newValue!)}
          styles={{
            root: {
              borderColor: ColorTheme.COLOR_TEXT,
              color: ColorTheme.COLOR_TEXT,
            },
          }}
        />
        <TextField
          label="Ponovite lozinku"
          type="password"
          value={repetedPassword}
          onChange={(e, newValue) => setRepetedPassword(newValue!)}
          styles={{
            root: {
              borderColor: ColorTheme.COLOR_TEXT,
              color: ColorTheme.COLOR_TEXT,
            },
          }}
        />
        <TextField
          label="Adresa"
          value={adress}
          onChange={(e, newValue) => setAdress(newValue!)}
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
          onChange={(e, newValue) => setPhoneNumber(newValue!)}
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
          text="Registruj se"
          onClick={handleRegister}
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
        {message.length > 0 && (
          <MessageBar
            messageBarType={MessageBarType.success}
            onDismiss={() => setMessage("")}
            isMultiline={false}
            dismissButtonAriaLabel="Close"
          >
            {message}
          </MessageBar>
        )}
        <Link
          styles={{
            root: {
              color: ColorTheme.COLOR_TEXT,
            },
          }}
          onClick={() => {
            // redirect to register page
            window.location.href = "/";
          }}
        >
          Prijavi se...
        </Link>
      </Stack>
    </Stack>
  );
};

export default Register;
