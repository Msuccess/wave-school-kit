export class RegistrationModel {
    phoneNumber: string;
    username: string;
    email: string;
    password: string;

    constructor(data?: any) {
        data = data || {};
        this.phoneNumber = data.phoneNumber || '';
        this.username = data.username || '';
        this.email = data.email || '';
        this.password = data.password || '';
    }
}
