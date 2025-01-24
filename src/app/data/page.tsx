"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
    {
      id: 1,
      name: "Ноутбук HP Pavilion",
      category: "Електроніка",
      date: "2023-01-01",
      value: 30000,
    },
    {
      id: 2,
      name: "Смартфон Samsung Galaxy S21",
      category: "Електроніка",
      date: "2023-02-15",
      value: 25000,
    },
    {
      id: 3,
      name: "Пральна машина LG",
      category: "Побутова техніка",
      date: "2023-03-10",
      value: 18000,
    },
    {
      id: 4,
      name: "Холодильник Bosch",
      category: "Побутова техніка",
      date: "2023-01-20",
      value: 22000,
    },
    {
      id: 5,
      name: "Телевізор Sony Bravia",
      category: "Електроніка",
      date: "2023-02-28",
      value: 35000,
    },
    {
      id: 6,
      name: "Пилосос Dyson",
      category: "Побутова техніка",
      date: "2023-04-05",
      value: 12000,
    },
    {
      id: 7,
      name: "Навушники Apple AirPods",
      category: "Електроніка",
      date: "2023-05-12",
      value: 7000,
    },
    {
      id: 8,
      name: "Мікрохвильова піч Panasonic",
      category: "Побутова техніка",
      date: "2023-06-18",
      value: 5000,
    },
  ];

  const [data] = useState<DataItem[]>(initialData);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortKey, setSortKey] = useState<keyof DataItem | null>(null); // Ключ сортування
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredData = data.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category ? item.category === category : true;
    const matchesDate =
      (!startDate || new Date(item.date) >= new Date(startDate)) &&
      (!endDate || new Date(item.date) <= new Date(endDate));
    return matchesSearch && matchesCategory && matchesDate;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleLogout = () => {
    router.push("/login");
  };

  const handleBackPage = () => {
    router.push("/");
  };

  const handleSort = (key: keyof DataItem) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return (
    <div className="p-5 text-black">
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="px-5 py-2.5 bg-[#ff4444] text-white border-none rounded-md cursor-pointer mb-5"
        >
          Вийти з акаунту
        </button>
      </div>

      <input
        type="text"
        placeholder="Пошук за назвою товару"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2.5 p-2.5 w-[300px] border border-black text-black block"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-2.5 p-2.5 w-[300px] block cursor-pointer"
      >
        <option value="">Усі категорії</option>
        <option value="Електроніка">Електроніка</option>
        <option value="Побутова техніка">Побутова техніка</option>
      </select>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Початкова дата:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mr-2.5"
          />
        </label>
        <label>
          Кінцева дата:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th
              className="border-b-2 border-[#ddd] p-2.5 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Назва{" "}
              {sortKey === "name" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="border-b-2 border-[#ddd] p-2.5 cursor-pointer"
              onClick={() => handleSort("category")}
            >
              Категорія{" "}
              {sortKey === "category" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="border-b-2 border-[#ddd] p-2.5 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              Дата {sortKey === "date" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="border-b-2 border-[#ddd] p-2.5 cursor-pointer"
              onClick={() => handleSort("value")}
            >
              Ціна{" "}
              {sortKey === "value" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((item) => (
              <tr key={item.id}>
                <td className="p-2.5 border-b border-[#ddd]">{item.name}</td>
                <td className="p-2.5 border-b border-[#ddd]">
                  {item.category}
                </td>
                <td className="p-2.5 border-b border-[#ddd]">{item.date}</td>
                <td className="p-2.5 border-b border-[#ddd]">
                  {item.value} грн
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-2.5 text-center">
                Товари не знайдені
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-end mt-5">
        <button
          onClick={handleBackPage}
          className="px-5 py-2.5 bg-green-500 text-white border-none rounded-md cursor-pointer"
        >
          Повернутись назад
        </button>
      </div>
    </div>
  );
};

export default MultiFilterTable;
