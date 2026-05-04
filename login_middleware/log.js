export async function Log(stack, level, packageName, message) {
  try {
    await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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