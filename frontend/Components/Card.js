import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../constants";
import img from "../img/card_side.png"

import cardImg_1000 from "../img/card_1000.png"
import cardImg_1 from "../img/card_1.png"
import cardImg_2 from "../img/card_2.png"
import cardImg_3 from "../img/card_3.png"
import cardImg_4 from "../img/card_4.png"
import cardImg_5 from "../img/card_5.png"
import cardImg_6 from "../img/card_6.png"
import cardImg_7 from "../img/card_7.png"
import cardImg_8 from "../img/card_8.png"
import cardImg_9 from "../img/card_9.png"
import cardImg_10 from "../img/card_10.png"
import cardImg_11 from "../img/card_11.png"
import cardImg_12 from "../img/card_12.png"
import cardImg_13 from "../img/card_13.png"
import cardImg_14 from "../img/card_14.png"
import cardImg_15 from "../img/card_15.png"
import cardImg_16 from "../img/card_16.png"
import cardImg_17 from "../img/card_17.png"
import cardImg_18 from "../img/card_18.png"
import cardImg_19 from "../img/card_19.png"
import cardImg_20 from "../img/card_20.png"
import cardImg_21 from "../img/card_21.png"
import cardImg_22 from "../img/card_22.png"
import cardImg_23 from "../img/card_23.png"
import cardImg_24 from "../img/card_24.png"
import cardImg_25 from "../img/card_25.png"



let cardImgPath = {
    cardImg_1000,
    cardImg_1,
    cardImg_2,
    cardImg_3,
    cardImg_4,
    cardImg_5,
    cardImg_6,
    cardImg_7,
    cardImg_8,
    cardImg_9,
    cardImg_10,
    cardImg_11,
    cardImg_12,
    cardImg_13,
    cardImg_14,
    cardImg_15,
    cardImg_16,
    cardImg_17,
    cardImg_18,
    cardImg_19,
    cardImg_20,
    cardImg_21,
    cardImg_22,
    cardImg_23,
    cardImg_24,
    cardImg_25,
};

const CardInner = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.5s;
    transform-style: preserve-3d;
`;

const CardContainer = styled.div`
    position: static;
    background-color: transparent;
    min-width: 108px;
    width: 108px;
    height: 141px;
    margin: 7px 6.5px;
    border-radius: 10px;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
    transition: box-shadow .2s ease-in-out,transform .2s ease-in-out;
    cursor: pointer;
    &.flip ${CardInner} {
        transform: rotateY(180deg);
    }
    &:hover:not(.flip) {
        transform: translateY(-0.1rem) scale(1.04);
        box-shadow: 0 0.1rem 0.2rem rgba(34,34,34,.05), 0 0.4rem 1.6rem rgba(34,34,34,.15);
    }
`;

const CardSide = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 4px solid #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 4px 20px 5px rgba(0, 0, 0, 0.05);
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
`;

const CardBack = styled(CardSide)`
    background: linear-gradient(28.22deg, rgba(241, 103, 120, 0.2) 10.48%, rgba(247, 167, 177, 0.2) 42.21%, rgba(250, 200, 206, 0.2) 74.1%, rgba(254, 237, 239, 0.2) 97.74%), url(${img});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-blend-mode: color;
    /* background-image: url(${img}); */
    color: black;
`;

const CardFront = styled(CardSide)`
    background: #FDF8F8;
    color: white;
    transform: rotateY(180deg);
`;

const CardFrontImg = styled.img`
    width: 100px;
    height: 100px;
    margin-top: 14px;
    margin-bottom: 12px;
`;

const CardLevelContainer = styled.div`
    display: flex;
    gap: 4px;
`;

const CardLevel = styled.div`
    width: 16px;
    height: 4px;
    border-radius: 10px;
    background-color: ${theme.color.primary};
`;


export function Card({ data, isConnectable }) {
    const [flip, setFlip] = useState(false);
    const [imgIdx, setImgIdx] = useState(0);

    useEffect(() => {
        let idx = data.imgIdx;
        if (idx > 0) setImgIdx(data.imgIdx);
        if (idx < 0) setImgIdx(data.imgIdx * -1000);
    }, [data]);

    const onClick = () => {
        if (flip) return;
        let sendData = { roomId: gRoomId, type: "OPEN", c: data.c, r: data.r, accountId: window.gAccountId }
        window.gWebSocket.send(JSON.stringify(sendData));
    }

    return <CardContainer className={data.flip ? "flip" : ""} onClick={onClick} /* onDrag={e => { e.preventDefault(); return false; }}*/>
        <CardInner>
            <CardFront>
                <CardFrontImg src={cardImgPath["cardImg_" + imgIdx]} />
                <CardLevelContainer>
                    <CardLevel />
                    <CardLevel />
                </CardLevelContainer>
            </CardFront>
            <CardBack>
            </CardBack>
        </CardInner>
    </CardContainer >;
}