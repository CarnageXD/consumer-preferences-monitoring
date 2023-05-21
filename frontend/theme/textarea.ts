export const textarea = {
  defaultProps: {
    variant: "standard",
  },
  styles: {
    base: {
      textarea: {
        bg: "!bg-blue-gray-800/50",
        color: "text-white",
        padding: "px-5 pt-5 pb-5",
        border: "border",
        borderColor:
          "border-blue-gray-700 placeholder-shown:border-blue-gray-700",
        rounded: "rounded-xl",
        hover: "hover:border-blue-400",
        placeholder: "placeholder:text-blue-gray-500",
      },
      label: {
        display: "!hidden",
      },
    },
  },
};

export default textarea;
