import { theme } from "../constants"
import { Dialog } from "./Dialog";
import { useNavigate } from "react-router-dom";
import gameImg from "../img/card_4.png";
import { useEffect, useState } from "react";

function searchParam(key) {
    return new URLSearchParams(window.location.search).get(key);
};

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
        location.href = "/";
    }, []);

    return <div>
        {!openSignDodal && !isSignedIn && <Dialog
            title={"Welcome to FlipDash"}
            description={"To play, Please login with your near wallet."}
            imgSrc={gameImg}
            buttonMsg={"Signin with NEAR"}
            onClickButton={signIn} />}

        {isSignedIn ? wallet.accountId : ""}
        <theme.style.DefaultButton onClick={signIn}>{isSignedIn ? "SignOut" : "SignIn"}</theme.style.DefaultButton>
        <div>Flip Dash</div>
        <theme.style.DefaultButton onClick={onClickPlayButton}>Play</theme.style.DefaultButton>
    </div>
}