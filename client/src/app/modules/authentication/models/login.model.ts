export class LoginModel {
    id?: string;
    username: string;
    password: string;

    constructor(data?: any) {
        data = data || {};
        this.username = data.username || '';
        this.password = data.password || '';
    }
}
