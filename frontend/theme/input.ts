export const input = {
  defaultProps: {
    color: "yellow",
    variant: "standard",
  },
  styles: {
    base: {
      container: {},
      input: {
        bg: "!bg-white disabled:!bg-gray-300",
        color: "text-black",
        padding: "!px-3 !pt-4 !pb-4",
        border: "border border-2 disabled:!border !border-b-2",
        borderColor:
          "border-primary-blue placeholder-shown:border-primary-blue disabled:!border-primary-blue",
        rounded: "rounded-xl",
        hover: "hover:border-primary-yellow",
        placeholder: "placeholder:text-gray-500",
        cursor: "disabled:cursor-not-allowed",
      },
      label: {
        display: "!hidden",
      },
      icon: {
        transform: "-translate-x-5 -translate-y-[50%]",
      },
    },
    variants: {
      standard: {
        error: {
          input: {
            borderColor: "border-red-500 placeholder-shown:border-red-500",
            hover: "hover:border-red-500",
          },
        },
      },
    },
  },
};

export default input;
