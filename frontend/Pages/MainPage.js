import { useEffect, useRef } from "react";
import { theme } from "../constants"
import { Dialog } from "./Dialog";
import { useNavigate } from "react-router-dom";

export function MainPage({ isSignedIn, contractId, wallet }) {
    const navigate = useNavigate();
    const signIn = () => {
        isSignedIn ? wallet.signOut() : wallet.signIn();
    }

    const onClickPlayButton = () => {
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