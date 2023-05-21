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
    variants: {},
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
