import React, { useLayoutEffect, useState } from "react";
import { Layout } from "@components/common";
import { Product } from "@types";
import Image from "next/image";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Textarea } from "@components/common";
import { getApiUrl } from "@utils";
import { Rating } from "react-simple-star-rating";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "@utils/mutation-fetcher";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbDownIcon as ThumbDownSolid,
  HandThumbUpIcon as ThumbUpSolid,
} from "@heroicons/react/24/solid";
import { useAuth } from "@context/auth";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function ProductPage({ product }: { product: Product }) {
  const { user, isAuthenticated } = useAuth();
  const [avgRate, setAvgRate] = useState(0);
  const [userRate, setUserRate] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitError, setReviewSubmitError] = useState("");
  const [recommendProduct, setRecommendProduct] = useState<null | boolean>(
    null
  );
  const [localReviews, setLocalReviews] = useState<any>(product.review || []);

  const userId = user?.id;
  const userName = user?.firstName;
  const cheeseType = product.type;
  const cheeseTypeText =
    cheeseType === "processed"
      ? "Плавлені сири"
      : cheeseType === "weighted"
      ? "Сири тверді вагові"
      : cheeseType === "packaged"
      ? "Сири тверді фасовані"
      : "";

  const { push } = useRouter();

  const { data: reviews, trigger: addReview } = useSWRMutation(
    getApiUrl("review"),
    mutationFetcher("POST")
  );

  console.log("reviews", reviews);

  const { data: latestRating, trigger: addRate } = useSWRMutation(
    getApiUrl("rating"),
    mutationFetcher("POST")
  );

  const { trigger: removeRate } = useSWRMutation(
    getApiUrl(
      `rating/${
        product.rating.find((rate) => rate.user.id === userId)?.id ||
        latestRating?.id
      }`
    ),
    mutationFetcher("DELETE")
  );

  const tableData = [
    { title: "Упаковка", value: product?.packaging },
    { title: "Форма", value: product?.form },
    { title: "Маса нетто", value: product?.netWeight + "g" },
    {
      title: "Термін та умови зберігання",
      value: product?.periodAndTermsOfStorage,
    },
  ];

  const handleAddRate = async (value: string) => {
    if (!isAuthenticated) {
      push("/login");
      return;
    }

    setUserRate(+value);

    const rating = { userId, productId: product.id, rating: value };

    const res = await addRate(rating);
    if (res) {
      toast.success("Дякуємо за Вашу оцінку.");
    }
  };

  const handleRemoveRate = () => {
    setUserRate(null);
    //@ts-ignore
    removeRate();
  };

  const handleReview = async () => {
    if (!reviewText || recommendProduct === null) {
      setReviewSubmitError("Заповніть всі поля!");
      return;
    }

    if (reviewText.length < 10) {
      setReviewSubmitError("Мінімальна довжина відгуку 10 символів");
      return;
    }

    if (!isAuthenticated) {
      push("/login");
      return;
    }

    setReviewSubmitError("");

    const review: any = await addReview({
      name: userName,
      content: reviewText,
      recommended: recommendProduct,
      productId: product.id,
      userId,
    });

    setLocalReviews((prevReviews: any) => [...prevReviews, review]);
    toast.success("Дякуємо за Ваш відгук.");

    setReviewText("");
    setRecommendProduct(null);
  };

  useLayoutEffect(() => {
    const totalRatingCount = product.rating.length;

    if (!totalRatingCount && !userRate) {
      setAvgRate(0);
      return;
    }

    const sumRating = product.rating.reduce(
      (prev, cur) => prev + cur.rating,
      0
    );

    const averageRating = userRate
      ? (sumRating + userRate) / (totalRatingCount + 1)
      : sumRating / totalRatingCount;

    setAvgRate(averageRating);
  }, [userRate]);

  useLayoutEffect(() => {
    const userRating = product.rating.find((rate) => rate.user.id === userId);

    if (userRating) {
      setUserRate(userRating.rating);
    }
  }, [user, product]);

  if (!product) {
    return null;
  }

  return (
    <Layout className="pb-24">
      <div className="grid md:grid-cols-2">
        <div>
          <Image
            width={680}
            height={680}
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="mt-8 flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <Typography className="font-bold text-2xl">
              {product.name}
            </Typography>
            <Typography className="text-gray-900 font-medium text-sm uppercase">
              {/*TODO: add enum*/}
              {cheeseTypeText}
            </Typography>
          </div>
          <Typography className="text-lg">{product.description}</Typography>
          <table className="bg-gray-300 min-w-fit">
            <tbody>
              {tableData.map(({ title, value }) => (
                <tr key={title}>
                  <td className="p-2 font-medium">{title}</td>
                  <td className="p-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <Typography className="text-xl font-medium">
              Оцінити товар:
            </Typography>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <Rating
                  initialValue={userRate || avgRate}
                  allowFraction
                  allowHover={false}
                  onClick={(value) => {
                    handleAddRate(value.toString());
                  }}
                />
                {userRate && (
                  <Typography
                    onClick={handleRemoveRate}
                    className="cursor-pointer text-sm hover:text-red-500"
                  >
                    Видалити оцінку
                  </Typography>
                )}
              </div>
              <Typography color="blue-gray" className="font-medium">
                {userRate
                  ? userRate.toFixed(1) +
                    " Ваша оцінка (Середній рейтинг: " +
                    avgRate.toFixed(1) +
                    ")"
                  : avgRate.toFixed(1) + " Середній рейтинг"}
              </Typography>
            </div>
          </div>
          <div>
            <Typography className="text-xl mb-2 font-medium">
              Залишити свій відгук про товар:
            </Typography>
            <Textarea
              value={reviewText}
              setValue={setReviewText}
              placeholder="Введіть відгук"
            />
            <div className="flex justify-end mb-4 gap-2">
              <Typography className="text-lg">
                Чи рекомендуєте ви цей товар?
              </Typography>
              {!recommendProduct && recommendProduct !== null ? (
                <ThumbDownSolid
                  onClick={() => setRecommendProduct(false)}
                  className="h-6 w-6 text-primary-crimson cursor-pointer"
                />
              ) : (
                <HandThumbDownIcon
                  onClick={() => setRecommendProduct(false)}
                  className="h-6 w-6 cursor-pointer"
                />
              )}

              {recommendProduct ? (
                <ThumbUpSolid
                  onClick={() => setRecommendProduct(true)}
                  className="h-6 w-6 text-primary-blue cursor-pointer"
                />
              ) : (
                <HandThumbUpIcon
                  onClick={() => setRecommendProduct(true)}
                  className="h-6 w-6 cursor-pointer"
                />
              )}
            </div>
            {reviewSubmitError && (
              <div className="flex mb-2 justify-end">
                <Typography className="text-sm font-medium text-red-600">
                  {reviewSubmitError}
                </Typography>
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={handleReview} className="bg-primary-blue">
                Залишити відгук
              </Button>
            </div>
          </div>
          {!!localReviews.length && (
            <div>
              <Typography className="text-xl mb-2 font-medium">
                Відгуки про товар:
              </Typography>
              {localReviews
                //@ts-ignore
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((rev: any) => (
                  <div
                    key={rev.id}
                    className={`mb-4 ${
                      rev.recommended ? "bg-green-100" : "bg-red-100"
                    } py-2 px-4 rounded-xl`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <Typography className="font-medium text-lg">
                        {rev.name}
                      </Typography>
                      <Typography className="italic">
                        {rev.recommended ? "Рекомендує" : "Не рекомендує"} цей
                        товар
                      </Typography>
                    </div>
                    <Typography>{rev.content}</Typography>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({
  query,
}: {
  query: { slug: string[] };
}) => {
  try {
    const tag = query.slug[0];
    const url = getApiUrl(`products/${tag}`);

    console.log("url", url);

    const res = await fetch(url);
    const product = await res.json();

    return { props: { product } };
  } catch (error) {
    console.error(error);
    return { props: { product: null } };
  }
};
