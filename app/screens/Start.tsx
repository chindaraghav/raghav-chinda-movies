import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { SafeAreaView, StatusBar, FlatList, ListRenderItem, ScrollView } from 'react-native';
import { useValue } from 'react-native-redash';

import Modal from '@components/Modal';
import Movie, { HEIGHT } from '@components/Movie';

import type MovieType from '@app/types/Movie';
import type PositionType from '@app/types/Position';

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
    const activeMovieId = useValue<number>(-1);
    const [modal, setModal] = useState<ModalState | null>(null);
    const open = (index: number, movie: MovieType, position: PositionType) => {
        activeMovieId.setValue(index);
        setModal({ movie, position });
    };
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
                { length: HEIGHT, offset: (HEIGHT) * index, index }
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
                    data={movies}
                    getItemLayout={movieItemLayout}
                    renderItem={renderMovies}
                    keyExtractor={(movie: MovieType) => (movie.name)}
                />
                {modal !== null && <Modal {...modal} close={close} />}
            </SafeAreaView>
        </>
    );
};

export default Start;
