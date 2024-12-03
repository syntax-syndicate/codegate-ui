import { Drawer } from "./components/Drawer";
import { Header } from "./components/Header";
import { PromptList } from "./components/PromptList";
import { useEffect, useState } from "react";
import { ListIcon } from "./components/Icons";
import { Dashboard } from "./components/Dashboard";
import { MOCKED_CHATS } from "./mock/chat";
import { Routes, Route } from "react-router-dom";
import { ChatMsgList } from "./components/ChatMsgList";
import { usePromptsStore } from "./hooks/usePromptsStore";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleDrawer = () => setIsOpen(!isOpen);
  const { prompts, fetchPrompts } = usePromptsStore();

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  return (
    <>
      <div className="w-full">
        <Header />
        <div className="flex">
          <Drawer isOpen={isOpen}>
            {isOpen && <PromptList prompts={prompts} />}
            <div className="flex absolute bottom-4">
              <button
                className="p-1 text-white rounded-sm bg-gray-400 hover:bg-gray-200"
                onClick={toggleDrawer}
              >
                <ListIcon />
              </button>
            </div>
          </Drawer>

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
    </>
  );
}

export default App;
