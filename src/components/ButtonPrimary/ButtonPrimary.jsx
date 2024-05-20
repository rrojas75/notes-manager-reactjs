import s from "./style.module.css";

export function ButtonPrimary({ type, children, onClick, isDisabled }) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type={type || "button"}
      className={`btn btn-primary ${s.button}`}
    >
      {children}
    </button>
  );
}
