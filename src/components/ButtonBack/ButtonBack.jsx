import styles from "../Button/Button.module.scss";
import { useNavigate } from "react-router";
import Button from "../Button/Button";

export default function ButtonBack() {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      className={styles.btn}
      onClick={(event) => {
        event.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}
