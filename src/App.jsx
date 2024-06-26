import { NoteAPI } from "api/note-api";
import { Header } from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setNoteList } from "store/notes/note-slice";
import s from "./style.module.css";
import { withAuthRequired } from "hoc/withAuthRequired";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";

export function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchAllNotes() {
    const noteLst = await NoteAPI.fetchAll();
    dispatch(setNoteList(noteLst));
  }

  useEffect(() => {
    const unsubscribe = NoteAPI.onShouldSyncNotes(fetchAllNotes);

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <Header />
      <ButtonPrimary
        className={s.buttonAdd}
        onClick={() => navigate("/note/new")}
      >
        +
      </ButtonPrimary>
      <div className={s.workspace}>
        <Outlet />
      </div>
    </div>
  );
}

export const ProtectedApp = withAuthRequired(App);
