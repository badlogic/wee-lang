module wee.tests {
	export function runTests(weeTests: any) {
		var props = Object.getOwnPropertyNames(weeTests);

		for (var i = 0; i < props.length; i++) {
			console.log(weeTests[props[i]]);
		}
	}
}

wee.tests.runTests(wee.tests)