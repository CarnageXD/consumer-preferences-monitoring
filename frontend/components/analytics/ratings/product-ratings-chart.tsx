import React, { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { Button, Typography } from "@material-tailwind/react";

import "react-datepicker/dist/react-datepicker.css";
import { Product } from "@types";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Дата: ${label}`}</p>
        <p className="intro">{`Рейтинг: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const ProductRatingsChart = ({ product }: { product: Product }) => {
  const [isCalendarSet, setIsCalendarSet] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const chartData = useMemo(() => {
    if (!isCalendarSet) {
      return product.rating
        .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
        .map((r) => ({
          date: dayjs(r.createdAt).format("DD-MM-YYYY"),
          rating: r.rating,
        }));
    }

    return product.rating
      .filter(
        (rate) =>
          new Date(rate.createdAt) >= startDate &&
          new Date(rate.createdAt) <= endDate
      )
      .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
      .map((r) => ({
        date: dayjs(r.createdAt).format("DD-MM-YYYY"),
        rating: r.rating,
      }));
  }, [product, isCalendarSet, startDate, endDate]);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Typography className="font-medium">Обрати проміжок часу:</Typography>
        <div className="flex items-center gap-2">
          <div className="mb-4 px-2 border-2 border-[#216ba5] gap-2 flex rounded-xl w-fit flex-row items-center">
            <div className="border-r-2 border-r-[#216ba5] pr-2 mr-2">
              <Typography className="font-normal">Від</Typography>
              <DatePicker
                todayButton="Today"
                selected={startDate}
                dateFormat="dd-MM-yyyy"
                onChange={(date: any) => {
                  setIsCalendarSet(true);
                  setStartDate(date);
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="outline-none"
              />
            </div>
            <div>
              <Typography className="font-normal">До</Typography>
              <DatePicker
                todayButton="Today"
                selected={endDate}
                dateFormat="dd-MM-yyyy"
                onChange={(date: any) => {
                  setIsCalendarSet(true);
                  setEndDate(date);
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="outline-none"
              />
            </div>
          </div>
          <Button onClick={() => setIsCalendarSet(false)} className="mb-3">
            Очистити фільтр
          </Button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dy={10} dataKey="date" stroke="black" />
          <YAxis domain={[0, 5]} stroke="black" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#041a72"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductRatingsChart;
