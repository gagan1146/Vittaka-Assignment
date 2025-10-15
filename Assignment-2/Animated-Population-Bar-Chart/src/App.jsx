import React, { useEffect, useState, useRef } from "react";
import './App.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function App() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(1960);
  const [displayYear, setDisplayYear] = useState(1960);
  const [chartData, setChartData] = useState([]);
  const intervalRef = useRef(null);

  // Fetch data
  useEffect(() => {
    fetch(
      "https://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/poplution-countries-yearwise.json"
    )
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  // Helper: top 10 countries for a given year
  const getTop10ForYear = (y) => {
    const yearData = data
      .filter((d) => d.Year === y)
      .sort((a, b) => b.Value - a.Value)
      .slice(0, 10);
    return yearData;
  };

  // Animation logic
  useEffect(() => {
    if (data.length === 0) return;
    clearInterval(intervalRef.current);

    setDisplayYear(1960);
    let currentYear = 1960;

    intervalRef.current = setInterval(() => {
      if (currentYear > year) {
        clearInterval(intervalRef.current);
        return;
      }
      setChartData(getTop10ForYear(currentYear));
      setDisplayYear(currentYear);
      currentYear++;
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, [year, data]);

  const years = Array.from({ length: 2018 - 1960 + 1 }, (_, i) => 1960 + i);

  return (
    <div className="container">
      <h1 className="title">World Population (Animated)</h1>

      <div className="controls">
        <label htmlFor="year-select">Select Year:</label>
        <select
          id="year-select"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <h2 className="year-display">Year: {displayYear}</h2>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 20, right: 40, left: 100, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickFormatter={(v) => v.toLocaleString()}
            />
            <YAxis
              type="category"
              dataKey="Country Name"
              width={150}
            />
            <Tooltip
              formatter={(val) => val.toLocaleString()}
              labelFormatter={(label) => `Country: ${label}`}
            />
            <Bar dataKey="Value" fill="#4A90E2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
