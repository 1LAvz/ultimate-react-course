import { useEffect } from "react";

export function useKey(keys, action) {
    useEffect(
        function () {
            function callback(e) {
                const keysOnLowerCase = keys.map((key) => key.toLowerCase());
                const allowAction = keysOnLowerCase.includes(
                    e.code.toLowerCase()
                );
                if (allowAction) {
                    action();
                }
            }

            document.addEventListener("keydown", callback);

            return function () {
                document.removeEventListener("keydown", callback);
            };
        },
        [keys, action]
    );
}
