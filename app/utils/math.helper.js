function getRandomNumberBetween(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { getRandomNumberBetween };