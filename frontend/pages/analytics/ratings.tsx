import { AvgProductRatingChart } from "@components/analytics";
import AvgProductRatingTable from "@components/analytics/avg-product-rating-table";
import { AccordionArrow, Layout, PageHeader } from "@components/common";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
} from "@material-tailwind/react";
import { Product } from "@types";
import { getApiUrl } from "@utils";
import { useState } from "react";

export interface ProductWithAvgRatingAndCount extends Product {
  averageRating: number;
  ratingCount: number;
}

export default function AnalyticsRatings({
  products,
}: {
  products: ProductWithAvgRatingAndCount[];
}) {
  const [avgAccordionOpen, setAvgAccordionOpen] = useState(false);
  const [latestAccordionOpen, setLatestAccordionOpen] = useState(false);

  const toggleAvgAccordionOpen = () => setAvgAccordionOpen(!avgAccordionOpen);
  const toggleLatestAccordionOpen = () =>
    setLatestAccordionOpen(!latestAccordionOpen);

  return (
    <Layout className="pb-24">
      <PageHeader text="Рейтинги продуктів" />
      {products && (
        <div>
          <Accordion
            open={avgAccordionOpen}
            icon={AccordionArrow({ open: avgAccordionOpen })}
          >
            <AccordionHeader onClick={toggleAvgAccordionOpen}>
              <Typography className="font-medium text-2xl mb-4 text-black">
                Середні оцінки
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-[1fr_0.6fr] gap-10 items-center">
                <AvgProductRatingTable products={products} />
                <AvgProductRatingChart products={products} />
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion
            className="mt-10"
            open={latestAccordionOpen}
            icon={AccordionArrow({ open: latestAccordionOpen })}
          >
            <AccordionHeader onClick={toggleLatestAccordionOpen}>
              <Typography className="font-medium text-2xl mb-4 text-black">
                Останні оцінки
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-[1fr_0.6fr] gap-10 items-center">
                Таблиця з останніми даними
              </div>
            </AccordionBody>
          </Accordion>
        </div>
      )}
    </Layout>
  );
}

export const getServerSideProps = async () => {
  try {
    const url = getApiUrl("products/avgandcount");

    const res = await fetch(url);
    const products = await res.json();

    return { props: { products } };
  } catch (error) {
    console.error(error);
    return { props: { products: null } };
  }
};