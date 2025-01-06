import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";
import "./index.css";
import App from "./App";

function Test() {
    const [rating, setRating] = useState(0);

    function handleRating(rate) {
        setRating(rate);
    }

    return (
        <div>
            <StarRating onSetRating={handleRating} ratingSize={20} />
            <span>The rating is {rating}</span>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
        {/* <StarRating
            defaultRating={3}
            ratingSize={5}
            messages={["terrible", "bad", "ok", "good", "excelent"]}
        />
        <StarRating ratingSize={5} color="red" size={36} />
        <Test />  */}
    </React.StrictMode>
);
