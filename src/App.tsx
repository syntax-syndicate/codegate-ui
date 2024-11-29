import { Drawer } from "./components/Drawer";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { ListPrompt } from "./components/ListPrompt";
import { useState } from "react";
import { ListIcon } from "./components/Icons";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="w-full">
        <Header />
        <div className="flex">
          <Drawer isOpen={isOpen}>
            {isOpen && <ListPrompt />}
            <div className="flex absolute bottom-4">
              <button
                className="p-1 text-white rounded-sm bg-gray-400 hover:bg-gray-200"
                onClick={toggleDrawer}
              >
                <ListIcon />
              </button>
            </div>
          </Drawer>
          <div className="p-4">
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/settings" element={<div>Settings</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
