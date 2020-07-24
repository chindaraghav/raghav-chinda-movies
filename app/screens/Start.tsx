import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, StatusBar, FlatList, ListRenderItem, Alert } from 'react-native';
import { useValue } from 'react-native-redash';

import Modal from '@components/Modal';
import Movie, { TOTAL_HEIGHT } from '@components/Movie';
import useApiService from '@hooks/useApiService';
import useAppSync from '@hooks/useAppSync';
import { GetMovieData, LastSyncUtil } from '@utils/services';

import type MovieType from '@app/types/Movie';
import type PositionType from '@app/types/Position';
import { all } from 'rambdax';
import { getErrorMessage } from '@utils/error.helper';

interface ModalState {
    movie: MovieType;
    position: PositionType;
}

type StartParamList = {
    Start: {
        movies: Array<MovieType>;
    };
};

type StartRoute = RouteProp<StartParamList, 'Start'>;

const Start = () => {
    const route = useRoute<StartRoute>();
    const { movies } = route.params;
    const { state, makeRequest } = useApiService({}, GetMovieData);
    const activeMovieId = useValue<number>(-1);
    const { state: syncState } = useAppSync(state.data);

    const [modal, setModal] = useState<ModalState | null>(null);

    const open = (index: number, movie: MovieType, position: PositionType) => {
        activeMovieId.setValue(index);
        setModal({ movie, position });
    };

    useEffect(() => {
        new LastSyncUtil().get().then(lastSynced => makeRequest({ lastSynced })).catch(error => Alert.alert(getErrorMessage(error)))
    }, [])

    const renderMovies: ListRenderItem<MovieType> = useCallback(
        ({ item, index }: { item: MovieType, index: number }) => {
            return (
                <Movie
                    activeMovieId={activeMovieId}
                    index={index}
                    movie={item}
                    open={open}
                />)
        },
        [],
    )
    const movieItemLayout = useCallback(
        (data, index: number) => {
            return (
                { length: TOTAL_HEIGHT, offset: (TOTAL_HEIGHT) * index, index }
            )
        },
        [],
    )

    const close = () => {
        activeMovieId.setValue(-1);
        setModal(null);
    };
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <FlatList
                    contentInsetAdjustmentBehavior="automatic"
                    data={movies.movies}
                    getItemLayout={movieItemLayout}
                    renderItem={renderMovies}
                    keyExtractor={(movie: MovieType) => (movie?.id)}
                />
                {modal !== null && <Modal {...modal} close={close} />}
            </SafeAreaView>
        </>
    );
};

export default Start;
