import { PeTable } from "./PeTable";
import {
  createSignal,
  createResource,
  Switch,
  Match,
  Show,
  For,
} from "solid-js";
import { TabList } from "../types";

const fetchProductDiff = async () => {
  const res = await fetch("http://localhost:5000/products");
  return res.json();
};

function Tabs() {
  const [activeTab, setActiveTab] = createSignal("tab1");
  const [content] = createResource(fetchProductDiff);
  return (
    <div class="tabs tabs-bordered">
      <For each={TabList}>
        {(tabName, index) => {
          const tabId = `tab${index()}`;
          console.log(tabId);
          return (
            <>
              <input
                type="radio"
                id={tabId}
                class="tab [--tw-border-opacity:0]"
                classList={{
                  "tab-active": activeTab() === tabId,
                  "hover:text-lavender-blue": activeTab() !== tabId,
                }}
                aria-label={tabName}
                checked={activeTab() === tabId}
                onClick={() => setActiveTab(tabId)}
              />
              <div class="tab-content bg-base-100 border-base-300 p-6">
                <PeTable />
              </div>
            </>
          );
        }}
      </For>
    </div>
  );
}

export default Tabs;
