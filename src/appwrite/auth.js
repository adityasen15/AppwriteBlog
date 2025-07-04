import conf from '../../conf/conf';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            
        
        this.account = new Account(this.client);
            

    }
    


    async createAccount({ email, password, name }) {
    try {
        const generatedId = ID.unique();
        console.log("Generated ID:", generatedId);
        console.log("Appwrite URL:", conf.appwriteUrl);
        console.log("Project ID:", conf.appwriteProjectId);


        const userAccount = await this.account.create(
            generatedId,
            email,
            password,
            name
        );

        return userAccount;
    } catch (error) {
        console.error("Error creating account:", error);
        throw error;
    }
}

    async login ({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    };

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
console.log("conf.appwriteUrl", conf.appwriteUrl);


export default authService
