import { SurveyAccordion } from "@components/analytics/surveys";
import { Layout, PageHeader } from "@components/common";
import { useProtectedRoute } from "@hooks";
import { Typography } from "@material-tailwind/react";
import { Survey } from "@types";
import { getApiUrl } from "@utils";

export default function AnalyticsSurveys({ surveys }: { surveys: Survey[] }) {
  const forbiddenRoute = useProtectedRoute();

  if (forbiddenRoute) {
    return (
      <Typography className="mt-48 font-medium text-center text-2xl">
        У Вас нема права доступу до цих даних.
      </Typography>
    );
  }

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
