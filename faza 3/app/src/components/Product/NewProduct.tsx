import {
  ChoiceGroup,
  Label,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { useState } from "react";
import { CakeApi } from "../../api/CakeApi";
import { Cake } from "../../models/Cake";
import {
  ColorTheme,
  cardStyle,
  commonButtonStyles,
} from "../../shared/Constants";
import Header from "../Header/Header";

const NewProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productIngredients, setProductIngredients] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productType, setProductType] = useState("");
  const [message, setMessage] = useState("");

  const createProduct = () => {
    const newProduct: Cake = {
      // get random cake id as int
      id: Math.floor(Math.random() * 1000000),
      name: productName,
      description: productDescription,
      composition: productIngredients,
      price: Number.parseFloat(productPrice),
      picture: productImage,
      comments: [],
      type: productType,
    };
    CakeApi.getInstance().addCake(newProduct);
    setMessage("Proizvod je uspešno kreiran!");
  };

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
            height: "750px",
            marginTop: "7%",
            backgroundColor: ColorTheme.COLOR_SECONDARY,
            ...cardStyle,
            overflow: "auto",
          },
        }}
      >
        <Stack
          horizontalAlign="center"
          styles={{ root: { width: "fit-content" } }}
          tokens={{ childrenGap: "s1" }}
        >
          <Label
            styles={{
              root: {
                color: ColorTheme.COLOR_TEXT,
                fontSize: "40px",
              },
            }}
          >
            Novi proizvod
          </Label>
          <TextField
            label="Naziv proizvoda"
            styles={{
              root: {
                width: "200px",
              },
            }}
            value={productName}
            onChange={(_, newValue) => setProductName(newValue || "")}
          />
          <TextField
            multiline
            cols={22}
            rows={3}
            label="Opis proizvoda"
            styles={{
              root: {
                width: "200px",
              },
            }}
            value={productDescription}
            onChange={(_, newValue) => setProductDescription(newValue || "")}
          />
          <TextField
            label="Sastojci"
            styles={{
              root: {
                width: "200px",
              },
            }}
            value={productIngredients}
            onChange={(_, newValue) => setProductIngredients(newValue || "")}
          />
          <TextField
            label="Cena"
            styles={{
              root: {
                width: "200px",
              },
            }}
            type="number"
            value={productPrice}
            onChange={(_, newValue) => setProductPrice(newValue || "")}
          />
          <PrimaryButton
            styles={{
              root: {
                ...commonButtonStyles.root,
                width: "200px",
              },
              rootHovered: {
                ...commonButtonStyles.rootHovered,
              },
              rootPressed: {
                ...commonButtonStyles.rootPressed,
              },
            }}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            {productImage ? "Slika izabrana" : "Izaberi sliku"}
            <input
              type="file"
              id="file-upload"
              hidden
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                console.log(selectedFile);
                setProductImage(
                  selectedFile ? "images/" + selectedFile.name : ""
                );
              }}
            />
          </PrimaryButton>

          <ChoiceGroup
            label="Pick one image"
            value={productType}
            options={[
              {
                key: "torta",
                text: "Torta",
              },
              {
                key: "kolac",
                text: "Kolač",
              },
            ]}
            onChange={(_, option) => setProductType(option?.key || "torta")}
          />
          <PrimaryButton
            text="Kreiraj"
            styles={{
              ...commonButtonStyles,
            }}
            disabled={
              !productName ||
              !productDescription ||
              !productIngredients ||
              !productPrice ||
              !productImage ||
              !productType
            }
            onClick={() => createProduct()}
          />

          {message && (
            <MessageBar
              messageBarType={MessageBarType.success}
              onDismiss={() => setMessage("")}
            >
              {message}
            </MessageBar>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NewProduct;
