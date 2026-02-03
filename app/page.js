"use client";

import { useState } from "react";

export default function Home() {
  const [state, setState] = useState();

  const [ todos, Settodos] = useState([]);

  const [ inputvalue]

  const handleChangeAllButton = () => {
    setState("All");
  };

  console.log("this is state now", state);

  return (
    <div>
      <button
        onClick={handleChangeAllButton}
        style={{
          width: "100px",
          height: "10px",
          backgroundColor: state === "All" ? "blue" : "white",
        }}
      >
        All
      </button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  );
}
