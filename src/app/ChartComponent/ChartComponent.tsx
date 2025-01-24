import React from "react";

interface ChartData {
  labels: string[];
  values: number[];
}

const CustomBarChart: React.FC<{ chartData: ChartData }> = ({ chartData }) => {
  const maxValue = Math.ceil(Math.max(...chartData.values) / 10) * 10;
  const scaleFactor = maxValue ? 200 / maxValue : 1;

  return (
    <div className="w-full h-[500px] p-6 rounded-lg flex justify-start items-center pl-0">
      <svg
        height="100%"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid meet"
      >
        {Array.from({ length: 6 }, (_, i) => i * 10).map((tickValue) => {
          const yPosition = 250 - tickValue * scaleFactor;
          return (
            <g key={tickValue}>
              <line
                x1="40"
                x2="380"
                y1={yPosition}
                y2={yPosition}
                stroke="#e2e8f0"
                strokeDasharray="4"
              />
              <text
                x="30"
                y={yPosition + 5}
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                {tickValue}
              </text>
            </g>
          );
        })}

        {chartData.values.map((value, index) => {
          const barHeight = value * scaleFactor;
          return (
            <g key={index}>
              <rect
                x={index * 60 + 50}
                y={250 - barHeight}
                width="40"
                height={barHeight}
                fill="#3b82f6"
                className="transition-all duration-300 hover:fill-blue-600 hover:shadow-lg"
              />
              <text
                x={index * 60 + 70}
                y={250 - barHeight - 5}
                textAnchor="middle"
                className="text-xs fill-gray-700"
              >
                {value}
              </text>
              <text
                x={index * 60 + 70}
                y={260}
                textAnchor="middle"
                className="text-sm fill-gray-700 pt-2"
              >
                {chartData.labels[index]}
              </text>
            </g>
          );
        })}

        <line x1="40" y1="250" x2="40" y2="50" stroke="#cbd5e1" />
        <line x1="40" y1="250" x2="380" y2="250" stroke="#cbd5e1" />
      </svg>
    </div>
  );
};

export default CustomBarChart;
