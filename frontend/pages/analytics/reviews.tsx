import { Layout } from "@components/common";
import { Review } from "@types";
import { getApiUrl } from "@utils";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/20/solid";
import mutationFetcher from "@utils/mutation-fetcher";
import useSWRMutation from "swr/mutation";
import { useState } from "react";
import { ReviewRemoveDialog } from "@components/analytics/reviews";

export default function AnalyticsReviews({ reviews }: { reviews: Review[] }) {
  console.log(reviews);
  const [localReviews, setLocalReviews] = useState(reviews || []);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showRemoveDialog, setRemovalDialog] = useState(false);

  const data = [
    { label: "Всі", value: "all", reviews: localReviews },
    {
      label: "Позитивні",
      value: "positive",
      reviews: localReviews.filter((review) => review.recommended),
    },
    {
      label: "Негативні",
      value: "negative",
      reviews: localReviews.filter((review) => !review.recommended),
    },
  ];

  const handleShowRemoveDialog = () => setRemovalDialog(!showRemoveDialog);

  const { trigger: removeReview } = useSWRMutation(
    getApiUrl(`review/${selectedId}`),
    mutationFetcher("DELETE")
  );

  const handleRemoval = async () => {
    await removeReview({});

    const newReviews = localReviews.filter(
      (review) => review.id !== selectedId
    );
    setLocalReviews(newReviews);

    handleShowRemoveDialog();
  };
  return (
    <Layout className="pb-24">
      <ReviewRemoveDialog
        showRemoveDialog={showRemoveDialog}
        handleShowRemoveDialog={handleShowRemoveDialog}
        handleRemoval={handleRemoval}
      />
      <Tabs value="all">
        <TabsHeader className="bg-opacity-100">
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, reviews }) => (
            <TabPanel key={value} value={value}>
              <div>
                {reviews?.map((review) => {
                  return (
                    <div
                      key={review.id}
                      className={`mb-4 ${
                        review.recommended ? "bg-green-200" : "bg-red-200"
                      } py-2 px-4 rounded-xl`}
                    >
                      <div className="grid grid-cols-[1fr_0.3fr] gap-10 items-center justify-between relative">
                        <div className="flex flex-col gap-2 flex-grow">
                          <Typography className="font-medium text-lg text-black">
                            {review.name}
                          </Typography>
                          <Typography className="text-black">
                            {review.content}
                          </Typography>
                        </div>
                        <Link
                          href={`/product/${review.product.tag}`}
                          className="flex gap-3 items-center justify-end mr-10"
                        >
                          <Typography className="italic font-medium text-black">
                            {review.product.name}
                          </Typography>
                          <div className="h-14 w-14 shrink-0">
                            <Image
                              src={review.product.image}
                              height={100}
                              width={100}
                              alt={review.product.name}
                            />
                          </div>
                        </Link>
                        <TrashIcon
                          onClick={() => {
                            setSelectedId(review.id);
                            handleShowRemoveDialog();
                          }}
                          className="text-black cursor-pointer absolute -translate-y-1/2 top-1/2 right-2 h-5 w-5"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </Layout>
  );
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
