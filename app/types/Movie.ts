import type Review from './Review';
import type Artist from './Artist';

export default interface Movie {
    id?: string;
    name: string;
    poster: string;
    gender: string;
    description: string;
    cast?: Array<Artist>;
    reviews?: Array<Review>;
}
