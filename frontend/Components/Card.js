import { useState } from "react";
import styled from "styled-components";

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
    min-width: 40px;
    width: 40px;
    height: 70px;
    margin: 3px;
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
    width: 100%;
    height: 100%;
    border-radius: 10px;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
`;

const CardFront = styled(CardSide)`
    background-color: #bbb;
    color: black;
`;

const CardBack = styled(CardSide)`
    background-color: dodgerblue;
    color: white;
    transform: rotateY(180deg);
`;

export function Card() {
    const [flip, setFlip] = useState(false);

    const onClick = () => {
        if (flip) return;

        setFlip(true);
    }

    return <CardContainer className={flip ? "flip" : ""} onClick={onClick}>
        <CardInner>
            <CardFront></CardFront>
            <CardBack></CardBack>
        </CardInner>
    </CardContainer>;
}