import styled from "styled-components";
import { theme } from "../constants";
import { useNavigate } from "react-router-dom";

const Header = styled.div`

`;

const Counter = styled.div`

`;

export function RoomPage(props) {
    const navigate = useNavigate();

    const onClickCancelButton = () => {
        let confirm = window.confirm("You can't get your Nears back.\nWould you like to leave?");
        if (!confirm) return;
        navigate("/game");
    }

    return <div>
        <Header>Matching Games</Header>

        <Counter>4 / 6</Counter>

        <theme.style.DefaultButton onClick={onClickCancelButton}>Cancel</theme.style.DefaultButton>
    </div>
}