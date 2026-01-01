import { useState, useEffect } from "react";
import api from "../api";

const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const defaultRows = Array.from({ length: 10 }, () => "");

function WeeklyTracker() {

  const [weekIndex, setWeekIndex] = useState(0); // 0 → Week1 ... 51 → Week52

  // ******** 52 Week Wise Data ********
  const [rowsData,setRowsData] = useState(
    Array(52).fill(null).map(()=> [...defaultRows])
  );

  const [gridData,setGridData] = useState(
    Array(52).fill(null).map(()=> 
      Array(10).fill(null).map(()=> Array(7).fill(false))
    )
  );

  const rows = rowsData[weekIndex];
  const grid = gridData[weekIndex];


  // ================= TOGGLE CELL =================
  const toggleCell = (r,c)=>{
    const updated = grid.map(row=> [...row]);
    updated[r][c] = !updated[r][c];

    const newGrid = [...gridData];
    newGrid[weekIndex] = updated;
    setGridData(newGrid);
  };

  // ================= UPDATE ROW NAME =================
  const updateRow = (val,i)=>{
    const updated = [...rows];
    updated[i] = val;

    const newRows = [...rowsData];
    newRows[weekIndex] = updated;
    setRowsData(newRows);
  };


  // ================= LOAD WEEK FROM DB =================
 const loadWeek = async ()=>{

  try{
    const res = await api.get(`/weekly/get?week=${weekIndex+1}`);

    if(res.data.success && res.data.record){

      const saved = res.data.record;

      // ---- Restore Habit Titles Safe ----
      const copyRows = [...rowsData];

      copyRows[weekIndex] = [
        ...saved.habits.map(h=> h.title || ""),
        ...Array(10 - saved.habits.length).fill("")
      ];
      setRowsData(copyRows);


      // ---- Restore Ticks Safe ----
      const copyGrid = [...gridData];

      copyGrid[weekIndex] = [
        ...saved.habits.map(h=> h.days),
        ...Array(10 - saved.habits.length)
          .fill(Array(7).fill(false))
      ];

      setGridData(copyGrid);
    }

  }catch(err){
    console.log("LOAD FAILED",err);
  }
};


  useEffect(()=>{
    loadWeek();
  },[weekIndex]);


  // ================= SAVE =================
  const saveWeek = async ()=>{

    const habits = rows.map((title,i)=>({
      title,
      days: grid[i]
    }));

    try{
      await api.post("/weekly/save",{
        week: weekIndex+1,
        habits
      });

      alert(`Week ${weekIndex+1} Saved Successfully 🎉`);
    }
    catch(err){
      console.log(err);
      alert("Save Failed ❌");
    }
  };


  return(
    <div style={{padding:"20px"}}>

      <h2>Weekly Tracker 📅</h2>

      {/* Week Navigation */}
      <div style={{display:"flex",justifyContent:"space-between",width:"450px"}}>
        <button 
          disabled={weekIndex===0} 
          onClick={()=>setWeekIndex(weekIndex-1)}
        >
          ⬅
        </button>

        <h3>Week {weekIndex+1} / 52</h3>

        <button 
          disabled={weekIndex===51} 
          onClick={()=>setWeekIndex(weekIndex+1)}
        >
          ➡
        </button>
      </div>


      {/* Header */}
      <div style={{display:"grid",gridTemplateColumns:`160px repeat(7,60px)`,gap:"6px",marginTop:"15px"}}>
        <div style={{fontWeight:"bold"}}>Habit</div>
        {days.map(d=>(
          <div key={d} style={{fontWeight:"bold",textAlign:"center"}}>{d}</div>
        ))}
      </div>


      {/* Rows */}
      {rows.map((row,r)=>(
        <div 
          key={r} 
          style={{display:"grid",gridTemplateColumns:`160px repeat(7,60px)`,gap:"6px",marginTop:"6px"}}
        >
          <input
            value={row}
            placeholder={`Habit ${r+1}`}
            onChange={(e)=>updateRow(e.target.value,r)}
          />

          {days.map((_,c)=>(
            <div 
              key={c}
              onClick={()=>toggleCell(r,c)}
              style={{
                width:"55px",
                height:"40px",
                borderRadius:"6px",
                cursor:"pointer",
                background:grid[r][c] ? "#2563eb" : "#ddd",
                color:grid[r][c] ? "white" : "black",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
              }}
            >
              {grid[r][c] ? "✔" : ""}
            </div>
          ))}
        </div>
      ))}


      <button 
        onClick={saveWeek} 
        style={{marginTop:"15px",padding:"10px 20px",cursor:"pointer"}}
      >
        Save Week
      </button>

    </div>
  )
}

export default WeeklyTracker;
