import styled from "styled-components";
import { theme } from "../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPoints } from "../slices/gameInfo";

const PlayerListContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 656px;
    padding: 0 20px;
    gap: 20px 16px;
    margin: 48px 0;
`;

const PlayerContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 298px;
    height: 60px;
    padding: 24px;
    border-radius: 16px;
    background-color: white;
`;

const PlayerStateCircle = styled.div`
    width: 12px;
    height: 12px;
    margin-right: 20px;
    background: ${(props) => props.active ? theme.color.primary : theme.color.disabled};
    flex: none;
    order: 0;
    flex-grow: 0;
    border-radius: 100%;
`

const PlayerName = styled.div`
    text-overflow: ellipsis;
    overflow: hidden; 
`;

export function RoomPage(props) {
    const navigate = useNavigate();

    const points = useSelector(selectPoints);

    const onClickCancelButton = () => {
        let confirm = window.confirm("You can't get your Nears back.\nWould you like to leave?");
        if (!confirm) return;
        navigate("/");
    }

    return <div style={{ height: "calc(var(--vh, 1vh) * 100)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <theme.style.Title style={{ marginBottom: 20 }}>Matching Games</theme.style.Title>

        <theme.style.SubTitle>
            <span style={{ marginRight: 20 }}>00:48</span>
            <span>{Object.keys(points).length !== 0 ? Object.keys(points).length : "0"} / 2</span>
        </theme.style.SubTitle>

        <PlayerListContainer>
            {console.log(Object.keys(points))}
            {
                Object.keys(points).map(v =>
                    <PlayerContainer>
                        <PlayerStateCircle active />
                        <PlayerName>{v}</PlayerName>
                    </PlayerContainer>)
            }

            {Object.keys(points).length < 6
                && [...Array(6 - Object.keys(points).length)].map(v =>
                    <PlayerContainer>
                        <PlayerStateCircle />
                        <PlayerName>wating...</PlayerName>
                    </PlayerContainer>)
            }
        </PlayerListContainer>

        <theme.style.DefaultButton onClick={onClickCancelButton}>Leave</theme.style.DefaultButton>
        <theme.style.Caption style={{ marginTop: 12 }}>If you leave, you can't get your NEAR back</theme.style.Caption>
    </div>
}