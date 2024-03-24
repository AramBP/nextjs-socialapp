import PocketBase from "pocketbase";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const POCKET_BASE_URL = "http://localhost:8090";

export class DatabaseClient {
  //pocketbase instant
  client;

  constructor() {
    //instantiate PocketBase before use
    this.client = new PocketBase(POCKET_BASE_URL);
    this.client.autoCancellation(false);
  }

  async logout() {
    this.client.authStore.clear();
  }

  async oAuthMethods() {
    const authMethods = await this.client.collection("users").listAuthMethods();
    const listItems = [];
    for (const provider of authMethods.authProviders) {
      listItems.push(provider);
    }
    return listItems;
  }

  //handle user registration
  async register(email, password) {
    try {
      //we provide only the minimum required fields by user create method
      const result = await this.client.collection("users").create({
        email,
        password,
        passwordConfirm: password,
      });
      return result;
    } catch (err) {
      console.log("Cant create user");
      console.error(err);
    }
  }
}

export const db = new DatabaseClient();
export default db;
