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
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) {
                this.login({ email, password })
                return userAccount
            } else {
                return null
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
            const user = await this.account.get();
            return user
        } catch (error) {
            if (error.code === 401) {
                // Handle unauthorized user case
                console.log("User not authenticated. Returning null.");
                return null; // return null for unauthorized users
            } else {
                // If it's another error, throw it to handle elsewhere
                console.log("Appwrite service :: getCurrentUser :: error", error);
                throw error;
            }
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