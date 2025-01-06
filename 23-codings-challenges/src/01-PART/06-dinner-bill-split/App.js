import { useState } from "react";
import "./styles.css";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

function Button({ children, onClick }) {
    return (
        <button onClick={onClick} className="button">
            {children}
        </button>
    );
}

export default function App() {
    const [friends, setFriends] = useState(initialFriends);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    function toggleShowAddFriend() {
        setShowAddFriend((show) => !show);
    }

    function handleAddFriend(friend) {
        setFriends((friends) => [...friends, friend]);
        toggleShowAddFriend();
    }

    function handleUpdateBalance(value) {
        const updatedFriends = friends.map((friend) =>
            friend.id === selectedFriend.id
                ? { ...friend, balance: friend.balance + value }
                : friend
        );

        setFriends(updatedFriends);
        setSelectedFriend(null);
    }

    function handleSelectedFriend(friend) {
        setSelectedFriend(friend);
        setShowAddFriend(false);
    }

    return (
        <div className="app">
            <div className="sidebar">
                <FriendsList
                    friends={friends}
                    selectedFriend={selectedFriend}
                    onSelectFriend={handleSelectedFriend}
                />
                {showAddFriend && (
                    <FormAddFriend onAddFriend={handleAddFriend} />
                )}
                <Button onClick={toggleShowAddFriend}>
                    {showAddFriend ? "Close" : "Add Friend"}
                </Button>
            </div>

            {selectedFriend && (
                <FormSplitBill
                    key={selectedFriend.id}
                    friend={selectedFriend}
                    onUpdateFriend={handleUpdateBalance}
                />
            )}
        </div>
    );
}

function FriendsList({ friends, selectedFriend, onSelectFriend }) {
    return (
        <ul>
            {friends.map((friend) => (
                <Friend
                    friend={friend}
                    selectedFriend={selectedFriend}
                    onSelectFriend={onSelectFriend}
                    key={friend.id}
                />
            ))}
        </ul>
    );
}

function Friend({ friend, selectedFriend, onSelectFriend }) {
    const isSelected = friend.id === selectedFriend?.id;

    function handleSelect() {
        if (!isSelected) onSelectFriend(friend);
        else onSelectFriend(null);
    }

    return (
        <li className={isSelected ? "selected" : ""}>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            <p
                className={
                    friend.balance > 0
                        ? "green"
                        : friend.balance < 0
                        ? "red"
                        : ""
                }
            >
                {friend.balance === 0
                    ? `You and ${friend.name} are even`
                    : friend.balance > 0
                    ? `${friend.name} owes you ${friend.balance}$`
                    : `You owe ${friend.name} ${Math.abs(friend.balance)}$`}
            </p>
            <Button onClick={handleSelect}>
                {isSelected ? "Close" : "Select"}
            </Button>
        </li>
    );
}

function FormAddFriend({ onAddFriend }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");

    function handleSubmit(e) {
        e.preventDefault();

        if (!name.trim() || !image.trim()) return;

        const id = crypto.randomUUID();
        const newFriend = {
            id,
            name,
            image: `${image}?u=${id}`,
            balance: 0,
        };

        onAddFriend(newFriend);

        setName("");
        setImage("https://i.pravatar.cc/48");
    }

    return (
        <form className="form-add-friend" onSubmit={handleSubmit}>
            <label>👬 Friend name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label>🌄 Image URL</label>
            <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />

            <Button className="button">Add</Button>
        </form>
    );
}

function FormSplitBill({ friend, onUpdateFriend }) {
    const [bill, setBill] = useState("");
    const [paidByUser, setPaidByUser] = useState("");
    const paidByFriend = bill ? bill - paidByUser : "";

    const [whoPays, setWhoPays] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!bill || !paidByUser) return;

        const balance = whoPays === "friend" ? paidByFriend * -1 : paidByFriend;

        onUpdateFriend(balance);
    }

    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split a bill with {friend.name}</h2>

            <label>💰 Bill value</label>
            <input
                type="number"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
            />

            <label>🙋‍♂️ Your expense</label>
            <input
                type="number"
                value={paidByUser}
                onChange={(e) =>
                    setPaidByUser(
                        Number(e.target.value) > bill
                            ? paidByUser
                            : Number(e.target.value)
                    )
                }
            />

            <label>👬 {friend.name}'s expense:</label>
            <input disabled type="text" value={paidByFriend} />

            <label>🤑 Who is paying the bill?</label>
            <select
                value={whoPays}
                onChange={(e) => setWhoPays(e.target.value)}
            >
                <option value="user">You</option>
                <option value="friend">Friend</option>
            </select>

            <Button>Split bill</Button>
        </form>
    );
}
