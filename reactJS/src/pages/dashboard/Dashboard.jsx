import React, { useState } from "react";
import NavBar from "../../components/home/NavBar/navBar.component";
import AllTasks from "../../components/home/AllTasks/allTasks.component";
import PendingTasks from "../../components/home/PendingTasks/pendingTasks.component";
import CompletedTasks from "../../components/home/CompletedTasks/completedTasks.component";
import HomePage from "../../components/home/HomePage/homePage.component";
import "./Dashboard.css";
export default function Dashboard() {
  const [navIndex, setNavIndex] = useState(0);
  const getContent = () => {
    switch (navIndex) {
      case 0:
        return <HomePage />;
      case 1:
        return <AllTasks />;
      case 2:
        return <PendingTasks />;
      case 3:
        return <CompletedTasks />;
      default:
        return;
    }
  };
  return (
    <div className="Dashboard">
      <NavBar />
      <main className="row no-gutters">
        <div className="sidebar col-md-4 col-lg-2">
          <ul>
            <li
              className={`${navIndex === 0 && "active"}`}
              onClick={() => setNavIndex(0)}
            >
              Dashboard
            </li>
            <li
              className={`${navIndex === 1 && "active"}`}
              onClick={() => setNavIndex(1)}
            >
              All Tasks
            </li>
            <li
              className={`${navIndex === 2 && "active"}`}
              onClick={() => setNavIndex(2)}
            >
              Pending Tasks
            </li>
            <li
              className={`${navIndex === 3 && "active"}`}
              onClick={() => setNavIndex(3)}
            >
              Completed Tasks
            </li>
          </ul>
        </div>
        <div className="mainContent col-md-8 col-lg-10">{getContent()}</div>
      </main>
    </div>
  );
}
