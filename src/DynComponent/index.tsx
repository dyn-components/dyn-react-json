import "./styles/index.scss";
import React, { useEffect, useRef, useCallback } from "react";
import { createElement, createJsonTree } from "./utils/index";

interface DynComponentProps {
  data: Record<string, unknown>;
}
const DynComponent: React.FC<DynComponentProps> = function DynComponent({
  data,
}) {
  const rootRef = useRef<HTMLElement>(null);

  const addCopyButton = useCallback(
    (container: HTMLElement) => {
      const button = createElement("button", "copy-button", "Copy");
      container.appendChild(button);
      button.addEventListener("click", () => {
        const jsonString = JSON.stringify(data, null, 2);
        navigator.clipboard.writeText(jsonString).then(() => {
          alert("JSON copied to clipboard");
        });
      });
    },
    [data]
  );

  useEffect(() => {
    const handleDataChange = () => {
      const json = data;
      if (typeof json === "object" && json !== null) {
        const jsonObject = createElement("div", "json-object");
        if (rootRef.current) {
          rootRef.current.innerHTML = "";
          rootRef.current.appendChild(jsonObject);
          createJsonTree(json, jsonObject);
          addCopyButton(rootRef.current);
        }
      } else if (rootRef.current) {
        rootRef.current.innerHTML =
          typeof json === "string" ? json : JSON.stringify(json, null, 2);
      }
    };

    handleDataChange();
  }, [data, addCopyButton]);

  return (
    <>
      <main ref={rootRef} className="dyn-component--react dyn-json"></main>;
    </>
  );
};

export default DynComponent;
