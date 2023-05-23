import { Layout, PreviewImage } from "@components/common";
import { ProductsFilter, ProductsGrid } from "@components/products";
import { Typography } from "@material-tailwind/react";
import AboutPreviewImg from "@public/about-preview.png";
import SurveyPreviewImg from "@public/survey-preview.png";
import { useState } from "react";

export default function Products() {
  const [filter, setFilter] = useState("all");

  return (
    <Layout className="pb-24">
      <div className="grid md:grid-cols-[0.5fr_1fr] gap-10">
        <PreviewImage
          href="/about"
          imageSrc={AboutPreviewImg}
          title="Про Нас"
        />
        <PreviewImage
          href="/surveys"
          imageSrc={SurveyPreviewImg}
          title="Пройти Опитування"
        />
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-[0.15fr_1fr] gap-10">
          <ProductsFilter setFilter={setFilter} />
          <ProductsGrid />
        </div>
      </div>
    </Layout>
  );
}
