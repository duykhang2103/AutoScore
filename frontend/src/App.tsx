import { useState } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
function App() {
  return (
    <div className="w-[800px] h-[650px] m-auto mt-5 border border-black rounded-sm">
      <Header />
      <Body />
    </div>
  );
}

export default App;
