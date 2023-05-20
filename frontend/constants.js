import styled from "styled-components";

export const CONTRACT_ADDRESS = 'glitch-hackathon-project.winty.testnet';

const color = {
    primary: "#EF586B",
    black: "#222222"
}

const style = {
    DefaultButton: styled.div`
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 16px 32px;
        border-radius: 30px;
        background-color: ${color.black};
        color: white;
        text-align: center;
        cursor: pointer;
    `,
    Title: styled.div`
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 44px;
        text-transform: capitalize;
        color: #000000;
    `
}

export const theme = { color, style };