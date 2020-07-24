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
}

export default MoviePersistService;
