"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ChartComponent from "../ChartComponent/ChartComponent";

interface DataItem {
  id: number;
  name: string;
  category: string;
  date: string;
  value: number;
}

const MultiFilterTable: React.FC = () => {
  const router = useRouter();

  const initialData: DataItem[] = [
    { id: 1, name: "Item 1", category: "A", date: "2023-01-01", value: 30 },
    { id: 2, name: "Item 2", category: "B", date: "2023-02-15", value: 50 },
    { id: 3, name: "Item 3", category: "A", date: "2023-03-10", value: 40 },
    { id: 4, name: "Item 4", category: "C", date: "2023-01-20", value: 70 },
    { id: 5, name: "Item 5", category: "B", date: "2023-02-28", value: 60 },
  ];

  const [data] = useState<DataItem[]>(initialData);
  const [category, setCategory] = useState("");

  const filteredData = data.filter((item) => {
    const matchesCategory = category ? item.category === category : true;
    return matchesCategory;
  });

  const chartData = {
    labels: [...new Set(filteredData.map((item) => item.category))],
    values: [...new Set(filteredData.map((item) => item.category))].map(
      (category) =>
        filteredData
          .filter((item) => item.category === category)
          .reduce((acc, curr) => acc + curr.value, 0)
    ),
  };

  const handleLogout = () => {
    router.push("/login");
  };

  const handleTablePage = () => {
    router.push("/data");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Графік</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
        >
          Вийти з акаунту
        </button>
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full max-w-xs p-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      >
        <option value="">Усі категорії</option>
        <option value="A">Категорія A</option>
        <option value="B">Категорія B</option>
        <option value="C">Категорія C</option>
      </select>

      <div className="w-full h-[500px]">
        <ChartComponent chartData={chartData} />
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={handleTablePage}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
        >
          Таблиця
        </button>
      </div>
    </div>
  );
};

export default MultiFilterTable;
