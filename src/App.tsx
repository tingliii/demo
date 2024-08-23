import { noShadowDOM } from "solid-element";
import PeTabs from "./components/PeTabs";

const App = () => {
  noShadowDOM();  // FIXME: why?
  return (
    <div class="p-2">
      <h1 class="text-2xl font-bold mb-3">Tab Example</h1>
      <PeTabs />
    </div>
  );
};

export default App;
