import styled from "styled-components";
import { theme } from "../constants";

const Background = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 720px;
    height: 440px;
    background: #FFFFFF;
    border-radius: 20px;
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
    margin-top: 28px;
    margin-bottom: 16px;
    background-color: red;
`;

export function Dialog({ title, description, imgSrc, onClickButton, buttonMsg }) {
    return <Background>
        <Container>
            <theme.style.Title>{title}</theme.style.Title>
            <Image src={imgSrc} />
            <div style={{ marginBottom: 28 }}>{description}</div>
            {buttonMsg && <theme.style.DefaultButton onClick={onClickButton}>{buttonMsg}</theme.style.DefaultButton>}
        </Container>
    </Background>
}