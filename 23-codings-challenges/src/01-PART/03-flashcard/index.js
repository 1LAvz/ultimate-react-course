import reactDOM from "react-dom/client";
import React from "react";
import { useState } from "react";
import "./style.css";

const questions = [
    {
        id: 3457,
        question: "What language is React based on?",
        answer: "JavaScript",
    },
    {
        id: 7336,
        question: "What are the building blocks of React apps?",
        answer: "Components",
    },
    {
        id: 8832,
        question:
            "What's the name of the syntax we use to describe a UI in React?",
        answer: "JSX",
    },
    {
        id: 1297,
        question: "How to pass data from parent to child components?",
        answer: "Props",
    },
    {
        id: 9103,
        question: "How to give components memory?",
        answer: "useState hook",
    },
    {
        id: 2002,
        question:
            "What do we call an input element that is completely synchronised with state?",
        answer: "Controlled element",
    },
];

function App() {
    return (
        <div className="flashcards">
            {questions.map((question) => (
                <FlashCard question={question} key={question.id} />
            ))}
        </div>
    );
}

function FlashCard({ question }) {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div
            className={showAnswer && "selected"}
            onClick={() => setShowAnswer((prev) => !prev)}
        >
            <p>{showAnswer ? question.answer : question.question}</p>
        </div>
    );
}

const root = reactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
