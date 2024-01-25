import { ID, Query } from "appwrite";
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.name,
            user.password,
        );
        if (!newAccount) throw Error;

        const avatarurl = avatars.getInitials(user.name)

        const newUser = await saveUsertoDB({
            accountID: newAccount.$id ,
            email: newAccount.email,
            name: newAccount.name,
            imageUrl: avatarurl,
            username: user.username,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }

}

export async function saveUsertoDB(user: {
    accountID: string ;
    email: string;
    name: string;
    imageUrl: URL;
    username ?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databasesID,
            appwriteConfig.userscollectionID,
            ID.unique(),
            user,
        )
        return newUser;
    } catch (error) {
        console.log(error)
    }

}


export async function signinAccount(user:{
    email: string ;
    password : string
}){
    try {
        const session =  await account.createEmailSession(user.email ,user.password) ;
        return session ; 
    }catch (error) {
        console.log(error)
    }
}

export async function getCurrentUser(){
    try {
       const currentaccount = account.get();
       
       if(!currentaccount) throw Error ; 

       const currentUser  = await databases.listDocuments(
        appwriteConfig.databasesID,
        appwriteConfig.userscollectionID,
        [Query.equal('accoundId' , (await currentaccount).$id)]
    ) 
    if(!currentUser) throw Error ;
      return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}