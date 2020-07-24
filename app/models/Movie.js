const MovieSchema = {
    name: "Movie",
    properties: {
        id: { type: "string", indexed: true },
        created_on: { type: "int", indexed: true },
        name: "string",
        poster: "string",
        gender: "string",
        description: "string",
        cast: "string",
    }
}

export default MovieSchema;