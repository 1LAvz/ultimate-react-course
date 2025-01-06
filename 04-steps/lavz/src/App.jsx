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

                    <StepMessage step={step}>{messages[step - 1]}</StepMessage>

                    <div className="buttons">
                        <Button
                            bgColor="#7950f2"
                            color="#fff"
                            onClick={previousStep}
                        >
                            <span>👈</span> Previous
                        </Button>
                        <Button
                            bgColor="#7950f2"
                            color="#fff"
                            onClick={nextStep}
                        >
                            Next <span>👉</span>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}

function StepMessage({ step, children }) {
    return (
        <p className="message">
            <h3>Step {step}</h3>
            {children}
        </p>
    );
}

function Button({ bgColor, color, onClick, children }) {
    return (
        <button
            onClick={onClick}
            style={{ backgroundColor: bgColor, color: color }}
        >
            {children}
        </button>
    );
}
