import { SurveyQuestion } from "@types";
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Pie,
  PieChart,
  Tooltip,
  Cell,
} from "recharts";

export const SurveyResponseChart = ({
  question,
}: {
  question: SurveyQuestion;
}) => {
  const singleData = question.options.map((option) => {
    return {
      option,
      value: question.answerPercentages[option] || 0,
    };
  });

  const multiData = question.options.map((option) => {
    return {
      subject: option,
      percentage: question.answerPercentages[option] || 0,
      fullMark: 100,
    };
  });

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#6A5ACD", "#00FF7F"];

  if (question.type === "radio") {
    return (
      <PieChart width={400} height={300}>
        <Pie
          data={singleData}
          dataKey="value"
          nameKey="option"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
        >
          {singleData.map((entry, index) => (
            <Cell key={entry.option} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        {/*@ts-ignore*/}
        <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
      </PieChart>
    );
  }

  return (
    <RadarChart
      cx={250}
      cy={200}
      outerRadius={150}
      width={600}
      height={400}
      data={multiData}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <Radar
        dataKey="percentage"
        stroke="#041a72"
        fill="#041a72"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
};
