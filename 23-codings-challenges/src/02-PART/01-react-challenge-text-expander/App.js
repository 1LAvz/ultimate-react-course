import { useState } from "react";
import "./styles.css";

export default function App() {
    return (
        <div>
            <TextExpander>
                Space travel is the ultimate adventure! Imagine soaring past the
                stars and exploring new worlds. It's the stuff of dreams and
                science fiction, but believe it or not, space travel is a real
                thing. Humans and robots are constantly venturing out into the
                cosmos to uncover its secrets and push the boundaries of what's
                possible.
            </TextExpander>

            <TextExpander
                collapsedNumWords={17}
                expandButtonText="Show text"
                collapseButtonText="Collapse text"
                buttonColor="#ff6622"
                open={true}
            >
                Space travel requires some seriously amazing technology and
                collaboration between countries, private companies, and
                international space organizations. And while it's not always
                easy (or cheap), the results are out of this world. Think about
                the first time humans stepped foot on the moon or when rovers
                were sent to roam around on Mars.
            </TextExpander>

            <TextExpander collapsedNumWords={500} className="box2">
                Labore in non enim proident in ex minim ipsum dolor in
                consectetur. Proident cillum exercitation ea aliquip sit sunt
                elit quis do labore deserunt irure non. Irure cillum
                reprehenderit sit fugiat velit minim ex proident.
            </TextExpander>

            <TextExpander expanded={true}></TextExpander>
        </div>
    );
}

function TextExpander({
    collapsedNumWords = 40,
    expandButtonText = "Show more",
    collapseButtonText = "Show less",
    buttonColor = "#3f2a7f",
    open = false,
    className = "box",
    children = "",
}) {
    const [isOpen, setIsOpen] = useState(open);

    const button = {
        color: buttonColor,
        font: "inherit",
        cursor: "pointer",
    };

    const shortText = children.split(" ").slice(0, collapsedNumWords).join(" ");
    const displayText = isOpen
        ? children
        : shortText.charAt(shortText.length - 1) === "."
        ? shortText + ".."
        : shortText + "...";

    const showFormatedText = collapsedNumWords < children.length;

    return (
        children.length > 0 && (
            <div className={className}>
                <p className="displayText">
                    {showFormatedText ? displayText : children}
                </p>

                {showFormatedText && (
                    <span
                        role="button"
                        style={button}
                        onClick={() => {
                            setIsOpen((isOpen) => !isOpen);
                        }}
                    >
                        {" "}
                        {isOpen ? collapseButtonText : expandButtonText}
                    </span>
                )}
            </div>
        )
    );
}
