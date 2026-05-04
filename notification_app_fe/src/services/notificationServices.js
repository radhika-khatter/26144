import axios from "axios";

const BASE_URL = "http://20.207.122.201/evaluation-service";

export async function getPaginatedNotifications(page, limit, token) {
  const res = await axios.get(
    `${BASE_URL}/notifications?limit=${limit}&page=${page}`,
    {
      headers: { Authorization: token },
    }
  );
  return res.data.notifications || [];
}

export async function getAllNotifications(token) {
  const res = await axios.get(`${BASE_URL}/notifications`, {
    headers: { Authorization: token },
  });
  return res.data.notifications || [];
}