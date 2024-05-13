import { NoteAPI } from "api/note-api";
import { Header } from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setNoteList } from "store/notes/note-slice";
import s from "./style.module.css";

export function App() {
  const dispatch = useDispatch();

  async function fetchAllNotes() {
    const noteLst = await NoteAPI.fetchAll();
    dispatch(setNoteList(noteLst));
  }

  useEffect(() => {
    fetchAllNotes();
  }, []);
  return (
    <div>
      <Header />
      <div className={s.workspace}>
        <Outlet />
      </div>
    </div>
  );
}
