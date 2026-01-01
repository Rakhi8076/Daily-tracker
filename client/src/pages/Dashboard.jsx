import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const options = [
    { title: "Weekly Tracker", path: "/weekly" },
    { title: "Monthly Tracker", path: "/monthly" },
    { title: "Finance Tracker", path: "/finance" },
    { title: "Analytics & Progress", path: "/analytics" }
  ];

  return (
    <div className="dash-wrapper">
      
      <h1 className="dash-title">Dashboard</h1>

      <div className="dash-grid">
        {options.map((box, index) => (
          <div 
            key={index} 
            className="dash-card"
            onClick={() => navigate(box.path)}
          >
            {box.title}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;
