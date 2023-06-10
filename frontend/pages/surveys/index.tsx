import { Layout, PageHeader } from "@components/common";
import { SurveyRemoveDialog } from "@components/survey";
import { useAuth } from "@context/auth";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Button, Typography } from "@material-tailwind/react";
import { Survey } from "@types";
import { getApiUrl } from "@utils";
import { mutationFetcher } from "@utils/mutation-fetcher";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

export default function Surveys({ surveys }: { surveys: Survey[] }) {
  const [localSurveys, setLocalSurveys] = useState<Survey[]>(surveys);
  const [removalId, setRemovalId] = useState<number | null>(null);
  const [showRemoveDialog, setRemoveDialog] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { push } = useRouter();

  const { trigger: removeSurvey } = useSWRMutation(
    getApiUrl(`surveys/${removalId}`),
    mutationFetcher("DELETE")
  );

  const handleShowRemoveDialog = () => setRemoveDialog(!showRemoveDialog);

  const handleRemoval = async () => {
    const removedSurvey: Survey = await removeSurvey({});

    const newSurveys = localSurveys.filter(
      (survey) => survey.id !== removedSurvey.id
    );
    setLocalSurveys(newSurveys);

    handleShowRemoveDialog();
  };

  const isAnalyst = user?.role === "ANALYST";

  return (
    <Layout className="pb-24">
      <SurveyRemoveDialog
        handleRemoval={handleRemoval}
        showRemoveDialog={showRemoveDialog}
        handleShowRemoveDialog={handleShowRemoveDialog}
      />
      <PageHeader text="Перелік опитувань" />
      <div className="grid grid-cols-3 w-full gap-10">
        {isAnalyst && (
          <Link
            href="/surveys/create-or-edit"
            className="group border-2 border-primary-blue h-[250px] hover:bg-primary-blue rounded-xl flex justify-center items-center transition-all"
          >
            <PlusIcon className="text-primary-blue group-hover:text-white h-10 w-10 transition-all" />
          </Link>
        )}
        {localSurveys &&
          localSurveys.map(({ title, id }) => (
            <div
              onClick={() =>
                isAuthenticated
                  ? isAnalyst
                    ? {}
                    : push("/survey/" + id)
                  : push("/login")
              }
              key={title}
              className="group cursor-pointer flex justify-center h-[250px] rounded-xl bg-primary-blue relative"
            >
              <Typography
                className={`flex justify-center text-xl items-center text-center text-white font-medium ${
                  isAnalyst
                    ? "group-hover:text-opacity-0"
                    : "group-hover:text-primary-yellow"
                } transition-all`}
              >
                {title}
              </Typography>
              {isAnalyst && (
                <div className="absolute top-0 left-0 justify-center items-center flex-col gap-2 h-full w-full hidden group-hover:flex">
                  <Button
                    color="green"
                    variant="outlined"
                    onClick={() => push("/survey/" + id)}
                  >
                    Пройти
                  </Button>
                  <Button
                    color="yellow"
                    variant="outlined"
                    onClick={() =>
                      push({
                        query: { id },
                        pathname: "surveys/create-or-edit",
                      })
                    }
                  >
                    Редагувати
                  </Button>
                  <Button
                    onClick={() => {
                      setRemovalId(id);
                      handleShowRemoveDialog();
                    }}
                    color="red"
                    variant="outlined"
                  >
                    Видалити
                  </Button>
                </div>
              )}
            </div>
          ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  try {
    const url = getApiUrl("surveys");
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch surveys");
    }

    const surveys = await res.json();

    return { props: { surveys } };
  } catch (error) {
    console.error(error);
    return { props: { surveys: null } };
  }
};
