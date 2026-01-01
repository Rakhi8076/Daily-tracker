import { useState, useEffect } from "react";
import "../styles/MonthTracker.css";
import api from "../api";

const months = [
  { name: "January 2026", days: 31 },
  { name: "February 2026", days: 29 },
  { name: "March 2026", days: 31 },
  { name: "April 2026", days: 30 },
  { name: "May 2026", days: 31 },
  { name: "June 2026", days: 30 },
  { name: "July 2026", days: 31 },
  { name: "August 2026", days: 31 },
  { name: "September 2026", days: 30 },
  { name: "October 2026", days: 31 },
  { name: "November 2026", days: 30 },
  { name: "December 2026", days: 31 }
];

const defaultRows = Array.from({ length: 10 }, () => "");

function MonthlyTrackerPage() {

  const [monthIndex, setMonthIndex] = useState(0);
  const days = Array.from({ length: months[monthIndex].days }, (_, i) => i + 1);

  // Month-wise rows
  const [rowsData, setRowsData] = useState(
    Array(12).fill(null).map(() => [...defaultRows])
  );

  // Month-wise grid
  const [gridData, setGridData] = useState(
    Array(12).fill(null).map(() =>
      Array(10).fill(null).map(() => Array(31).fill(false))
    )
  );

  const rows = rowsData[monthIndex];
  const grid = gridData[monthIndex];


  // ================= FETCH DATA =================
  const fetchProgress = async () => {
    try {
      const res = await api.get(`/progress/get?year=2026&month=${monthIndex + 1}`);

      if (res.data.success && res.data.record) {
        const habits = res.data.record.habits;

        const newRows = [...rowsData];
        newRows[monthIndex] = habits.map(h => h.title);
        setRowsData(newRows);

        const newGrid = [...gridData];
        newGrid[monthIndex] = habits.map(h => h.days);
        setGridData(newGrid);
      }

    } catch (err) {
      console.log("Fetch Error:", err.message);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [monthIndex]);


  // ================= SAVE DATA =================
  const saveProgress = async () => {
    const habitsData = rows.map((title, index) => ({
      title,
      days: grid[index]
    }));

    try {
      await api.post("/progress/save", {
        year: 2026,
        month: monthIndex + 1,
        habits: habitsData
      });

      alert("Progress Saved 🎉");
      fetchProgress();   // ⬅️ Save ke baad reload

    } catch (err) {
      console.log(err);
      alert("Save Failed ❌");
    }
  };


  const toggleCell = (r, c) => {
    const updated = grid.map(row => [...row]);
    updated[r][c] = !updated[r][c];

    const newGrid = [...gridData];
    newGrid[monthIndex] = updated;
    setGridData(newGrid);
  };


  const updateRowName = (value, index) => {
    const updated = [...rows];
    updated[index] = value;

    const newRows = [...rowsData];
    newRows[monthIndex] = updated;
    setRowsData(newRows);
  };


  return (
    <div className="tracker">

      {/* Month Navigation */}
      <div className="month-wrapper">
        <button 
          className="slide-btn left"
          disabled={monthIndex === 0}
          onClick={() => setMonthIndex(monthIndex - 1)}
        >
          ◀
        </button>

        <h2 className="month-title">
          {months[monthIndex].name}
        </h2>

        <button 
          className="slide-btn right"
          disabled={monthIndex === 11}
          onClick={() => setMonthIndex(monthIndex + 1)}
        >
          ▶
        </button>
      </div>


      {/* Scrollable Table */}
      <div className="month-table-container">

        {/* Header */}
        <div 
          className="header-row" 
          style={{ gridTemplateColumns: `160px repeat(${days.length},45px)` }}
        >
          <div className="habit-header">Task / Habit</div>

          {days.map(d => (
            <div key={d} className="day-box">{d}</div>
          ))}
        </div>


        {/* Rows */}
        {rows.map((row, rIndex) => (
          <div 
            className="row" 
            key={rIndex}
            style={{ gridTemplateColumns: `160px repeat(${days.length},45px)` }}
          >
            <input
              className="habit-input"
              placeholder={`Task / Habit ${rIndex + 1}`}
              value={row}
              onChange={(e) => updateRowName(e.target.value, rIndex)}
            />

            {days.map((d, cIndex) => (
              <div
                key={cIndex}
                className={`cell ${grid[rIndex][cIndex] ? "active" : ""}`}
                onClick={() => toggleCell(rIndex, cIndex)}
              >
                {grid[rIndex][cIndex] ? "✔" : ""}
              </div>
            ))}
          </div>
        ))}
      </div>


      {/* Save */}
      <button 
        onClick={saveProgress} 
        style={{
          marginTop:"20px",
          padding:"10px 20px",
          borderRadius:"8px",
          background:"#2563eb",
          color:"white",
          border:"none",
          cursor:"pointer"
        }}
      >
        Save Progress 🧾
      </button>

    </div>
  );
}

export default MonthlyTrackerPage;
