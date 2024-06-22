// basic login component using fluent ui
import {
  Label,
  Link,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { useState } from "react";
import { UserApi } from "../api/UserApi";
import {
  AppFontFamily,
  AppName,
  ColorTheme,
  cardStyle,
} from "../shared/Constants";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    console.log("username:", username);
    console.log("password:", password);
    const result = UserApi.getInstance().login(username, password);

    if (result !== null) {
      // redirect to home page
      window.location.href = "/home";
    } else {
      setMessage("Pogrešno korisničko ime ili lozinka");
    }
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
          height: "600px",
          backgroundColor: ColorTheme.COLOR_SECONDARY,
          ...cardStyle,
          "@media (max-width: 600px)": {
            // This targets screens with a width of 600px or less
            width: "100vw", // 100% of the viewport width
            height: "100vh", // 100% of the viewport height
            overflow: "auto", // Adds scroll if the content overflows the viewport
            backgroundColor: "transparent",
          },
        },
      }}
    >
      <Label
        styles={{
          root: {
            color: ColorTheme.COLOR_TEXT,
            fontFamily: `${AppFontFamily}`,
            fontSize: "80px",
            // if screen is smaller than 600px, change font size
            "@media (max-width: 600px)": {
              fontSize: "50px",
            },
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
        <PrimaryButton
          disabled={checkIfDisabled()}
          text="Prijavi se"
          onClick={handleLogin}
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
        {/* todo: fix this bar should not move other components */}
        {message.length > 0 && (
          <MessageBar
            messageBarType={MessageBarType.error}
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
            window.location.href = "/register";
          }}
        >
          Registruj se...
        </Link>
      </Stack>
    </Stack>
  );
};

export default Login;
