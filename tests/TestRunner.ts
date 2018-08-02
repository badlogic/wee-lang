module wee.tests {
	export function assert(condition: boolean, message = "") {
		if (!condition) throw new Error(message);
	}

	export function log(message: string, isError = false) {
		console.log(message);
		if (typeof document !== "undefined") {
			let div = document.createElement("div");
			let span = document.createElement("span");
			span.innerText = message;
			if (isError) span.style.color = "red";
			div.appendChild(span);
			document.body.appendChild(div);
		}
	}

	export function runTests(tests: any) {
		var props = Object.getOwnPropertyNames(tests);

		var numTests = 0;
		var numSuccess = 0;
		for (var i = 0; i < props.length; i++) {
			var testClass = tests[props[i]];
			if (testClass.name == "runTests" ||
				testClass.name == "assert" ||
				testClass.name == "log")
				continue;

			var testInstance = new testClass;
			Object.getOwnPropertyNames(Object.getPrototypeOf(testInstance)).filter((p) => {
				if ((p as any).startsWith("test")) {
					var testFunc = testInstance[p];
					if (typeof testFunc == "function") {
						numTests++;
						log("Running " + testClass.name + "." + p + "()");
						try {
							testFunc();
							numSuccess++;
						} catch (e) {
							log(e.stack, true);
						}
						log("\n");
					}
				}
			});
		}
		log("Total: " + numTests + ", errors: " + (numTests - numSuccess));
	}
}

wee.tests.runTests(wee.tests)