export const button = {
  defaultProps: {
    ripple: false,
  },
  styles: {
    base: {
      initial: {
        display: "flex",
        alignItems: "items-center",
        fontWeight: "font-medium",
        textTransform: "capitalize",
      },
    },
    variants: {
      filled: {
        blue: {
          bg: "!bg-primary-blue",
        },
      },
      outlined: {
        blue: {
          border: "border-2 border-primary-blue",
          text: "text-primary-blue",
        },
      },
    },
    sizes: {
      sm: {
        fontSize: "text-sm",
        borderRadius: "rounded-xl",
      },
      md: {
        fontSize: "text-sm",
        borderRadius: "rounded-xl",
      },
      lg: {
        fontSize: "text-base",
        borderRadius: "rounded-xl",
      },
    },
  },
};

export default button;
