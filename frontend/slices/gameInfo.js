import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playerInfo: [],
    map: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ],
    points: [],
    time: 63
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
        updateMap(state, action) {
            state.map = action.payload;
            console.log("Update Map");
        },
        updatePoints(state, action) {
            if (!action.payload) return;
            points = action.payload;
            let sNames = Object.keys(points).sort((a, b) => points[b] - points[a]);
            let newPoints = {};
            for (let n of sNames)
                newPoints[n] = points[n];

            state.points = newPoints;
        },
        updateTime(state, action) {
            state.time = action.payload;
        }
    }
})

export const { addPlayerInfo, updateMap, updatePoints, updateTime } = gameInfo.actions
export const selectPlayerInfo = (state) => state.gameInfo.playerInfo
export const selectMap = (state) => state.gameInfo.map
export const selectPoints = (state) => state.gameInfo.points
export const selectTime = (state) => state.gameInfo.time