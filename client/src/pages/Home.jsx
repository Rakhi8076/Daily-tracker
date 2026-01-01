import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <div className="hero">

        <p className="badge">Productivity Made Simple</p>

        <h1>
          Stay Consistent, Stay Ahead with
          <span> Productivity Tracker</span>
        </h1>

        <p className="tag">
          Track daily growth, build strong habits and level up yourself
          with a beautifully simple dashboard.
        </p>

        <div className="hero-btns">
          <Link to="/dashboard">
            <button className="primary">Go to Dashboard</button>
          </Link>

          <Link to="/login">
            <button className="outline">Login</button>
          </Link>
        </div>
      </div>

      <div className="features-title">Why People Love This App?</div>

      <div className="features">
        <div className="feature-card blue">
          <h3>Smart Progress Tracking</h3>
          <p>
            Track weekly & monthly growth with clean analytics
            designed to actually help you improve.
          </p>
        </div>

        <div className="feature-card green">
          <h3> Personalized Experience</h3>
          <p>
            Custom themes, flexible controls and a dashboard
            that feels truly yours.
          </p>
        </div>

        <div className="feature-card purple">
          <h3>Simple & User Friendly</h3>
          <p>
            Minimal, distraction-free and beautifully designed
            for students & professionals.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Home;
