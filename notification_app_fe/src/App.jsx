import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [page, setPage] = useState(1);

  const LIMIT = 5;

  
  const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyYWRoaWthLjI2MTQ0QGdnbmluZGlhLmRyb25hY2hhcnlhLmluZm8iLCJleHAiOjE3Nzc4NzkwMTksImlhdCI6MTc3Nzg3ODExOSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjlhYzlhNzI3LTYyNmUtNDQwZS1iOWUzLTViZmExMDAwZDU3ZCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJhZGhpa2Ega2hhdHRlciIsInN1YiI6IjE2ZWU3NTI5LTRhYWMtNGMyMi04YjkwLTA3MTNjNjcyOTgwOSJ9LCJlbWFpbCI6InJhZGhpa2EuMjYxNDRAZ2duaW5kaWEuZHJvbmFjaGFyeWEuaW5mbyIsIm5hbWUiOiJyYWRoaWthIGtoYXR0ZXIiLCJyb2xsTm8iOiIyNjE0NCIsImFjY2Vzc0NvZGUiOiJ1a3NkV1QiLCJjbGllbnRJRCI6IjE2ZWU3NTI5LTRhYWMtNGMyMi04YjkwLTA3MTNjNjcyOTgwOSIsImNsaWVudFNlY3JldCI6InNaSkFyS2RrRmNWbXJiVEgifQ.jHvOFvefNlfs1F9zYz-Ru5yJI3oDakzP1AJXXVSBLbY";

  // 
  async function fetchPaginatedData() {
    try {
      const res = await axios.get(
        `http://20.207.122.201/evaluation-service/notifications?limit=${LIMIT}&page=${page}`,
        {
          headers: {
            Authorization: TOKEN,
          },
        }
      );

      setNotifications(res.data.notifications || []);
    } catch (error) {
      console.log("Pagination API Error:", error);
    }
  }

  async function fetchAllData() {
    try {
      const res = await axios.get(
        "http://20.207.122.201/evaluation-service/notifications",
        {
          headers: {
            Authorization: TOKEN,
          },
        }
      );

      setAllNotifications(res.data.notifications || []);
    } catch (error) {
      console.log("Full API Error:", error);
    }
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    fetchPaginatedData();
  }, [page]);

  function getPriority(type) {
    if (type === "Placement") return 3;
    if (type === "Result") return 2;
    return 1;
  }

  function getTopNotifications(data) {
    return [...data]
      .sort((a, b) => {
        const diff = getPriority(b.Type) - getPriority(a.Type);
        if (diff !== 0) return diff;

        return new Date(b.Timestamp) - new Date(a.Timestamp);
      })
      .slice(0, 5);
  }

  const topNotifications = getTopNotifications(allNotifications);

  return (
    <div style={{ padding: "20px" }}>
   
      <h2>All Notifications (Page {page})</h2>

      {notifications.map((item) => (
        <div key={item.ID} style={{ marginBottom: "10px" }}>
          <p>{item.Message}</p>
          <small>
            {item.Type} | {item.Timestamp}
          </small>
        </div>
      ))}

   
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>

        <button onClick={() => setPage(page + 1)} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>

      <h2 style={{ marginTop: "30px" }}>Priority Notifications</h2>

      {topNotifications.length === 0 ? (
        <p>No priority data (check token)</p>
      ) : (
        topNotifications.map((item) => (
          <div key={item.ID} style={{ marginBottom: "10px" }}>
            <p>{item.Message}</p>
            <small>{item.Type}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default App;