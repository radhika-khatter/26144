import { getNotificationsFromServer } from "./fetchData.js";
import { getTopPriority } from "./priorityNotification.js";
import { Log } from "../login_middleware/log.js";

async function executePriorityFlow() {
  try {
    console.log(" Starting Stage 6 execution...");

    await Log("backend", "info", "service", "Fetching notifications");

    const notifications = await getNotificationsFromServer();

    console.log("Fetched Notifications Count:", notifications.length);

    if (notifications.length === 0) {
      console.log(" No data received. Check token or API.");
      return;
    }

    const topNotifications = getTopPriority(notifications, 10);

    console.log("\n TOP PRIORITY NOTIFICATIONS:\n");
    console.log(topNotifications);

    await Log("backend", "info", "service", "Top notifications computed");
  } catch (error) {
    console.log(" Error in execution:", error);
    await Log("backend", "error", "service", "Stage 6 failed");
  }
}

executePriorityFlow();