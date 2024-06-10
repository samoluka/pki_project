import { Depths } from "@fluentui/react";

export const ColorTheme = {
  COLOR_SECONDARY: "#DBE8E6",
  COLOR_PRIMARY: "#F6EFEF",
  COLOR_TEXT: "#554457",
  COLOR_HOVERED: "#3B2E3B",
};

export const cardStyle = {
  // fluent ui style for stack component with shadow and rounded corners
  boxShadow: Depths.depth64,
  borderRadius: "0.4rem",
};

export const AppName = "Slatki Zalogaj";
export const AppFontFamily = "Geneva";

export const commonButtonStyles = {
  root: {
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
};
