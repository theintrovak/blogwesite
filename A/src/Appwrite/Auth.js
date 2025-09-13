import { Client, Account, ID } from "appwrite"
import Conf from "../Conf/conf"
export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(Conf.appwriteurl)
            .setProject(Conf.appwriteprojectid);
        this.account = new Account(this.client);
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create({ userId: ID.unique(), email, password, name });
            if (userAccount) {
                this.login({ email, password })
            } else {
                return userAccount
            }

        } catch (error) {
            throw error

        }

    }
    async login({ email, password }) {
        try {
            return this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error
        }
    }
    async getCurrentUser() {
        try {
            return this.account.get();
        } catch (error) {
            throw error
        }
    }
    async logout() {
        try {
            return this.account.deleteSession('current');
        } catch (error) {
            throw error
        }
    }
}

const authservice = new AuthService()
export default authservice