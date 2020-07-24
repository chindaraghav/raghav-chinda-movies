import { useState } from 'react'

function useMovieState() {
    const [movies, addMovies] = useState([]);
    const setInitialMovies = (data = []) => {
        addMovies([...data.reverse().slice(0, 30), ...movies]);
    }
    const paginateMovies = (data) => {
        addMovies([...movies, ...data]);
    }
    return { movies, setInitialMovies, paginateMovies }
}

export default useMovieState;