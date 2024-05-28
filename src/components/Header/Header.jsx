import { Logo } from "components/logo";
import s from "./style.module.css";
import logoSrc from "assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/auth/auth-selectors";
import { AuthAPI } from "api/auth";
import { setUser } from "store/auth/auth-slice";

export function Header() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const signout = () => {
    AuthAPI.signout();
    dispatch(setUser(null));
  };
  const renderAuthProfile = () => {
    return (
      <div>
        <img
          src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}`}
          style={{ width: 40 }}
          className="rounded-circle"
        />
        <div>Hellom, {user.email}</div>
        <Link to="#" onClick={signout}>
          Signout
        </Link>
      </div>
    );
  };
  return (
    <div className={`row ${s.container}`}>
      <div className="col-xs-12 col-sm-4">
        <Logo
          onClick={() => navigate("/")}
          title="DigiNote"
          subtitle="Manage your notes"
          image={logoSrc}
        />
      </div>
      <div className="col-xs-12 col-sm-8 text-end">{renderAuthProfile()}</div>
    </div>
  );
}
