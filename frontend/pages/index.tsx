import { Layout, PreviewImage } from "@components/common";
import { ProductsFilter, ProductsGrid } from "@components/products";
import { Typography } from "@material-tailwind/react";
import AboutPreviewImg from "@public/about-preview.png";
import SurveyPreviewImg from "@public/survey-preview.png";
import { Product } from "@types";
import { getApiUrl } from "@utils";
import { useMemo, useState } from "react";

export default function Products({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState("all");

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;

    return products.filter((product) => product.type === filter);
  }, [filter, products]);

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
        <Typography className="font-medium text-2xl mb-6">Продукція</Typography>
        <div className="grid grid-cols-[0fr_1fr] gap-10">
          <ProductsFilter setFilter={setFilter} />
          {products && <ProductsGrid products={filteredProducts} />}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  try {
    const url = getApiUrl("products");
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await res.json();

    return { props: { products } };
  } catch (error) {
    console.error(error);
    return { props: { products: null } };
  }
};
