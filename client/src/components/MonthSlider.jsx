import { useState } from "react";
import "../styles/MonthSlider.css";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function MonthSlider() {

  const [index, setIndex] = useState(0);

  const nextMonth = () => {
    if(index < 11) setIndex(index + 1);
  };

  const prevMonth = () => {
    if(index > 0) setIndex(index - 1);
  };

  const daysInMonth = 31; // later dynamically karenge

  return (
    <div className="month-area">

      {/* Header */}
      <div className="month-header">
        <button onClick={prevMonth} disabled={index === 0}>◀</button>

        <h2>{months[index]}</h2>

        <button onClick={nextMonth} disabled={index === 11}>▶</button>
      </div>

      {/* Habit Grid */}
      <div className="grid-box">

        {/* Left Habits List */}
        <div className="habit-col">
          <p>Study</p>
          <p>Workout</p>
          <p>Reading</p>
          <p>Sleep Early</p>
        </div>

        {/* Day Columns */}
        <div className="days-grid">
          {
            [...Array(daysInMonth)].map((_,i)=>(
              <div key={i} className="day-cell">
                {i+1}
              </div>
            ))
          }
        </div>

      </div>
    </div>
  );
}

export default MonthSlider;
