import { Card } from "../Components/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlayerInfo, selectPlayerInfo, selectPoints, selectTime, updateMap, updatePoints, updateTime } from "../slices/gameInfo";
import { PlayerInfo } from "../classes/PlayerInfo";
import { PlayerInfoUI } from "../Components/PlayerInfoUI";
import { CardBoard } from "../Components/CardBoard";
import { RoomPage } from './RoomPage';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TITLE, theme } from "../constants";
import { Dialog } from "./Dialog";

import winImg from "../img/win.png"
import loseImg from "../img/lose.png"

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// window.gWebSocket = null;
window.gRoomId = null;

const PlayerInfoListContainer = styled.div`
    position: absolute;
    top: 32px;
    right: 48px;
    display: inline-flex;
    row-gap: 12px;
    flex-direction: column;
    justify-content: right;
    z-index: 1000;
`;

const TopContainer = styled.div`
    position: absolute;
    top: 32px;
    left: 50%;
    transform: translateX(-50%);
`;

const TimerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 124px;
    height: 73px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
`;

const rankString = ["1st", "2nd", "3rd", "4th", "5th", "6th"];

export function GamePage({ isSignedIn, contractId, wallet }) {
    const navigate = useNavigate();
    const [gameState, setGameState] = useState("Wait");
    const [roomId, setRoomId] = useState();

    const time = useSelector(selectTime);

    useEffect(() => {
        // if (!isSignedIn) return navigate("/");

        window.gWebSocket = new WebSocket("wss://pseong.com/start");
        // 2. 웹소켓 이벤트 처리
        // 2-1) 연결 이벤트 처리
        window.gWebSocket.onopen = () => {
            console.log("웹소켓서버와 연결 성공");
            let data = { type: "ENTER", accountId: wallet.accountId ? wallet.accountId : "asdf" };
            window.gWebSocket.send(JSON.stringify(data));
        };

        // 2-2) 메세지 수신 이벤트 처리
        window.gWebSocket.onmessage = function (event) {
            let data = JSON.parse(event.data);
            let type = data.type;
            let points = {};
            switch (type) {
                case "LOSE":
                    setGameState("Lose");
                    break;

                case "WIN":
                    setGameState("Win");
                    break;

                case "TIME":
                    dispatch(updateTime(data.time));
                    break;

                case "READY":
                    points = {};
                    data.names.map(v => { points[`${v}`] = 0; });
                    dispatch(updatePoints(points));
                    break;

                case "START":
                    let roomId = data.roomId;
                    setGameState("Start");
                    setRoomId(roomId);
                    window.gRoomId = roomId;
                    window.gAccountId = wallet.accountId;
                    points = {};
                    data.names.map(v => { points[`${v}`] = 0; });
                    dispatch(updatePoints(points));
                    break;

                case "MAP":
                    dispatch(updateMap(data.map));
                    break;

                case "POINT":
                    console.log(data.points);
                    dispatch(updatePoints(data.points));
                    break;

                default:
                    break;
            }

            console.log(`서버 웹소켓에게 받은 데이터: ${event.data}`);
        }

        // 2-3) 연결 종료 이벤트 처리
        window.gWebSocket.onclose = function () {
            console.log("서버 웹소켓 연결 종료");
        }

        // 2-4) 에러 발생 이벤트 처리
        window.gWebSocket.onerror = function (event) {
            console.log(event)
        }
    }, []);

    const playerInfo = useSelector(selectPlayerInfo);
    const dispatch = useDispatch();
    const points = useSelector(selectPoints);

    if (gameState === "Wait") return <RoomPage />;

    const onClickWinButton = () => {
        navigate("/");
    }
    const onClickLoseButton = () => {
        navigate("/");
    }

    return <div>
        {gameState === "Win" && <Dialog title={"Congratulation!"} imgSrc={winImg} description={<span><span style={{ color: theme.color.primary }}>{wallet.accountId}</span> is the winner :-)</span>} buttonMsg={"Okay"} onClickButton={onClickWinButton} />}
        {gameState === "Lose" && <Dialog title={"Lose!"} imgSrc={loseImg} description={"You lose :-("} buttonMsg={"Okay"} onClickButton={onClickLoseButton} />}

        {/* {time > 60 && <Dialog title={"Match found"} description={<div style={{ marginTop: 50, color: theme.color.primary, fontSize: 96, fontWeight: "bold" }}>{time - 60}</div>} />} */}

        <CardBoard row={4} col={8} />

        <theme.style.SubTitle style={{ position: "absolute", top: 32, left: 48 }}>{TITLE}</theme.style.SubTitle>

        <TopContainer>
            <TimerContainer>
                <theme.style.SubTitle>{Math.max(Math.min(60, time), 0)}</theme.style.SubTitle>
            </TimerContainer>
        </TopContainer>

        <PlayerInfoListContainer>
            {Object.keys(points).map((k, i) => k === wallet.accountId
                && <theme.style.Title style={{ textAlign: "right", marginBottom: 32, color: theme.color.primary }}>
                    {rankString[i]}
                </theme.style.Title>)}
            {Object.keys(points).map(k => <PlayerInfoUI accountId={k} point={points[k]} isMe={k === wallet.accountId} />)}
        </PlayerInfoListContainer>
    </div>;
}