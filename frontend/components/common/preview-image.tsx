import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface PreviewImageProps {
  href: string;
  imageSrc: StaticImageData;
  title: string;
}

export const PreviewImage = ({ href, imageSrc, title }: PreviewImageProps) => {
  return (
    <Link href={href} className="group relative h-[400px]">
      <div className="relative h-full w-full">
        <Image
          className="filter blur-[2px] rounded-xl transition-all"
          quality={100}
          src={imageSrc}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          alt="about-preview"
        />
        <div className="absolute inset-0 rounded-xl bg-black bg-opacity-60 blur-[2px]"></div>
        <div className="absolute group-hover:bg-primary-yellow text-white group-hover:text-black top-1/2 rounded-xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 border-2 group-hover:border-transparent transition-all">
          <Typography className="text-center whitespace-nowrap font-semibold">
            {title}
          </Typography>
        </div>
      </div>
    </Link>
  );
};
