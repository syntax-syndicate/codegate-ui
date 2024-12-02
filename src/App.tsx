import { Drawer } from "./components/Drawer";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { PromptList } from "./components/PromptList";
import { useState } from "react";
import { ListIcon } from "./components/Icons";
import { MOCKED_PROMPTS } from "./mock/prompts";
import { Dashboard } from "./components/Dashboard";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="w-full">
        <Header />
        <div className="flex">
          <Drawer isOpen={isOpen}>
            {isOpen && <PromptList prompts={MOCKED_PROMPTS} />}
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
              <Route
                path="/"
                element={<Dashboard prompts={MOCKED_PROMPTS} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
