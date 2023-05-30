// @ui-components
import React from "react";
import { Toaster as ReactToaster } from "react-hot-toast";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

/**
 * Return the toaster component.
 * @returns JSX.Element
 */
function ToasterComponent() {
  return (
    <ReactToaster
      position="top-left"
      containerClassName="!z-[99999]"
      toastOptions={{
        iconTheme: {
          primary: "#fff",
          secondary: "#ffffffa0",
        },
        icon: (
          <svg
            className="h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-100"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ),
        className:
          "!bg-blue-500 !border !border-blue-700 !text-white !font-medium !shadow-lg !shadow-black/50 !pr-8 !max-w-full",
        error: {
          duration: 5000,
          icon: <XCircleIcon className="h-5 w-5 text-white" />,
          className:
            "!bg-red-500 !border !border-red-600 !text-white !font-medium !max-w-full",
        },
        success: {
          duration: 5000,
          icon: <CheckCircleIcon className="h-5 w-5 text-white" />,
          className:
            "!bg-green-600 !border !border-green-700 !text-white !font-medium !max-w-full",
        },
      }}
    />
  );
}

export const Toaster = React.memo(ToasterComponent);
export default Toaster;
