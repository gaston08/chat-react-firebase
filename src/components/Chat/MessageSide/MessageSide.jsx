import styles from './MessageSide.module.css';
import Information from './Information/Information';
import Content from './Content/Content';
import InputSide from './InputSide/InputSide';

export default function Message() {
  return (
    <div className={styles.root}>
      <Information />
      <Content />
      <InputSide />
    </div>
  );
}