export async function getNotificationsFromServer() {
  try {
    console.log("Calling Notification API...");

    const response = await fetch(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        method: "GET",
        headers: {
           "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyYWRoaWthLjI2MTQ0QGdnbmluZGlhLmRyb25hY2hhcnlhLmluZm8iLCJleHAiOjE3Nzc4NzY2NjgsImlhdCI6MTc3Nzg3NTc2OCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImIzMmI2NjRhLTI1NzctNDE2OS1iNDU1LTQ4ZmUzYzA1NmQ5ZCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJhZGhpa2Ega2hhdHRlciIsInN1YiI6IjE2ZWU3NTI5LTRhYWMtNGMyMi04YjkwLTA3MTNjNjcyOTgwOSJ9LCJlbWFpbCI6InJhZGhpa2EuMjYxNDRAZ2duaW5kaWEuZHJvbmFjaGFyeWEuaW5mbyIsIm5hbWUiOiJyYWRoaWthIGtoYXR0ZXIiLCJyb2xsTm8iOiIyNjE0NCIsImFjY2Vzc0NvZGUiOiJ1a3NkV1QiLCJjbGllbnRJRCI6IjE2ZWU3NTI5LTRhYWMtNGMyMi04YjkwLTA3MTNjNjcyOTgwOSIsImNsaWVudFNlY3JldCI6InNaSkFyS2RrRmNWbXJiVEgifQ.74mtforC1_PhUrZELSVLDfC9A1kc3oxVYVCwE_2VK18"
        }
      }
    );

    const data = await response.json();

    console.log("API Raw Response:", data);

    if (!data.notifications) {
      console.log("No notifications found in response");
      return [];
    }

    return data.notifications;
  } catch (error) {
    console.log("Error while fetching notifications:", error);
    return [];
  }
}