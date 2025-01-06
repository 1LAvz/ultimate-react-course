// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

const CURRENCY_API_URL = "https://api.frankfurter.app/latest";

const currencies = ["USD", "EUR", "CAD", "INR", "BRL"];

export default function App() {
    const [amount, setAmount] = useState("");
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("BRL");
    const [convertedCurrency, setConvertedCurrency] = useState("");
    const [loading, setLoading] = useState(false);

    const filteredCurrency = currencies.filter((currency) => currency !== from);

    useEffect(
        function () {
            const controller = new AbortController();
            const signal = controller.signal;

            async function fetchConvertedCurrency() {
                // console.log(from, to);
                try {
                    setLoading(true);
                    const res = await fetch(
                        `${CURRENCY_API_URL}?amount=${amount}&from=${from}&to=${to}`,
                        { signal }
                    );

                    const data = await res.json();

                    setAmount(amount);
                    setConvertedCurrency(data.rates[to].toFixed(2));
                } catch (err) {
                    if (err.name !== "AbortError") console.log(err.message);
                } finally {
                    setLoading(false);
                }
            }

            if (amount > 0) {
                fetchConvertedCurrency();
            } else {
                setConvertedCurrency("");
            }

            return function () {
                controller.abort();
            };
        },
        [amount, from, to]
    );

    return (
        <div>
            <input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
            />
            <select onChange={(e) => setFrom(e.target.value)}>
                {currencies.map((currency) => {
                    return (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    );
                })}
            </select>
            <select onChange={(e) => setTo(e.target.value)} value={to}>
                {filteredCurrency.map((currency) => {
                    return (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    );
                })}
            </select>
            <p>{loading ? <Loading /> : convertedCurrency}</p>
        </div>
    );
}

function Loading() {
    return <span>Converting...</span>;
}
