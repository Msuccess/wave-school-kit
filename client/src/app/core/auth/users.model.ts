export class UsersModel {
    username: string;
    userEmail: string;
    userPicture: string;

    constructor(data?: any) {
        data = data || {};
        this.username = data.username || '';
        this.userEmail = data.userEmail || '';
        this.userPicture = data.userPicture || '';
    }
}
