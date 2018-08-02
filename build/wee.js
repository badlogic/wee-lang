var wee;
(function (wee) {
    var CharacterStream = (function () {
        function CharacterStream() {
        }
        CharacterStream.prototype.foo = function () {
        };
        return CharacterStream;
    }());
    wee.CharacterStream = CharacterStream;
})(wee || (wee = {}));
var wee;
(function (wee) {
    var tests;
    (function (tests) {
        var CharacterStreamTest = (function () {
            function CharacterStreamTest() {
            }
            CharacterStreamTest.prototype.testStuff = function () {
                tests.log("Hello world");
                tests.assert(false, "Oh no, assert failed.");
            };
            return CharacterStreamTest;
        }());
        tests.CharacterStreamTest = CharacterStreamTest;
    })(tests = wee.tests || (wee.tests = {}));
})(wee || (wee = {}));
var wee;
(function (wee) {
    var tests;
    (function (tests_1) {
        function assert(condition, message) {
            if (message === void 0) { message = ""; }
            if (!condition)
                throw new Error(message);
        }
        tests_1.assert = assert;
        function log(message, isError) {
            if (isError === void 0) { isError = false; }
            console.log(message);
            if (typeof document !== "undefined") {
                var div = document.createElement("div");
                var span = document.createElement("span");
                span.innerText = message;
                if (isError)
                    span.style.color = "red";
                div.appendChild(span);
                document.body.appendChild(div);
            }
        }
        tests_1.log = log;
        function runTests(tests) {
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
                Object.getOwnPropertyNames(Object.getPrototypeOf(testInstance)).filter(function (p) {
                    if (p.startsWith("test")) {
                        var testFunc = testInstance[p];
                        if (typeof testFunc == "function") {
                            numTests++;
                            log("Running " + testClass.name + "." + p + "()");
                            try {
                                testFunc();
                                numSuccess++;
                            }
                            catch (e) {
                                log(e.stack, true);
                            }
                            log("\n");
                        }
                    }
                });
            }
            log("Total: " + numTests + ", errors: " + (numTests - numSuccess));
        }
        tests_1.runTests = runTests;
    })(tests = wee.tests || (wee.tests = {}));
})(wee || (wee = {}));
wee.tests.runTests(wee.tests);
//# sourceMappingURL=wee.js.map