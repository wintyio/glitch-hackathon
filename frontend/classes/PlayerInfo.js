export class PlayerInfo {
    accountId;
    score = 0;
    isMe = false;

    constructor(accountId, isMe = false) {
        this.accountId = accountId;
        this.isMe = isMe;
    }

    static fromJson(json, isMe) {
        return new PlayerInfo(json.accountId, isMe)
    }

    toJson() {
        return {
            "accountId": this.accountId,
            "score": this.score,
            "isMe": this.isMe
        }
    }
}