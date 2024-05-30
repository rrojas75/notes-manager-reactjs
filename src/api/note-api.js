import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { FirebaseApp } from "utils/firebase";

export class NoteAPI {
  static async create(note) {
    const response = addDoc(collection(FirebaseApp.db, "notes"), note);
    return {
      id: response.id,
      ...note,
    };
  }

  static async fetchAll() {
    const q = query(
      collection(FirebaseApp.db, "notes"),
      orderBy("created_at", "asc")
    );
    const response = await getDocs(q);
    return response.docs.map((document) => {
      return {
        id: document.id,
        ...document.data(),
      };
    });
  }

  static async deleteById(noteId) {
    deleteDoc(doc(FirebaseApp.db, "notes", noteId));
  }

  static async updateById(id, note) {
    const query = doc(FirebaseApp.db, "notes", id);
    await updateDoc(query, note);
    return {
      id,
      ...note,
    };
  }

  static onShouldSyncNotes(onChange) {
    const q = query(collection(FirebaseApp.db, "notes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const isUserPerformingChange = querySnapshot.metadata.hasPendingWrites;
      if (!isUserPerformingChange) {
        onChange();
        console.log("You are not sync with the notes collection");
      }
    });

    return unsubscribe;
  }
}
