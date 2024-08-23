import { customElement } from "solid-element";
import App from "./App";
import styles from "./index.css?inline";

customElement("pe-view", () => {
  return (
    <div>
      <style>{styles}</style>
      <App />
    </div>
  );
});
