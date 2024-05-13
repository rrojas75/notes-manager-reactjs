import { NoteAPI } from "api/note-api";
import { NoteForm } from "components/NoteForm/NoteForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNote } from "store/notes/note-slice";

export function NoteCreate(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (formValues) => {
    const createdNote = await NoteAPI.create({
      ...formValues,
      created_at: new Date().toLocaleDateString(),
    });
    dispatch(addNote(createdNote));
    alert("Note Created");
    navigate("/");
  };
  return (
    <>
      <NoteForm
        title="New Note"
        onSubmit={(formValues) => submit(formValues)}
      />
    </>
  );
}
