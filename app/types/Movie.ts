import type Review from './Review';
import type Artist from './Artist';

export default interface Movie {
    id?: string;
    name: string;
    poster: string;
    gender: string;
    description: string;
    created_on: number;
    cast?: string;
    reviews?: Array<Review>;
    reviewCount?: number
}
