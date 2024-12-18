import { Client,Account, ID } from "appwrite";

class AppwriteUserAuth
{
   client = new Client()
    account;

    constructor(){
        this.setEndpoint(import.meta.env.VITE_APPWRITE_URL)
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID )
        this.account = new Account(this.client)
    }

    async signUp({username,password,email}){
        try {
            const signupStatus = await this.account.create(ID.unique(),
            username,
            password,
            email)
            if(signupStatus){
                return this.login({username,password})
            }
            else{ signupStatus}
        } catch (error) {
            throw new error("failed during signing up")
        }
    }

    async login({email,password}){
        // if user does not exist, then signUp
        try {
            return  this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw new error("some error occured")
        }
    }

     async getCurrentUser(){
        try {
            const current = await this.account.get()
            if (! current) throw new Error("No user session in use")
                else return current
        } catch (error) {
            console.error(error)
        }
     }

     async logout (){
         try {
            return await this.account.deleteSession()
         } catch (error) {
            console.error(error)
         }
     }
}


export const authService = new AppwriteUserAuth()