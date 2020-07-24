import { useCallback, useState, useEffect, useRef } from 'react'
import { SyncService, LastSyncUtil } from '@utils/services';
import { getErrorMessage } from '@utils/error.helper';

function useAppSync(data) {
    const [isSyncing, setIsSyncing] = useState(false);
    const [error, setError] = useState(null);

    const syncUtil = useRef(new LastSyncUtil()).current;

    const sync = useCallback(async () => {
        try {
            setIsSyncing(true);
            await SyncService.startSync(data);
            await syncUtil.save(Date.now());
        }
        catch (error) {
            console.log("ERROR", error);
            setError(error);
        }
        finally {
            setIsSyncing(false);
        }
    });

    useEffect(() => {
        if (data) {
            sync(data);
        }
    }, [data]);

    return { sync, isSyncing, error };

}

export default useAppSync;