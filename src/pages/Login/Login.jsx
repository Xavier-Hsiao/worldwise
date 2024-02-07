import { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import PageNav from "../../components/PageNav/PageNav";
import Button from "../../components/Button/Button";
import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (email && password) login(email, password);
  }

  // Handle side effect: fake authentication
  useEffect(() => {
    if (isAuthenticated) navigate("/app/cities", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <>
      <main className={styles.login}>
        <PageNav />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div>
            <Button type="primary">Login</Button>
          </div>
        </form>
      </main>
    </>
  );
}
