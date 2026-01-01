import { useState, useEffect } from "react";
import api from "../api";
import "../styles/FinanceTracker.css";

function FinanceTracker() {

  const [month, setMonth] = useState(1);
  const [year] = useState(2026);

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const [records, setRecords] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);


  // ===== FETCH DATA =====
  const fetchFinance = async () => {
    try {
      const res = await api.get(`/finance/get?year=${year}&month=${month}`);

      if(res.data.success){
        setRecords(res.data.records);
        setTotalIncome(res.data.income || 0);
        setTotalExpense(res.data.expense || 0);
      }

    } catch {
      alert("Failed to load finance ❌");
    }
  };

  useEffect(() => {
    fetchFinance();
  }, [month]);


  // ===== ADD ENTRY =====
  const addRecord = async (e) => {
    e.preventDefault();
    
    if(!amount) return alert("Enter amount");

    try {
      const res = await api.post("/finance/add", {
        year,
        month,
        type,
        amount: Number(amount),
        note
      });

      if(res.data.success){
        fetchFinance();
        setAmount("");
        setNote("");
      }

    } catch {
      alert("Failed to add ❌");
    }
  };


  return (
    <div className="finance-wrapper">

      <h1 className="finance-title">Monthly Finance Tracker</h1>

      {/* Month Selector */}
      <select 
        value={month}
        onChange={(e)=> setMonth(Number(e.target.value))}
        className="month-select"
      >
        {[...Array(12)].map((_,i)=>(
          <option value={i+1} key={i}>
            Month {i+1}
          </option>
        ))}
      </select>


      {/* Summary Boxes */}
      <div className="summary-box">
        <div className="box">Income: ₹{totalIncome}</div>
        <div className="box">Expense: ₹{totalExpense}</div>
        <div className="box">Balance: ₹{totalIncome - totalExpense}</div>
      </div>


      {/* Add Form */}
      <form className="finance-form" onSubmit={addRecord}>
        
        <select
          value={type}
          onChange={(e)=> setType(e.target.value)}
          className="select-type"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input 
          type="number"
          placeholder="Amount ₹"
          value={amount}
          onChange={(e)=> setAmount(e.target.value)}
          className="input-amount"
        />

        <input 
          placeholder="Note (optional)"
          value={note}
          onChange={(e)=> setNote(e.target.value)}
          className="input-note"
        />

        <button className="btn-add">
          Add
        </button>

      </form>


      {/* Records Table */}
      <table className="finance-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Note</th>
          </tr>
        </thead>

        <tbody>
          {records.map(r => (
            <tr key={r._id}>
              <td>
                {r.type === "income" ? "🟢 Income" : "🔴 Expense"}
              </td>
              <td>₹{r.amount}</td>
              <td>{r.note || "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default FinanceTracker;
