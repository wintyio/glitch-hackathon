import { Card } from "../Components/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlayerInfo, selectPlayerInfo } from "../slices/gameInfo";
import { PlayerInfo } from "../classes/PlayerInfo";
import { PlayerInfoUI } from "../Components/PlayerInfoUI";
import { CardBoard } from "../Components/CardBoard";

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const webSocket = new WebSocket("wss://naver.com:30001");

export function MainPage({ isSignedIn, contractId, wallet }) {


    useEffect(() => {
        // 2. 웹소켓 이벤트 처리
        // 2-1) 연결 이벤트 처리
        webSocket.onopen = () => {
            console.log("웹소켓서버와 연결 성공");
        };

        // 2-2) 메세지 수신 이벤트 처리
        webSocket.onmessage = function (event) {
            console.log(`서버 웹소켓에게 받은 데이터: ${event.data}`);
        }

        // 2-3) 연결 종료 이벤트 처리
        webSocket.onclose = function () {
            console.log("서버 웹소켓 연결 종료");
        }

        // 2-4) 에러 발생 이벤트 처리
        webSocket.onerror = function (event) {
            console.log(event)
        }


        // 3. 버튼 클릭 이벤트 처리
        // 3-1) 웹소켓 서버에게 메세지 보내기
        let count = 1;
        /*
        document.getElementById("btn_send").onclick = function () {

            if (webSocket.readyState === webSocket.OPEN) { // 연결 상태 확인
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

    return <div>
        <CardBoard row={20} col={20} />

        <SignButton />

        <button onClick={() => {
            let player = new PlayerInfo(rand(0, 100000));
            dispatch(addPlayerInfo(player.toJson()));
        }}>플레이어 추가</button>

        <div>
            {playerInfo.map(val => <PlayerInfoUI playerInfo={val} />)}
        </div>



    </div>;
}