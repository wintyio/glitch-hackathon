

export function PlayerInfoUI(props) {
    return <div>
        <span>{props.playerInfo.accountId}</span>
        <span>{props.playerInfo.score}</span>
        {props.playerInfo.isMe && <span>나야</span>}
    </div>
}