import { Layout } from "@components/common";
import { Review } from "@types";
import { getApiUrl } from "@utils";

export default function AnalyticsReviews({ reviews }: { reviews: Review[] }) {
  console.log("reviews", reviews);
  return <Layout className="pb-24">Review</Layout>;
}

export const getServerSideProps = async () => {
  try {
    const url = getApiUrl("review");

    const res = await fetch(url);
    const reviews = await res.json();

    return { props: { reviews } };
  } catch (error) {
    console.error(error);
    return { props: { reviews: null } };
  }
};
