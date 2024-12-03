import { Header } from "./components/Header";
import { PromptList } from "./components/PromptList";
import { useEffect } from "react";
import { Dashboard } from "./components/Dashboard";
import { MOCKED_CHATS } from "./mock/chat";
import { Routes, Route } from "react-router-dom";
import { ChatMsgList } from "./components/ChatMsgList";
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
          <div className="w-full">
            <Header />

            <div className="w-full p-6">
              <Routes>
                <Route path="/" element={<Dashboard prompts={prompts} />} />
                <Route
                  path="/prompt/:id"
                  element={<ChatMsgList chats={MOCKED_CHATS} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
