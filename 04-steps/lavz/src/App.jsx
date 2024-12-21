import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [showSteps, setShowSteps] = useState(true);

  function nextStep() {
    if (step < 3) {
      setStep((s) => s + 1);
    }
  }

  function previousStep() {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  }

  return (
    <>
      <button className="close" onClick={() => setShowSteps((is) => !is)}>
        x
      </button>
      {showSteps && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              onClick={previousStep}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
