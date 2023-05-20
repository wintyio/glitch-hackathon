import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playerInfo: []
}

export const gameInfo = createSlice({
    name: 'gameInfo',
    initialState,
    reducers: {
        addPlayerInfo(state, action) {
            state.playerInfo.push(action.payload);
        },
        removePlayerInfoByAccountId(state, action) {
            let accountId = action.payload;
            let filteredArray = state.playerInfo.filter(function (e) { return e.accountId !== accountId });

            state.playerInfo = filteredArray;
        },
    }
})

export const { addPlayerInfo } = gameInfo.actions
export const selectPlayerInfo = (state) => state.gameInfo.playerInfo