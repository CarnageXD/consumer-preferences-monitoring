import { ProductWithAvgRatingAndCount } from "@pages/analytics/ratings";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export const AvgProductRatingChart = ({
  products,
}: {
  products: ProductWithAvgRatingAndCount[];
}) => {
  const chartData = [
    { range: "0-1", value: 0 },
    { range: "1-2", value: 0 },
    { range: "2-3", value: 0 },
    { range: "3-4", value: 0 },
    { range: "4-5", value: 0 },
  ];

  products.forEach((product) => {
    const rating = Math.floor(product.averageRating);
    if (rating >= 0 && rating <= 5) {
      chartData[rating].value += 1;
    }
  });

  const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#6A5ACD", "#00FF7F"];

  return (
    <div className="flex justify-center">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "10px" }}>
          {chartData.map((entry, index) => (
            <div key={entry.range}>
              <span style={{ color: colors[index % colors.length] }}>
                Рейтинг {entry.range}
              </span>
              : ({((entry.value / total) * 100).toFixed(2)}%)
            </div>
          ))}
        </div>
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="range"
            cx="50%"
            cy="50%"
            outerRadius={200}
            fill="#8884d8"
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.range} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} продукти`} />
        </PieChart>
      </div>
    </div>
  );
};
