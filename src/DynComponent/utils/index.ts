export function createElement(type: string, className?: string, innerText?: string) {
  const element = document.createElement(type);
  if (className) element.className = className;
  if (innerText) element.innerText = innerText;
  return element;
}

export function createJsonTree(json: Record<string, any>, container: HTMLElement) {
	if (Array.isArray(json)) {
		container.appendChild(createElement("span", "bracket", "["));
	} else {
		container.appendChild(createElement("span", "bracket", "{"));
	}
	container.appendChild(createElement("br"));

	const keys = Object.keys(json);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const isLastKey = i === keys.length - 1;
		if (json.hasOwnProperty(key)) {
			// 数组下标不追加key
			if (!Array.isArray(json)) {
				const keyElement = createElement("span", "json-key", key);
				container.appendChild(keyElement);
				let colonElement = createElement("span", "colon", ":");
				container.appendChild(colonElement);
			}

			if (typeof json[key] === "object" && json[key] !== null) {
				const toggleElement = createElement(
					"span",
					"json-toggle",
					`[+]${Array.isArray(json[key]) ? "Array" : "Object"}(${Object.keys(json[key]).length
					})`
				);
				toggleElement.onclick = function (event: any) {
					const sibling = event.target!.nextElementSibling;
					sibling.classList.toggle("hidden");
					event.target.innerText = sibling.classList.contains("hidden")
						? `[+]${Array.isArray(json[key]) ? "Array" : "Object"}(${Object.keys(json[key]).length
						})`
						: `[-]${Array.isArray(json[key]) ? "Array" : "Object"}(${Object.keys(json[key]).length
						})`;
				};
				container.appendChild(toggleElement);

				const subContainer = createElement("div", "json-object hidden");
				createJsonTree(json[key], subContainer);
				container.appendChild(subContainer);
			} else {
				const value = json[key];
				const valueElement = createElement(
					"span",
					"json-value",
					`${JSON.stringify(value)}`
				);

				if (typeof value === "string") {
					valueElement.classList.add("string");
				} else if (typeof value === "number") {
					valueElement.classList.add("number");
				} else if (typeof value === "boolean") {
					valueElement.classList.add("boolean");
				} else if (value === null) {
					valueElement.classList.add("null");
				}

				container.appendChild(valueElement);
				if (!isLastKey) {
					container.appendChild(createElement("span", "json-separator", ", "));
				}
			}

			container.appendChild(createElement("br"));
		}
	}

	if (Array.isArray(json)) {
		container.appendChild(createElement("span", "bracket", "]"));
	} else {
		container.appendChild(createElement("span", "bracket", "}"));
	}
}