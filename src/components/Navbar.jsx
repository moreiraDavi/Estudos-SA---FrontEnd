import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// CSS
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        <img src="/logo.jpg" alt="Logo" style={{ height: "50px" }} />
      </Link>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sobre"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Sobre
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/concursos"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Concursos
          </NavLink>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <NavLink
                to="/rotinas"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Rotinas
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout}>Sair</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
