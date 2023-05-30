import { Layout } from "@components/common";
import { Rating } from "@types";
import { getApiUrl } from "@utils";

export default function AnalyticsRatings({ ratings }: { ratings: Rating[] }) {
  console.log("ratings", ratings);
  return <Layout className="pb-24">Ratings</Layout>;
}

export const getServerSideProps = async () => {
  try {
    const url = getApiUrl("rating");

    const res = await fetch(url);
    const ratings = await res.json();

    return { props: { ratings } };
  } catch (error) {
    console.error(error);
    return { props: { ratings: null } };
  }
};
