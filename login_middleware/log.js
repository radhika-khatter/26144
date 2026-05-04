export async function Log(stack, level, packageName, message) {
  try {
    await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyYWRoaWthLjI2MTQ0QGdnbmluZGlhLmRyb25hY2hhcnlhLmluZm8iLCJleHAiOjE3Nzc4NzY2NjgsImlhdCI6MTc3Nzg3NTc2OCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImIzMmI2NjRhLTI1NzctNDE2OS1iNDU1LTQ4ZmUzYzA1NmQ5ZCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJhZGhpa2Ega2hhdHRlciIsInN1YiI6IjE2ZWU3NTI5LTRhYWMtNGMyMi04YjkwLTA3MTNjNjcyOTgwOSJ9LCJlbWFpbCI6InJhZGhpa2EuMjYxNDRAZ2duaW5kaWEuZHJvbmFjaGFyeWEuaW5mbyIsIm5hbWUiOiJyYWRoaWthIGtoYXR0ZXIiLCJyb2xsTm8iOiIyNjE0NCIsImFjY2Vzc0NvZGUiOiJ1a3NkV1QiLCJjbGllbnRJRCI6IjE2ZWU3NTI5LTRhYWMtNGMyMi04YjkwLTA3MTNjNjcyOTgwOSIsImNsaWVudFNlY3JldCI6InNaSkFyS2RrRmNWbXJiVEgifQ.74mtforC1_PhUrZELSVLDfC9A1kc3oxVYVCwE_2VK18"
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: packageName,
        message: message,
      }),
    });
  } catch (error) {
    console.error("Logging failed");
  }
}