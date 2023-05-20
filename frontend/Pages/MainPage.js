import { WebSocket } from "ws";
import { Card } from "../Components/Card";
import { useEffect } from "react";



export function MainPage({ isSignedIn, contractId, wallet }) {
    // 1. 웹소켓 클라이언트 객체 생성
    const webSocket = new WebSocket("ws://localhost:30001");


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
        }
    }, []);

    const SignButton = () => {
        if (isSignedIn)
            return <button onClick={() => wallet.signOut()}>로그아웃</button>
        else
            return <button onClick={() => wallet.signIn()}>로그인</button>
    }

    return <div>
        <SignButton />

        <div>
            {[...Array(10)].map((x, i) =>
                <Card key={i} />
            )}
        </div>
    </div>;
}