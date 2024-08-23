import { customElement } from "solid-element";
import styles from "./index.css?inline";
import App from "./App";

customElement("pe-view", () => {
  return (
    <div>
      <style>{styles}</style>
      <App />
    </div>
  );
});
