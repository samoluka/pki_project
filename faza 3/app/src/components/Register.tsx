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
import { useEffect, useState } from "react";
import { UserApi } from "../api/UserApi";
import {
  AppFontFamily,
  AppName,
  ColorTheme,
  cardStyle,
} from "../shared/Constants";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repetedPassword, setRepetedPassword] = useState("");
  const [address, setAdress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [{ message, type }, setMessage] = useState({
    message: "",
    type: MessageBarType.success,
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRegister = () => {
    // first check if user with that username already exists
    if (
      UserApi.getInstance()
        .getAllUsers()
        .find((u) => u.username === username)
    ) {
      setMessage({
        message: "Korisnik sa tim korisničkim imenom već postoji",
        type: MessageBarType.error,
      });
      return;
    }
    UserApi.getInstance().addUser({
      firstName,
      lastName,
      username,
      password,
      address,
      phoneNumber,
      role: "user",
    });
    setMessage({
      message: "Uspešno ste se registrovali",
      type: MessageBarType.success,
    });
  };

  const checkIfDisabled = () => {
    // it should be disabled if any of the fileds are empty
    // or if password and repeated password are not the same
    // or password is less than 8 characters
    // or phone number is not in format xxx xxx xxx(x)
    return (
      firstName === "" ||
      lastName === "" ||
      username === "" ||
      password === "" ||
      repetedPassword === "" ||
      address === "" ||
      phoneNumber === "" ||
      password !== repetedPassword ||
      password.length < 8 ||
      // filter empty spaces and check if it is in format xxxxxxxxx(x)
      phoneNumber.replace(/\s/g, "").match(/^\d{9,10}$/) === null
    );
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
          // if it is mobile, change color to primary and width to 100% and height to 100%
          "@media (max-width: 768px)": {
            width: "100%",
            height: "100%",
            backgroundColor: ColorTheme.COLOR_PRIMARY,
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
            // if it is mobile, change font size to 50px
            "@media (max-width: 768px)": {
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
        tokens={{ childrenGap: isMobile ? "s1" : "l1" }}
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
          value={address}
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
            messageBarType={type}
            onDismiss={() =>
              setMessage({ message: "", type: MessageBarType.success })
            }
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
