import { Card } from "../Components/Card";

export function MainPage({ isSignedIn, contractId, wallet }) {
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