import {Client ,Account, Databases , Storage , Avatars} from 'appwrite' ; 


export const appwriteConfig = {
   projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
   url: import.meta.env.VITE_APPWRITE_PROJECT_URL,
   storageID: import.meta.env.VITE_APPWRITE_STORAGE_ID,
   databasesID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
   savescollectionID:import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
   userscollectionID: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
   postscollectionID: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,

};

export const client = new Client()
client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)


export const avatars = new Avatars(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const account = new Account(client)