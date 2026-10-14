import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import BusList from "./BusList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/buses" element={<BusList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;