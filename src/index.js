import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NoteBrowse } from "pages/NoteBrowse/NoteBrowse";
import { Note } from "pages/Note/Note";
import { NoteCreate } from "pages/NoteCreate/NoteCreate";
import { PageNotFound } from "pages/PageNotFound/PageNotFound";
import { ProtectedApp } from "App";
import { Signin } from "pages/Signin/Signin";
import { Signup } from "pages/Signup/Signup";
import { FirebaseApp } from "utils/firebase";
import { PersistGate } from "redux-persist/integration/react";

FirebaseApp.init();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={<ProtectedApp />}>
            <Route path="/" element={<NoteBrowse />}></Route>
            <Route path="/note/:noteId" element={<Note />}></Route>
            <Route path="/note/new" element={<NoteCreate />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
