import React, { useState, useCallback, useEffect, useRef } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView, View, StatusBar, FlatList, ListRenderItem, Alert } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { useValue } from 'react-native-redash';

import Modal from '@components/Modal';
import Movie, { TOTAL_HEIGHT } from '@components/Movie';
import ActivityIndicator from '@components/ActivityIndicator';

import useApiService from '@hooks/useApiService';
import useAppSync from '@hooks/useAppSync';
import usePagination from '@hooks/usePagination';
import useMovieState from '@hooks/useMovieState';

import { GetMovieData, LastSyncUtil, MoviePersistService } from '@utils/services';
import { getErrorMessage } from '@utils/error.helper';

import type MovieType from '@app/types/Movie';
import type PositionType from '@app/types/Position';

const MOVIE_PAGINATE_LIMIT = 20;

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
    const [isInitialLoad, setIsInitialLoad] = useState(null);
    const movieList = useRef();

    const activeMovieId = useValue<number>(-1);
    const { state, makeRequest } = useApiService({}, GetMovieData);
    const { isSyncing, totalMovies, syncSuccess } = useAppSync(state.data);
    const { page, fetchMoreData } = usePagination(totalMovies, MOVIE_PAGINATE_LIMIT);
    const { paginateMovies, setInitialMovies, movies } = useMovieState();
    const { isLoading: isDataFetching } = state;
    const [modal, setModal] = useState<ModalState | null>(null);

    const open = (index: number, movie: MovieType, position: PositionType) => {
        activeMovieId.setValue(index);
        setModal({ movie, position });
    };

    // calls api
    useEffect(() => {
        new LastSyncUtil().get()
            .then(lastSynced => {
                setIsInitialLoad(!lastSynced);
                makeRequest({ lastSynced });
            })
            .catch(error => Alert.alert(getErrorMessage(error)))
    }, []);

    // refresh after sync complete
    useEffect(() => {
        if (syncSuccess && !isInitialLoad) {
            setInitialMovies(state.data?.movies);
            setTimeout(() => {
               movies.length && movieList.current?.scrollToIndex({ index: 0, animated: true });
            }, 1500);
        }
    }, [syncSuccess])

    // set initial data
    useEffect(() => {
        if (isInitialLoad && state.isSuccess) {
            setInitialMovies(state.data.movies);
        }
    },
        [state.data?.movies, isInitialLoad]);

    // pagination
    useEffect(() => {
        const getMovies = async () => {
            let movieData = await MoviePersistService
                .getPaginated({
                    from: movies?.length ? movies.length : 0,
                    to: movies?.length + MOVIE_PAGINATE_LIMIT
                });
            paginateMovies(movieData.movies);
        }
        getMovies();
    }, [page]);

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
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    ref={movieList}
                    onEndReached={fetchMoreData}
                    contentInsetAdjustmentBehavior="automatic"
                    data={movies}
                    getItemLayout={movieItemLayout}
                    renderItem={renderMovies}
                    keyExtractor={(movie: MovieType) => (movie?.id)}
                />
                {modal !== null && <Modal {...modal} close={close} />}
                <ActivityIndicator
                    open={isDataFetching || isSyncing}
                    containerStyles={!isInitialLoad ? {
                        height: 60 + (hasNotch() ? 32 : 0),
                        paddingTop: hasNotch() ? 32 : 0
                    } : {}}
                />
            </SafeAreaView>
        </>
    );
};

export default Start;
