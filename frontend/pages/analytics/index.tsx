import { Layout, PageHeader, PreviewImage } from "@components/common";
import { useProtectedRoute } from "@hooks";
import { Typography } from "@material-tailwind/react";

import RatingsPreviewImage from "@public/rating-analytics.jpeg";
import ReviewPreviewImage from "@public/review-analytics.png";
import SurveyPreviewImage from "@public/survey-analytics.png";

export default function Analytics() {
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
      <PageHeader text="Аналітика" />
      <div className="grid grid-cols-3 gap-8">
        <PreviewImage
          title="Рейтинги товарів"
          href="/analytics/ratings"
          imageSrc={RatingsPreviewImage}
        />
        <PreviewImage
          title="Відгуки про товари"
          href="/analytics/reviews"
          imageSrc={ReviewPreviewImage}
        />
        <PreviewImage
          title="Пройдені опитування"
          href="/analytics/surveys"
          imageSrc={SurveyPreviewImage}
        />
      </div>
      <div></div>
    </Layout>
  );
}
