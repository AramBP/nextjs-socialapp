import PocketBase from "pocketbase";

const pb = new PocketBase("http://localhost:8090");
pb.autoCancellation(false);
export default pb;
