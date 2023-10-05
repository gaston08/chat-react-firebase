import './Message.css';
import Information from './Information/Information';
import Content from './Content/Content';
import InputSide from './InputSide/InputSide';

export default function Message() {
  return (
    <div className="root">
      <Information />
      <Content />
      <InputSide />
    </div>
  );
}