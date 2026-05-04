import { useEffect, useState } from "react";
import {
  getPaginatedNotifications,
  getAllNotifications,
} from "./services/notificationServices";
import { getTopNotifications } from "./utils/priorityHelper";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [page, setPage] = useState(1);

  const LIMIT = 5;

  const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyYWRoaWthLjI2MTQ0QGdnbmluZGlhLmRyb25hY2hhcnlhLmluZm8iLCJleHAiOjE3Nzc4Nzk5MjUsImlhdCI6MTc3Nzg3OTAyNSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjkzODEzMTM1LWNmYzAtNGM3ZC1hODVmLTM2N2VmM2Y4YTkyMiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJhZGhpa2Ega2hhdHRlciIsInN1YiI6IjE2ZWU3NTI5LTRhYWMtNGMyMi04YjkwLTA3MTNjNjcyOTgwOSJ9LCJlbWFpbCI6InJhZGhpa2EuMjYxNDRAZ2duaW5kaWEuZHJvbmFjaGFyeWEuaW5mbyIsIm5hbWUiOiJyYWRoaWthIGtoYXR0ZXIiLCJyb2xsTm8iOiIyNjE0NCIsImFjY2Vzc0NvZGUiOiJ1a3NkV1QiLCJjbGllbnRJRCI6IjE2ZWU3NTI5LTRhYWMtNGMyMi04YjkwLTA3MTNjNjcyOTgwOSIsImNsaWVudFNlY3JldCI6InNaSkFyS2RrRmNWbXJiVEgifQ.mz6x1PLwTC48DrNaRmSMFY__Urjon6NMYTYMtnf-mnQ";

  useEffect(() => {
    async function loadAll() {
      const data = await getAllNotifications(TOKEN);
      setAllNotifications(data);
    }
    loadAll();
  }, []);

  useEffect(() => {
    async function loadPage() {
      const data = await getPaginatedNotifications(page, LIMIT, TOKEN);
      setNotifications(data);
    }
    loadPage();
  }, [page]);

  const topNotifications = getTopNotifications(allNotifications);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Notifications (Page {page})</h2>

      {notifications.map((item) => (
        <div key={item.ID}>
          <p>{item.Message}</p>
          <small>{item.Type}</small>
        </div>
      ))}

      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>

      <h2>Priority Notifications</h2>

      {topNotifications.map((item) => (
        <div key={item.ID}>
          <p>{item.Message}</p>
          <small>{item.Type}</small>
        </div>
      ))}
    </div>
  );
}

export default App;