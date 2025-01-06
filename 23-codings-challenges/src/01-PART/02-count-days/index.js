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

    function handleStep(e) {
        console.log(e.target.value);

        setStep((s) => Number(e.target.value));
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

    function handleReset() {
        setStep(1);
        setCount(0);
    }

    return (
        <>
            <div>
                <input
                    type="range"
                    min="1"
                    max="20"
                    value={step}
                    onChange={(e) => handleStep(e)}
                ></input>
                <label>{step}</label>
            </div>
            <div>
                <button onClick={decreaseCount}>-</button>
                <input
                    type="text"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                ></input>
                <button onClick={increaseCount}>+</button>
                <p></p>
            </div>
            <p>
                {count === 0
                    ? `Today is ${getCurrentDate()}`
                    : `${count} from today is ${getFutureDate(count)}`}
            </p>
            {count !== 0 ||
                (step !== 1 && <button onClick={handleReset}>reset</button>)}
        </>
    );
}

function App() {
    return (
        <div
            className="App"
            style={{
                textAlign: "center",
            }}
        >
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
