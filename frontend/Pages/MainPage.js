import { useEffect, useRef } from "react";
import { theme } from "../constants"
import { Dialog } from "./Dialog";
import { useNavigate } from "react-router-dom";
import { async } from "regenerator-runtime";

export function MainPage({ isSignedIn, contractId, wallet, contract }) {
    const navigate = useNavigate();
    const signIn = () => {
        isSignedIn ? wallet.signOut() : wallet.signIn();
    }

    const onClickPlayButton = async () => {
        // await contract.donate(1);
        navigate("/game");
    }

    return <div>
        {!isSignedIn && <Dialog
            title={"Welcome to FlipDash"}
            description={"To play, Please login with your near wallet."}
            buttonMsg={"Signin with NEAR"}
            onClickButton={signIn} />}
        {isSignedIn ? wallet.accountId : ""}
        <theme.style.DefaultButton onClick={signIn}>{isSignedIn ? "SignOut" : "SignIn"}</theme.style.DefaultButton>
        <div>Flip Dash</div>
        <theme.style.DefaultButton onClick={onClickPlayButton}>Play</theme.style.DefaultButton>
    </div>
}