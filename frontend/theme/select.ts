export const select = {
  defaultProps: {
    variant: "standard",
  },
  styles: {
    base: {
      container: {
        height: "h-9",
        minWidth: "min-w-0",
      },
      select: {
        padding: "!px-5 !pt-4 !pb-4",
        border: "border",
        borderColor: "!border-gray-300",
        rounded: "rounded-xl",
      },
      label: {
        display: "!hidden",
      },
      arrow: {
        initial: {
          color: "text-gray-00",
          width: "w-6",
          height: "h-6",
          position: "absolute",
          right: "right-4",
          mt: "mt-px",
        },
        active: {
          transform: "rotate-180",
          mt: "mt-px",
        },
      },
      option: {
        initial: {
          margin: "mb-0.5",
          borderRadius: "rounded-[10px]",
          color: "text-black",
          hover: "hover:text-white hover:bg-primary-blue",
          focus: "focustext-:white focus:bg-primary-blue",
          active: "active:text-white active:bg-primary-blue",
        },
        active: {
          color: "text-white",
          bg: "bg-primary-blue",
          hover: "hover:text-white hover:bg-primary-blue",
          focus: "focus:text-white focus:bg-primary-blue",
          active: "active:text-white active:bg-primary-blue",
        },
      },
    },
    variants: {
      standard: {
        error: {
          select: {
            borderColor: "border-red-500 placeholder-shown:border-red-500",
            hover: "hover:border-red-500",
          },
        },
      },
    },
  },
};
