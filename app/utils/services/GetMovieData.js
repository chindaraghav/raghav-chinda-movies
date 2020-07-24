import httpMethods from '../api/httpMethods';
import APIRequest from './APIRequest';
import unmock from 'unmock-browser';
import Config from 'react-native-config';
import generateMoviesAndReviews from '@utils/generate';

const CONSTANT_DATE = Date.now();

const PATH = '/movies';
const PATH_WITH_DATE = PATH + `/${CONSTANT_DATE}`;

// When user has not synced
const initialMoviesData = generateMoviesAndReviews(300, 4, 4);

// When user has already synced then resolved with new data
const newMovieData = generateMoviesAndReviews(1, 4, 4);


export const mockMoviesAPI = (unmock) => {
  unmock.on();

  unmock
    .nock(Config.API_URL, 'movies')
    .get(PATH)
    .reply(200, initialMoviesData);

  unmock
    .nock(Config.API_URL, 'movies')
    .get(PATH_WITH_DATE)
    .reply(200, newMovieData);
};

mockMoviesAPI(unmock);

class GetMovies extends APIRequest {
  getUrl({ lastSynced } = {}) {
    // if last synced date exists then show updated data only
    return lastSynced ? PATH_WITH_DATE : PATH;
  }
  getMethod() {
    return httpMethods.GET;
  }
}

export default GetMovies;

