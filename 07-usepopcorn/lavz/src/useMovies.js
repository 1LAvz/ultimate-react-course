import { useState, useEffect } from "react";

const OMBD_API_KEY = "288c12a6";
const OMDB_URL = `http://www.omdbapi.com/?apikey=${OMBD_API_KEY}`;

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(
        function () {
            const controller = new AbortController();

            async function searchMovies() {
                try {
                    setIsLoading(true);
                    setError("");
                    const res = await fetch(`${OMDB_URL}&s=${query}`, {
                        signal: controller.signal,
                    });

                    if (!res.ok) {
                        throw new Error(
                            "Some error ocurred while fetching movies"
                        );
                    }

                    const data = await res.json();

                    if (data.Error === "Movie not found!")
                        throw new Error(data.Error);

                    setMovies(data.Search);
                } catch (error) {
                    if (error.name !== "AbortError") {
                        setError(error.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }

            if (query.length < 3) {
                setMovies([]);
                setError("");
                return;
            }

            // handleCloseMovie();
            searchMovies();

            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return { movies, isLoading, error };
}
