import mongoose from "mongoose";
class Database {
    constructor() {
        this.dbConnect = async () => {
            try {
                await mongoose.connect("mongodb://localhost:27017/successivedb");
                console.log("db connected successfully");
            }
            catch (error) {
                throw error;
            }
        };
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
}
export default Database.getInstance();
