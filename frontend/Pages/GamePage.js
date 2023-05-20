import { Card } from "../Components/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlayerInfo, selectPlayerInfo, selectPoints, updateMap, updatePoints } from "../slices/gameInfo";
import { PlayerInfo } from "../classes/PlayerInfo";
import { PlayerInfoUI } from "../Components/PlayerInfoUI";
import { CardBoard } from "../Components/CardBoard";
import { RoomPage } from './RoomPage';

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// window.gWebSocket = null;
window.gRoomId = null;

export function GamePage({ isSignedIn, contractId, wallet }) {
    const [gameState, setGameState] = useState("Wait");
    const [roomId, setRoomId] = useState();

    useEffect(() => {
        window.gWebSocket = new WebSocket("ws://3.39.230.181:8787/start");

        // 2. 웹소켓 이벤트 처리
        // 2-1) 연결 이벤트 처리
        window.gWebSocket.onopen = () => {
            console.log("웹소켓서버와 연결 성공");
            let data = { type: "ENTER", accountId: wallet.accountId };
            window.gWebSocket.send(JSON.stringify(data));
        };

        // 2-2) 메세지 수신 이벤트 처리
        window.gWebSocket.onmessage = function (event) {
            let data = JSON.parse(event.data);
            let type = data.type;
            let points = {};
            switch (type) {
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

        // 3. 버튼 클릭 이벤트 처리
        // 3-1) 웹소켓 서버에게 메세지 보내기
        let count = 1;
        /*
        document.getElementById("btn_send").onclick = function () {

            if (window.gWebSocket.readyState === webSocket.OPEN) { // 연결 상태 확인
                webSocket.send(`증가하는 숫자를 보냅니다 => ${count}`); // 웹소켓 서버에게 메시지 전송
                count++; // 보낼때마다 숫자를 1씩 증가

            } else {
                alert("연결된 웹소켓 서버가 없습니다.");
            }
        }

        // 3-2) 웹소켓 서버와 연결 끊기
        document.getElementById("btn_close").onclick = function () {

            if (webSocket.readyState === webSocket.OPEN) { // 연결 상태 확인
                webSocket.close(); // 연결 종료

            } else {
                alert("연결된 웹소켓 서버가 없습니다.");
            }
        }*/
    }, []);

    const SignButton = () => {
        if (isSignedIn)
            return <button onClick={() => wallet.signOut()}>로그아웃</button>
        else
            return <button onClick={() => wallet.signIn()}>로그인</button>
    }

    const playerInfo = useSelector(selectPlayerInfo);
    const dispatch = useDispatch();
    const points = useSelector(selectPoints);

    if (gameState === "Wait") return <RoomPage />;

    return <div>

        <CardBoard row={4} col={8} />

        <SignButton />

        <button onClick={() => {
            let player = new PlayerInfo(rand(0, 100000));
            dispatch(addPlayerInfo(player.toJson()));
        }}>플레이어 추가</button>

        <div>
            {Object.keys(points).map(k => <PlayerInfoUI accountId={k} point={points[k]} />)}
        </div>
    </div>;
}