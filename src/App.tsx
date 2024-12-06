import { Header } from "./components/Header";
import { PromptList } from "./components/PromptList";
import { useEffect } from "react";
import { Dashboard } from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import { Chat } from "./components/Chat";
import { usePromptsStore } from "./hooks/usePromptsStore";
import { Sidebar } from "./components/Sidebar";
import { useBrowserNotification } from "./hooks/useBrowserNotification";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

function App() {
  const { prompts, loading, fetchPrompts } = usePromptsStore();
  const { sendNotification } = useBrowserNotification();

  const eventSource = new EventSource(`${BASE_URL}/alerts_notify`);

  eventSource.onmessage = function (event) {
    if (event.data.toLowerCase().includes("new alert detected")) {
      sendNotification("CodeGate Dashboard", {
        body: "New Alert detected!",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  return (
    <>
      <div className="w-full">
        <div className="flex">
          <Sidebar loading={loading}>
            <PromptList prompts={prompts} />
          </Sidebar>
          <div className="w-screen h-screen">
            <Header />
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/prompt/:id" element={<Chat />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
