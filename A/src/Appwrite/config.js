import Conf from "../Conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services {
    client = new Client();
    Databases;
    Storage;
    constructor() {
        this.client.setEndpoint(Conf.appwriteurl)
            .setProject(Conf.appwriteprojectid);
        this.Databases = new Databases(this.client);
        this.Storage = new Storage(this.client);
    }
    async createPost({ title, content, slug, featuredImage, status, userId }) {
        try {
            return await this.Databases.createDocument(
                Conf.appwritedatabaseid
                , Conf.appwritecollectionid
                , slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error
        }

    }
    async getPosts(queries = [Query.equal('status', 'published')]) {
        try {
            return await this.Databases.listDocuments(
                Conf.appwritedatabaseid
                , Conf.appwritecollectionid
                , queries
            )
        } catch (error) {
            throw error
        }
    }
    async getPost(slug) {
        try {
            return await this.Databases.getDocument(
                Conf.appwritedatabaseid
                , Conf.appwritecollectionid
                , slug
            )
        } catch (error) {
            throw error
        }
    }
    async deletePost(slug) {
        try {
            return await this.Databases.deleteDocument(
                Conf.appwritedatabaseid
                , Conf.appwritecollectionid
                , slug
            )
        } catch (error) {
            throw error
        }
    }
    async updatePost(slug, data) {
        try {
            return await this.Databases.updateDocument(
                Conf.appwritedatabaseid
                , Conf.appwritecollectionid
                , slug
                , data
            )
        } catch (error) {
            throw error
        }
    }
    async uploadImage(file) {
        try {
            return await this.Storage.createFile(Conf.appwritebucketid, ID.unique(), file)
        } catch (error) {
            throw error
            return false
        }
    }
    async deleteFile(fileId) {
        try {
            return await this.Storage.deleteFile(Conf.appwritebucketid, fileId)
        } catch (error) {
            throw error
        }
    }
    getFilePreview(fileId) {
        try {
            return this.Storage.getFileView(Conf.appwritebucketid, fileId)
        } catch (error) {
            throw error
        }
    }


}
const services = new Services()
export default services