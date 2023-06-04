import { SurveyAccordion } from "@components/analytics/surveys";
import { Layout, PageHeader } from "@components/common";
import { Survey } from "@types";
import { getApiUrl } from "@utils";

export default function AnalyticsSurveys({ surveys }: { surveys: Survey[] }) {
  console.log("surveys", surveys);
  return (
    <Layout className="pb-24">
      <PageHeader text="Опитування" />
      <div>
        {surveys.map((survey) => (
          <SurveyAccordion key={survey.id} survey={survey} />
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  try {
    const url = getApiUrl("surveys/extended");

    const res = await fetch(url);
    const surveys = await res.json();

    return { props: { surveys } };
  } catch (error) {
    console.error(error);
    return { props: { surveys: null } };
  }
};
