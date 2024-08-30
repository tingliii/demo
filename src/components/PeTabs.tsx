import { createSignal, For } from "solid-js";
import { TabList } from "../types";
import PeTable from "./PeTable";

function Tabs() {
  const [activeTab, setActiveTab] = createSignal("tab0");
  return (
    <div class="tabs tabs-bordered">
      <For each={TabList}>
        {(tabName, index) => {
          return (
            <>
              <input
                type="radio"
                id={`tab${index()}`}
                class="tab [--tw-border-opacity:0]"
                classList={{
                  "tab-active": activeTab() === `tab${index()}`,
                  "hover:text-lavender-blue": activeTab() !== `tab${index()}`,
                }}
                aria-label={tabName}
                checked={activeTab() === `tab${index()}`}
                onClick={() => setActiveTab(`tab${index()}`)}
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
