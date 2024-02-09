import Spinner from "../Spinner/Spinner";
import styles from "./SpinnerFullPage.module.scss";

export default function SpinnerFullPage() {
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
    </div>
  );
}
