import { Header } from "./components/Header";
import { PromptList } from "./components/PromptList";
import { useEffect } from "react";
import { Dashboard } from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import { Chat } from "./components/Chat";
import { usePromptsStore } from "./hooks/usePromptsStore";
import { Sidebar } from "./components/Sidebar";

function App() {
  const { prompts, fetchPrompts } = usePromptsStore();

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  return (
    <>
      <div className="w-full">
        <div className="flex">
          <Sidebar>
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
