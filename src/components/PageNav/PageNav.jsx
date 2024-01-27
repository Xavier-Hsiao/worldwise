import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.scss";

export default function PageNav() {
  return (
    <div>
      <ul className={styles.nav}>
        <li>
          <NavLink to="/">Homepage</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
      </ul>
    </div>
  );
}
