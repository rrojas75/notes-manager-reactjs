import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import s from "./style.module.css";
import { Link } from "react-router-dom";
import { Input } from "components/Input/Input";
import { AuthLayout } from "layouts/AuthLayout/AuthLayout";
export function Signin() {
  const form = (
    <div className={s.formContainer}>
      <h2 className={s.title}>
        Signin <br />
        to access your team notes
      </h2>
      <form className={s.formGroup}>
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
        <ButtonPrimary className={s.button}>Sign in!</ButtonPrimary>
        <span>
          Don't have an account yet ? <Link to="/signup">Signup</Link>
        </span>
      </form>
    </div>
  );
  return <AuthLayout>{form}</AuthLayout>;
}
