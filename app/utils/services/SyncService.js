import MoviePersistService from './MoviePersistService';
import ReviewPersistService from './ReviewPersistService';

class SyncService {
    static async startSync(data) {
        await MoviePersistService.save(data.movies);
        await ReviewPersistService.save(data.reviews);
        let totalMovies = await MoviePersistService.get();
        return { totalMovies: totalMovies.length };
    }
}

export default SyncService;
