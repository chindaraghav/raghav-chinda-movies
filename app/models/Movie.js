const MovieSchema = {
    name: "Movie",
    properties: {
        id: "string",
        name: "string",
        poster: "string",
        gender: "string",
        description: "string",
        cast: "Artist[]",
    }
}

export default MovieSchema;