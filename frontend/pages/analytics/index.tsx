import { Layout, PageHeader, PreviewImage } from "@components/common";

import RatingsPreviewImage from "@public/rating-analytics.jpeg";
import ReviewPreviewImage from "@public/review-analytics.png";
import SurveyPreviewImage from "@public/survey-analytics.png";

export default function Analytics() {
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
