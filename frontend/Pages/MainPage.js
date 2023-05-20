import { theme } from "../constants"
import { Dialog } from "./Dialog";
import { useNavigate } from "react-router-dom";
import gameImg from "../img/card_4.png";
import { useEffect, useState } from "react";
import styled from "styled-components";
import backgroundImg from "../img/background.png";

function searchParam(key) {
    return new URLSearchParams(window.location.search).get(key);
};

const Root = styled.div`
    display: flex;
    height: calc(var(--vh, 1vh) * 100);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url(${backgroundImg}) no-repeat;
    background-position: center;
    background-size: cover;
`;

const Title = styled.div`
    font-family: 'Zen Dots';
    font-style: normal;
    font-weight: 400;
    font-size: 64px;
    line-height: 77px;
    text-align: center;

    margin-bottom: 40px;
`;

export function MainPage({ isSignedIn, contractId, wallet, contract }) {
    const [openSignDodal, setOpenSignDodal] = useState(false);

    const navigate = useNavigate();
    const signIn = () => {
        if (isSignedIn) wallet.signOut()
        else {
            wallet.signIn();
            setOpenSignDodal(true);
        }
    }

    const onClickPlayButton = async () => {
        await contract.donate(1);
        // navigate("/game");
    }

    useEffect(() => {
        if (localStorage.getItem("goGame") === "true") {
            return navigate("/game");
        }

        let donate = searchParam("transactionHashes");
        if (!donate) return;
        localStorage.setItem("goGame", "true");
        location.href = "./";
    }, []);

    return <Root>
        {!openSignDodal && !isSignedIn && <Dialog
            title={"Welcome to FlipDash"}
            description={"To play, Please login with your near wallet."}
            imgSrc={gameImg}
            buttonMsg={"SignIn with NEAR"}
            onClickButton={signIn} />}

        <div style={{ position: "absolute", top: 32, right: 32 }}>
            <span style={{ marginRight: 20 }}>{isSignedIn ? wallet.accountId : ""}</span>
            <theme.style.DefaultButton onClick={signIn}>{isSignedIn ? "SignOut" : "SignIn"}</theme.style.DefaultButton>
        </div>

        <Title>Flip<br />Dash</Title>
        <theme.style.DefaultButton onClick={onClickPlayButton}>Play -1 NEAR</theme.style.DefaultButton>
    </Root>
}