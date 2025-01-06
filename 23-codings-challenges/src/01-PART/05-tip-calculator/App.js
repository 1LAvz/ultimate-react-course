import { useState } from "react";

export default function App() {
    return (
        <div className="App">
            <TipCalculator />
        </div>
    );
}

function TipCalculator() {
    const [bill, setBill] = useState(0);
    const [yourTip, setYourTip] = useState(0);
    const [friendTip, setFriendTip] = useState(0);

    const tips = bill * ((yourTip + friendTip) / 2 / 100);

    function handleReset() {
        setBill(0);
        setYourTip(0);
        setFriendTip(0);
    }

    return (
        <div>
            <InputBill bill={bill} onBillInformed={setBill} />

            <SelectTipPercentage tip={yourTip} onTip={setYourTip}>
                How did you like the service?
            </SelectTipPercentage>

            <SelectTipPercentage tip={friendTip} onTip={setFriendTip}>
                How did your friend like the service?
            </SelectTipPercentage>

            <OutputPrice bill={bill} tips={tips} />

            <Reset onReset={handleReset} />
        </div>
    );
}

function InputBill({ bill, onBillInformed }) {
    return (
        <div>
            <label htmlFor="bill">How much was the bill?</label>
            <input
                id="bill"
                type="number"
                value={bill > 0 ? bill : ""}
                onChange={(e) => onBillInformed(Number(e.target.value))}
            ></input>
        </div>
    );
}

function SelectTipPercentage({ tip, onTip, children }) {
    const percentages = {
        DISSATISFIED: 0,
        OKAY: 5,
        GOOD: 10,
        AMAZING: 20,
    };

    function handlePercentage(percentage) {
        onTip(percentage);
    }

    return (
        <div>
            <label>{children}</label>
            <select
                value={tip}
                onChange={(e) => handlePercentage(Number(e.target.value))}
            >
                <option value={percentages.DISSATISFIED}>
                    Dissatisfied ({percentages.DISSATISFIED}%)
                </option>
                <option value={percentages.OKAY}>
                    It was okay ({percentages.OKAY}%)
                </option>
                <option value={percentages.GOOD}>
                    It was good ({percentages.GOOD}%)
                </option>
                <option value={percentages.AMAZING}>
                    Absolutely amazing! ({percentages.AMAZING}%)
                </option>
            </select>
        </div>
    );
}

function OutputPrice({ bill, tips }) {
    return (
        bill > 0 && (
            <h2>
                You pay ${bill + tips} (${bill} + ${tips} tip)
            </h2>
        )
    );
}

function Reset({ onReset }) {
    return <button onClick={onReset}>Reset</button>;
}
