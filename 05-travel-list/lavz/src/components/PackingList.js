import { useState } from "react";
import Item from "./Item";

export const ORDER = {
    INPUT: "input order",
    DESCRIPTION: "description order",
    PACKED: "packed",
};

export default function PackingList({
    items,
    onDeleteItems,
    onUpdateItemPacked,
    onClearList,
}) {
    const [sortBy, setSortBy] = useState(ORDER.INPUT);

    let sortedItems;

    switch (sortBy) {
        case ORDER.INPUT:
            sortedItems = items;
            break;
        case ORDER.DESCRIPTION:
            sortedItems = items
                .slice()
                .sort((a, b) => a.description.localeCompare(b.description));
            break;
        case ORDER.PACKED:
            sortedItems = items.slice().sort((a, b) => a.packed - b.packed);
            break;
        default:
    }

    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        onDeleteItems={onDeleteItems}
                        onUpdateItemPacked={onUpdateItemPacked}
                    />
                ))}
            </ul>
            <div className="actions">
                <select
                    name="select order"
                    id="select-order"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value={ORDER.INPUT}>SORT BY INPUT ORDER</option>
                    <option value={ORDER.DESCRIPTION}>
                        SORT BY DESCRIPTION
                    </option>
                    <option value={ORDER.PACKED}>SORT BY PACKED STATUS</option>
                </select>
                <button onClick={onClearList}>CLEAR LIST</button>
            </div>
        </div>
    );
}
