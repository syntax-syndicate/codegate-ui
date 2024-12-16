import { extractTitleFromMessage } from "@/lib/utils";
import { Prompt } from "@/types";
import { useLocation } from "react-router-dom";

const routes = [
  { path: "/certificates/security", breadcrumb: "Certificate Security" },
  { path: "/certificates", breadcrumb: "Certificate Download" },
  { path: "/help/continue-setup", breadcrumb: "Continue Setup" },
  { path: "/help/copilot-setup", breadcrumb: "CoPilot Setup" },
  { path: "/prompt/", breadcrumb: "Dashboard" },
  { path: "/", breadcrumb: "" },
];

export function useBreadcrumb(prompts: Prompt[]) {
  const { pathname } = useLocation();

  const match = routes.find((route) => pathname.startsWith(route.path));
  if (match?.path === "/prompt/") {
    try {
      const promptId = pathname.split("/").pop();
      const chat = prompts.find((prompt) => prompt.chat_id === promptId);
      const title = chat?.question_answers?.[0].question.message ?? "";
      return extractTitleFromMessage(title) ?? "";
    } catch {
      return "";
    }
  }

  return match ? match.breadcrumb : "";
}
