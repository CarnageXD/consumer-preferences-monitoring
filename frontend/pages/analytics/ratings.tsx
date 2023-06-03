import {
  AvgProductRatingChart,
  LatestRatingTable,
  AvgProductRatingTable,
} from "@components/analytics/ratings";
import { AccordionArrow, Layout, PageHeader } from "@components/common";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
} from "@material-tailwind/react";
import { Product, Rating } from "@types";
import { getApiUrl } from "@utils";
import { useState } from "react";

export interface ProductWithAvgRatingAndCount extends Product {
  averageRating: number;
  ratingCount: number;
}

export default function AnalyticsRatings({
  products,
  ratings,
}: {
  products: ProductWithAvgRatingAndCount[];
  ratings: Rating[];
}) {
  console.log({ products, ratings });
  const [avgAccordionOpen, setAvgAccordionOpen] = useState(true);
  const [latestAccordionOpen, setLatestAccordionOpen] = useState(true);

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
              <div className="grid grid-cols-1 gap-10 items-center">
                <LatestRatingTable ratings={ratings} />
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
    const avgUrl = getApiUrl("products/avgandcount");

    const latestUrl = getApiUrl("rating");

    const avgRes = await fetch(avgUrl);
    const latestRes = await fetch(latestUrl);

    const products = await avgRes.json();
    const ratings = await latestRes.json();

    return { props: { products, ratings } };
  } catch (error) {
    console.error(error);
    return { props: { products: null, ratings: null } };
  }
};
