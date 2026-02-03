import styles from "../App.module.css";

const Deletelist = ({ truncate }) => {
  return (
    <button className={styles.deleteAll} onClick={truncate} title="Delete all tasks">
      🗑️ Delete All
    </button>
  );
};

export default Deletelist