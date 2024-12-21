import { useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function getDate(daysToAdd = 0) {
    const dt = new Date();
    dt.setDate(dt.getDate() + daysToAdd);

    return dt.toDateString();
  }

  function getCurrentDate() {
    return getDate();
  }

  function getFutureDate(daysToAdd) {
    return getDate(daysToAdd);
  }

  function handleStep() {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  }

  function decreaseCount() {
    if (count - step <= 0) {
      setCount((s) => 0);
    } else {
      setCount((s) => s - step);
    }
  }

  function increaseCount() {
    setCount((s) => s + step);
  }

  return (
    <>
      <div>
        <button onClick={handleStep}>-</button>
        <span>Step: {step}</span>
        <button onClick={() => setStep((s) => s + 1)}>+</button>
      </div>
      <div>
        <button onClick={decreaseCount}>-</button>
        <span>Count: {count}</span>
        <button onClick={increaseCount}>+</button>
        <p></p>
      </div>
      <p>
        {count === 0
          ? `Today is ${getCurrentDate()}`
          : `${count} from today is ${getFutureDate(count)}`}
      </p>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
