import { useState } from "react";
import styled from "styled-components";
import { theme } from "../constants";

const CardInner = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
`;

const CardContainer = styled.div`
    background-color: transparent;
    min-width: 108px;
    width: 108px;
    height: 141px;
    margin: 7px 6.5px;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
    transition: box-shadow .2s ease-in-out,transform .2s ease-in-out;
    cursor: pointer;
    &.flip ${CardInner} {
        transform: rotateY(180deg);
    }
    &:hover:not(.flip) {
        transform: translateY(-0.1rem);
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
    border-radius: 10px;
    box-shadow: 0px 4px 20px 5px rgba(0, 0, 0, 0.05);
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
`;

const CardBack = styled(CardSide)`
    background-color: #bbb;
    color: black;
`;

const CardFront = styled(CardSide)`
    background-color: white;
    color: white;
    transform: rotateY(180deg);
`;

const CardFrontImg = styled.img`
    width: 100px;
    height: 100px;
    margin-top: 14px;
    margin-bottom: 12px;
    background-color: saddlebrown;
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


export function Card() {
    const [flip, setFlip] = useState(false);

    const onClick = () => {
        if (flip) return;

        setFlip(true);
    }

    return <CardContainer className={flip ? "flip" : ""} onClick={onClick}>
        <CardInner>
            <CardFront>
                <CardFrontImg />
                <CardLevelContainer>
                    <CardLevel />
                    <CardLevel />
                </CardLevelContainer>
            </CardFront>
            <CardBack>
            </CardBack>
        </CardInner>
    </CardContainer>;
}