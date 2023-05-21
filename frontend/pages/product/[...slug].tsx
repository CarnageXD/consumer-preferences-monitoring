import React, { useState } from "react";
import { Layout } from "@components/common";
import { Product } from "@types";
import Image from "next/image";
import { Button, Rating, Textarea, Typography } from "@material-tailwind/react";

export default function Product() {
  const [rate, setRate] = useState(4);

  const mockedProduct: Omit<Product, "tag"> = {
    name: "Український",
    description:
      "Сир твердий «Український» ТМ «Пирятин» — один з фаворитів серед любителів традиційних сирів. Він виготовляється з натурального коров’ячого молока, має приємний, яскраво виражений сирний смак з легкою кислинкою та містить велику кількість корисних вітамінів та мікроелементів, що робить його незамінним продуктом у раціоні людини. Сир твердий «Український» ТМ «Пирятин» використовують як самостійну закуску, так і доповнення до різноманітних страв. Цей сир стане чудовим інгредієнтом гарячих бутербродів, піци, макаронних виробів, салатів тощо.",
    image:
      "https://milkalliance.com.ua/uploads/gallery_photo/photo/0393/78.png",
    type: "packaged",
    netWeight: "90",
    form: "Брикет",
    packaging: "Флоу-пак",
    periodAndTermsOfStorage: "120 діб за температури -4...+8°С",
  };

  const tableData = [
    { title: "Упаковка", value: mockedProduct.packaging },
    { title: "Форма", value: mockedProduct.form },
    { title: "Маса нетто", value: mockedProduct.netWeight + "g" },
    {
      title: "Термін та умови зберігання",
      value: mockedProduct.periodAndTermsOfStorage,
    },
  ];

  return (
    <Layout>
      <div className="grid md:grid-cols-2">
        <div>
          <Image
            width={680}
            height={680}
            src={mockedProduct.image}
            alt={mockedProduct.name}
          />
        </div>
        <div className="mt-8 flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <Typography className="font-bold text-2xl">
              {mockedProduct.name}
            </Typography>
            <Typography className="text-gray-900 font-medium text-sm uppercase">
              сири тверді фасовані
            </Typography>
          </div>
          <Typography className="text-lg">
            {mockedProduct.description}
          </Typography>
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
              <Rating value={rate} onChange={(value) => setRate(value)} />
              <Typography color="blue-gray" className="font-medium">
                {rate}.0 середній рейтинг
              </Typography>
            </div>
          </div>
          <div>
            <Typography className="text-xl font-medium">
              Залишити свій відгук про товар:
            </Typography>
            <textarea className="my-2 transition-all border-gray-300 p-2 resize-none w-full min-h-[150px] border-2 hover:border-primary-blue focus:border-primary-blue rounded-xl" />
            <div className="flex justify-end">
              <Button className="bg-primary-blue">Залишити відгук</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
