import { useReducer } from 'react';
import { getErrorMessage } from '@utils/error.helper';

const initialState = {
    isLoading: false,
};

const ACTIONS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    FAILED: 'failed',
    RESET: 'reset',
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOADING:
            return { ...state, isLoading: true };
        case ACTIONS.SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload,
            };
        case ACTIONS.FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: getErrorMessage(action.error),
            };
        case ACTIONS.RESET:
            return { ...initialState };

        default:
            throw new Error();
    }
}

function useApiActions() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const resetState = () => dispatch({ type: ACTIONS.RESET });
    return { state, actions: ACTIONS, dispatch, resetState };
}

export default useApiActions;
