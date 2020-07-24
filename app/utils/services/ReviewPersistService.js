import Realm from 'realm';
import Review from '@models/Review';

class ReviewPersistService {
    static async save(data = []) {
        if (!data.length) return;
        const realm = await Realm.open({ schema: [Review] });
        realm.write(() => {
            data.map(review => {
                realm.create(Review.name, review, true)
            })
        });
    }

    static async get() {
        const realm = await Realm.open({ schema: [Review] });
        const data = realm.objects(Review.name);
        return data;
    }

    static async getByMovieId(id, { from = 0, to } = {}) {
        const reviews = await this.get();
        const data = reviews.filtered(`movie_id="${id}"`);
        to = to ? to : data.length;
        return { reviews: Array.prototype.slice.call(data, from, to), total: data.length };
    }
}

export default ReviewPersistService;
