import styled from "styled-components";

export const CONTRACT_ADDRESS = 'glitch-hackathon-project.winty2.testnet';
export const TITLE = 'Flip Dash';

const color = {
    primary: "#EF586B",
    black: "#222222",
    disabled: "#E2E2E2",
    gray1: "#585858"
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
    `,
    SubTitle: styled.div`
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        color: ${color.gray1};
    `,
    Caption: styled.div`
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        line-height: 13px;
        color: ${color.gray1};
    `
}

export const theme = { color, style };