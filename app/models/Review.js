const ReviewSchema = {
    name: 'Review',
    properties: {
        id: "string",
        created_on: { type: "int", indexed: true },
        movie_id: { type: "string", indexed: true },
        body: "string"
    }
}

export default ReviewSchema;