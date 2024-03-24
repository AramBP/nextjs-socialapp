import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.DB_HOST);
pb.autoCancellation(false);
export default pb;
