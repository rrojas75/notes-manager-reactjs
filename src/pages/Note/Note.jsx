import { NoteAPI } from "api/note-api";
import { NoteForm } from "components/NoteForm/NoteForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNote, updateNote } from "store/notes/note-slice";

export function Note(props) {
  const { noteId } = useParams();
  const note = useSelector((store) =>
    store.noteSlice.noteList.find((note) => note.id === noteId)
  );

  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitNote = async (formValues) => {
    const updatedNote = await NoteAPI.updateById(note.id, formValues);
    dispatch(updateNote(updatedNote));
    setIsEditable(false);
    alert("Note Updated");
  };

  const onDeleteNote = async () => {
    if (window.confirm("Are you sure you want to delete note?")) {
      dispatch(deleteNote(note));
      await NoteAPI.deleteById(note.id);
      navigate("/");
    }
  };

  return (
    <>
      {note && (
        <NoteForm
          isEditable={isEditable}
          note={note}
          title={isEditable && "Edit Note"}
          onClickDelete={onDeleteNote}
          onClickEdit={() => setIsEditable(!isEditable)}
          onSubmit={isEditable && submitNote}
        />
      )}
    </>
  );
}
