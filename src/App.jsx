import { useState } from "react";
import "./App.css";
import Result from "./result";

function App() {
  const [stickers, setStickers] = useState("");

  return (
    <div className="App">
      <div className="form-control">
        <label htmlFor="textInput">Insert the list here: </label>
        <textarea
          type="textarea"
          onChange={(e) => setStickers(e.target.value)}
          id="textInput"
          placeholder="stop last commit check"
        />
      </div>
      <Result value={stickers} />
    </div>
  );
}

export default App;
