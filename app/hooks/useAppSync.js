import { useCallback, useState, useEffect, useRef } from 'react'
import { SyncService, LastSyncUtil, MoviePersistService } from '@utils/services';
import { getErrorMessage } from '@utils/error.helper';

function useAppSync(data) {
    const [isSyncing, setIsSyncing] = useState(false);
    const [error, setError] = useState(null);
    const [syncSuccess, setSyncSuccess] = useState(null);
    const [totalMovies, setTotalMovies] = useState(null);

    const syncUtil = useRef(new LastSyncUtil()).current;

    const sync = useCallback(async () => {
        try {
            setIsSyncing(true);
            setSyncSuccess(null);
            const { totalMovies } = await SyncService.startSync(data);
            await syncUtil.save(Date.now());
            setSyncSuccess(true);
            setTotalMovies(totalMovies);
        }
        catch (error) {
            console.log("ERROR", error);
            setError(getErrorMessage(error));
            setSyncSuccess(false);
        }
        finally {
            setIsSyncing(false);
        }
    });

    useEffect(() => {
        const setCount = async () => {
            const count = await MoviePersistService.count();
            setTotalMovies(count);
        }
        setCount();
    }, []);

    useEffect(() => {
        if (data) {
            sync(data);
        }
    }, [data]);

    return { isSyncing, error, syncSuccess, totalMovies };

}

export default useAppSync;