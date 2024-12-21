import { useState } from "react";

const initialList = [
  {
    quantity: 2,
    item: "Passaports",
  },
  {
    quantity: 12,
    item: "Socks",
  },
  {
    quantity: 2,
    item: "Charger",
  },
  {
    quantity: 2,
    item: "Toothbrush",
  },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}
function Form() {
  const [packingList, setPackingList] = useState(initialList);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const newItem = { ...data, quantity: Number(data.quantity) };

    setPackingList((prevList) => [...prevList, newItem]);
  }

  return (
    <>
      <div className="add-form">
        <h3>What do you need for your 😍 trip?</h3>
        <form onSubmit={handleSubmit}>
          <select name="quantity">
            {Array.from({ length: 20 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <input name="item" type="text"></input>
          <button type="submit">ADD</button>
        </form>
      </div>
      <PackingList itemList={packingList} />
    </>
  );
}

function PackingList({ itemList }) {
  const [itemChecked, setItemChecked] = useState(false);
  const [packingList, setPackingList] = useState(itemList);

  function remove(item) {
    console.log(item);

    setPackingList((prevList) => prevList.filter((el) => el !== item));
  }

  return (
    <div className="list">
      <ul>
        {packingList.map((item, index) => {
          return (
            <li key={index}>
              <input
                type="checkbox"
                onClick={() => setItemChecked((c) => !c)}
              ></input>
              <p>
                {itemChecked ? (
                  <s>
                    {item.quantity} {item.item}
                  </s>
                ) : (
                  `${item.quantity} ${item.item}`
                )}
              </p>
              <button onClick={() => remove(item)}>X</button>
            </li>
          );
        })}
      </ul>

      <select>
        <option value="">SORT BY INPUT ORDER</option>
      </select>
      <button>CLEAR LIST</button>
    </div>
  );
}
function Stats() {
  return (
    <footer>
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
