import Realm from 'realm';
import Movie from '@models/Movie';
import Artist from '@models/Artist';

class MoviePersistService {
    static async save(data = []) {
        if (!data.length) return;
        const realm = await Realm.open({ schema: [Movie, Artist] });
        realm.write(() => {
            data.map(movie => {
                realm.create(Movie.name, movie, true)
            })
        });
    }
    static async get() {
        const realm = await Realm.open({ schema: [Movie, Artist] });
        const data = realm.objects(Movie.name);
        return data;
    }

    static async getPaginated({ from = 0, to } = {}) {
        const movies = await this.get();
        let data = movies.sorted("created_on", true);
        to = to ? to : data.length;
        return { movies: Array.prototype.slice.call(data, from, to), total: data.length };
    }

    static async count() {
        const movies = await this.get();
        return movies.length;
    }
}

export default MoviePersistService;
