import { Alert, Prompt } from "./types";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export async function getPrompts(): Promise<Prompt[]> {
  try {
    const res = await fetch(`${BASE_URL}/dashboard/messages`);
    const data = await res.json();
    console.log("Prompts: ", data);
    return data;
  } catch {
    return [];
  }
}

export async function getAlerts(): Promise<Alert[]> {
  try {
    const res = await fetch(`${BASE_URL}/dashboard/alerts`);
    const data = await res.json();
    console.log("Alerts: ", data);
    return data;
  } catch {
    return [];
  }
}
