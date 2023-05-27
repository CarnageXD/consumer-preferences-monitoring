import { Typography } from "@material-tailwind/react";
import { Product } from "@types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const ProductCard = ({
  name,
  netWeight,
  image,
  tag,
}: Partial<Product>) => {
  return (
    <Link href={`product/${tag}`}>
      <Image
        className="hover:scale-105 transition-all "
        src={image || ""}
        width={360}
        height={360}
        alt={name || ""}
      />
      <div className="mt-2 flex justify-around z-10">
        <Typography className="font-medium text-lg">{name}</Typography>
        <Typography className="font-medium text-lg">{netWeight}g</Typography>
      </div>
    </Link>
  );
};
