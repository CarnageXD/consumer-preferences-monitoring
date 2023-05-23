import { CheckboxStylesType } from "@material-tailwind/react";

export const checkbox: CheckboxStylesType = {
  defaultProps: {
    ripple: false,
  },
  styles: {
    base: {
      icon: {
        text: "bg-primary-blue",
      },
      input: {
        borderColor: "border-primary-blue",
      },
    },
    colors: {
      bg: "bg-primary-blue",
    },
  },
};
