export default function Stats({ items }) {
    if (!items.length) {
        return (
            <footer className="stats">
                <em>Start adding some items to your packing list</em>
            </footer>
        );
    }

    const packedCount = items.reduce(
        (count, item) => count + (item.packed ? 1 : 0),
        0
    );

    const percentage = Math.round((packedCount / items.length) * 100);

    return (
        <footer className="stats">
            <em>
                {percentage !== 100
                    ? `💼 You have ${items.length} items on your list, and you already
                packed ${packedCount} (${percentage}%)`
                    : "You got everything! Ready to go ✈️"}
            </em>
        </footer>
    );
}
