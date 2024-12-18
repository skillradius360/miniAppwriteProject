import conf from "../conf/conf.js"
import {Client,Databases,Storage,Query,bucket} from "appwrite"

class Service{
client = new Client();

databases;
bucket;

constructor(){

    this.client.setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)
    
    this.databases= new Databases(this.client)
    this.bucket = new bucket(this.client)
}

async createPost({title,content,featuredImage,status,slug,userId}){
try {
    const dbState = await this.databases.createDatabase(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
            title,
            content,
            featuredImage,
            status,
            userId
        }
    )
    if (dbState ){return dbState}
} catch (error) {
    throw new error ("err in createPost",error)
}}


async updateDocument(slug,{title,content,featuredImage,status}){
    try {
        const updDoc=  await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,content,featuredImage,status
            }
        )
        return updDoc
    } catch (error) {
        console.error(error)
    }
}

async deleteDocument(slug){
try {
    const isDeleted=  await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
    )
    return isDeleted
} catch (error) {
    console.error(error)
}
}

async getPost(slug){
    try {
        const ADocument = await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return ADocument
    } catch (error) {
        console.error(error)
    }
}

async getPosts(){
   try {
     const allDocs = await this.databases.listDocuments(
         conf.appwriteDatabaseId,
         conf.appwriteCollectionId
     )
     return allDocs
   } catch (error) {
    console.error(error)
   }
}

}


export const service = new Service()