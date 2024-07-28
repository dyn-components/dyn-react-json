import { useState } from "react";
import "./App.scss";
import DynComponent from "./src";

function App() {
  const [count, setCount] = useState(0);
  const jsonData = {
    name: "John",
    age: 30,
    address: {
      city: "New York",
      postalCode: "10001",
    },
    hobbies: ["reading", "travelling"],
    isActive: true,
    data: [1, 2, 3],
    test: null,
  };

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <hr />
      <DynComponent data={jsonData} />
    </>
  );
}

export default App;
