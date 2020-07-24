import 'react-native-get-random-values';
import { times } from 'rambdax';
import { v4 as uuid } from 'uuid';
import moviesData from '@data/Movies';
import reviewsData from '@data/Reviews';
import artistsData from '@data/Artists';
import { getRandomNumberBetween } from './math.helper';

const flatMap = (fn, arr) => arr.map(fn).reduce((a, b) => a.concat(b), []);

const TOTAL_MOVIES = moviesData.length - 1;

const fuzzCount = (count) => {
    // makes the number randomly a little larger or smaller for fake data to seem more realistic
    const maxFuzz = 4;
    const fuzz = Math.round((Math.random() - 0.5) * maxFuzz * 2);
    return count + fuzz;
};

const makeRandomMovie = (i) => {
    const movie = moviesData[getRandomNumberBetween(0, TOTAL_MOVIES)];
    return {
        id: uuid(),
        created_on: Date.now() + i * 1000,
        ...movie,
    };
};

const makeRandomReview = (i, movie_id) => {
    const review = {
        id: uuid(),
        movie_id,
        body: reviewsData[i % reviewsData.length],
        created_on: Date.now() + i
    };

    return review;
};

const makeRandomArtist = () => {
    return artistsData[getRandomNumberBetween(0, artistsData.length - 1)];
};

const makeReviews = (movie, count) => {
    const reviews = times((i) => makeRandomReview(i, movie.id), count);
    movie.reviews = reviews;
    movie.data = reviews;
    movie.reviewCount = reviews.length;
};

const makeCast = (movie, count) => {
    const artists = times((i) => makeRandomArtist(i), count);
    movie.cast = artists.join(", ");
};

const generateMoviesAndReviews = (moviesCount, reviewsPerMovie, castPerMovie) => {
    const movies = times((i) => makeRandomMovie(i), moviesCount);
    flatMap((movie) => makeReviews(movie, fuzzCount(reviewsPerMovie)), movies);
    flatMap((movie) => makeCast(movie, fuzzCount(castPerMovie)), movies);

    const moviesResult = [];
    const reviews = [];

    // reviews and movies will be persisted separately so both can be lazy loaded
    movies.forEach(({ reviews: movieReviews, ...movieData }) => {
        moviesResult.push(movieData);
        reviews.push(...movieReviews);
    });

    return { movies: moviesResult, reviews };
};

export default generateMoviesAndReviews;
