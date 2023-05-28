import { Layout, PageHeader } from "@components/common";
import { useAuth } from "@context/auth";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Surveys() {
  const { isAuthenticated, user } = useAuth();
  const { push } = useRouter();

  const surveys = [
    { title: "Задоволення продукцією", href: "/satisfaction" },
    { title: "Уподобання смаку", href: "/satisfaction" },
    { title: "Нова продукція", href: "/satisfaction" },
    { title: "Цінова політика", href: "/satisfaction" },
    { title: "Упаковка та дизайн", href: "/satisfaction" },
    { title: "Додаткові послуги та сервіс", href: "/satisfaction" },
  ];

  const isAnalyst = user?.role === "ANALYST";

  return (
    <Layout className="pb-24">
      <PageHeader text="Актуальні опитування" />
      <div className="grid grid-cols-3 w-full gap-10">
        <Link
          href="/surveys/createOrEdit"
          className="group border-2 border-primary-blue h-[250px] hover:bg-primary-blue rounded-xl flex justify-center items-center transition-all"
        >
          <PlusIcon className="text-primary-blue group-hover:text-white h-10 w-10 transition-all" />
        </Link>
        {surveys.map(({ title, href }) => (
          <div
            onClick={() => (isAnalyst ? {} : push("/survey" + href))}
            key={title}
            className="group flex justify-center h-[250px] rounded-xl bg-primary-blue relative"
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
                  color="yellow"
                  variant="outlined"
                  onClick={() => push("/surveys/createOrEdit")}
                >
                  Редагувати
                </Button>
                <Button color="red" variant="outlined">
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
