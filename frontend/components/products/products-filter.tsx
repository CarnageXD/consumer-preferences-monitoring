import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";

interface ProductFilterProps {
  setFilter: (value: string) => void;
}

export const ProductsFilter = ({ setFilter }: ProductFilterProps) => {
  const filters = [
    { title: "Вся продукція", value: "all" },
    { title: "Плавлені сири", value: "processed" },
    { title: "Сири тверді вагові", value: "weighted" },
    { title: "Сири тверді фасовані", value: "packaged" },
  ];

  return (
    <div className="bg-primary-blue lg:mt-8 rounded-xl py-2 px-4 flex flex-col items-start gap-2">
      <Typography
        color="white"
        className="font-medium text-center w-full pb-2 border-b-primary-yellow border-b-2 uppercase text-xl"
      >
        Фільтрація
      </Typography>
      {filters.map(({ title, value }) => (
        <Typography
          key={title}
          onClick={() => setFilter(value)}
          className="cursor-pointer transition-all text-center py-3 text-white w-full hover:bg-blue-900/50 font-medium hover:text-primary-yellow rounded-xl"
        >
          {title}
        </Typography>
      ))}
    </div>
  );
};
