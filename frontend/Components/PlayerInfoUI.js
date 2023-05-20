import styled from "styled-components"
import { theme } from "../constants";

const Container = styled.div`
    display: inline-flex;
    flex-direction: row;
    align-self: flex-end;
    justify-content: center;
    align-items: center;
    padding: 12px 24px;
    gap: 8px;
    background: ${(props) => props.isMe ? "rgba(239, 88, 107, 0.7)" : "rgba(255, 255, 255, 0.7)"};
    border-radius: 20px;
`;

export function PlayerInfoUI({ accountId, point, isMe }) {
    return (
        <Container isMe={isMe}>
            <span style={{ color: isMe ? "white" : theme.color.black }}>{accountId}</span>
            <span style={{ color: isMe ? "white" : theme.color.primary }}>{point}</span>
        </Container>
    )
}