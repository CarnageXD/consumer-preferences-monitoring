import { Layout } from "@components/common";
import { Survey } from "@types";
import { getApiUrl } from "@utils";

export default function AnalyticsSurveys({ surveys }: { surveys: Survey[] }) {
  console.log("surveys", surveys);
  return <Layout className="pb-24">Surveys</Layout>;
}

export const getServerSideProps = async () => {
  try {
    const url = getApiUrl("surveys");

    const res = await fetch(url);
    const surveys = await res.json();

    return { props: { surveys } };
  } catch (error) {
    console.error(error);
    return { props: { surveys: null } };
  }
};
