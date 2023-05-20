import { configureStore } from '@reduxjs/toolkit';
import { gameInfo } from '../slices/gameInfo';

export default configureStore({
    reducer: {
        gameInfo: gameInfo.reducer
    },
});