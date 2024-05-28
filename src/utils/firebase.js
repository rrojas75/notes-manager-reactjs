import { firebaseConfig } from "../config";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

export class FirebaseApp {
  static firebaseApp = undefined;
  static auth = undefined;
  static init() {
    this.firebaseApp = initializeApp(firebaseConfig);
    this.auth = getAuth();
  }
}
