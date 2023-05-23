import { Typography } from "@material-tailwind/react";
import React from "react";

export const PageHeader = ({ text }: { text: string }) => {
  return <Typography className="font-medium text-3xl mb-8">{text}</Typography>;
};
