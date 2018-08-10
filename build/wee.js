"use strict";
var wee;
(function (wee) {
    var CharacterStream = (function () {
        function CharacterStream(source, start, end, index) {
            if (start === void 0) { start = 0; }
            if (end === void 0) { end = source.content.length; }
            if (index === void 0) { index = start; }
            this.source = source;
            this.start = start;
            this.end = end;
            this.index = index;
            this.spanStart = 0;
            if (start > end)
                throw new wee.CompilerError(source, "Start must be <= end.");
            if (start < 0)
                throw new wee.CompilerError(source, "Start must be >= 0.");
            if (start > Math.max(0, source.content.length - 1))
                throw new wee.CompilerError(source, "Start outside of source content.");
            if (end > source.content.length)
                throw new wee.CompilerError(source, "End outside of source content.");
        }
        CharacterStream.prototype.hasMore = function () {
            return this.index < this.end;
        };
        CharacterStream.prototype.peek = function () {
            if (!this.hasMore())
                throw new wee.CompilerError(this.source, "No more characters in stream.");
            return this.source.content.charAt(this.index);
        };
        CharacterStream.prototype.consume = function () {
            if (!this.hasMore())
                throw new wee.CompilerError(this.source, "No more characters in stream.");
            return this.source.content.charAt(this.index++);
        };
        CharacterStream.prototype.match = function (needle, consume) {
            var needleLength = needle.length;
            var content = this.source.content;
            for (var i = 0, j = this.index; i < needleLength; i++, j++) {
                if (this.index >= this.end)
                    return false;
                if (needle.charAt(i) != content.charAt(j))
                    return false;
            }
            if (consume)
                this.index += needleLength;
            return true;
        };
        CharacterStream.prototype.matchDigit = function (consume) {
            if (this.index >= this.end)
                return false;
            var c = this.source.content.charAt(this.index);
            if (c >= '0' && c <= '9') {
                if (consume)
                    this.index++;
                return true;
            }
            return false;
        };
        CharacterStream.prototype.matchIdentifierStart = function (consume) {
            if (this.index >= this.end)
                return false;
            var c = this.source.content.charAt(this.index);
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c == '_')) {
                if (consume)
                    this.index++;
                return true;
            }
            return false;
        };
        CharacterStream.prototype.matchIdentifierPart = function (consume) {
            if (this.index >= this.end)
                return false;
            var c = this.source.content.charAt(this.index);
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || (c == '_')) {
                if (consume)
                    this.index++;
                return true;
            }
            return false;
        };
        CharacterStream.prototype.skipWhiteSpace = function () {
            var content = this.source.content;
            while (true) {
                if (this.index >= this.end)
                    return;
                var c = content.charAt(this.index);
                if (c == ' ' || c == '\n' || c == '\r' || c == '\t') {
                    this.index++;
                    continue;
                }
                else {
                    break;
                }
            }
        };
        CharacterStream.prototype.startSpan = function () {
            this.spanStart = this.index;
        };
        CharacterStream.prototype.endSpan = function () {
            return wee.Span.fromIndex(this.source, this.spanStart, this.index);
        };
        CharacterStream.prototype.isSpanEmpty = function () {
            return this.spanStart == this.index;
        };
        CharacterStream.prototype.getPosition = function () {
            return this.index;
        };
        return CharacterStream;
    }());
    wee.CharacterStream = CharacterStream;
})(wee || (wee = {}));
var wee;
(function (wee) {
    var CompilerError = (function () {
        function CompilerError(source, message) {
            this.source = source;
            this.message = message;
        }
        return CompilerError;
    }());
    wee.CompilerError = CompilerError;
})(wee || (wee = {}));
var wee;
(function (wee) {
    var Source = (function () {
        function Source(path, content) {
            this.path = path;
            this.content = content;
        }
        return Source;
    }());
    wee.Source = Source;
})(wee || (wee = {}));
var wee;
(function (wee) {
    var Span = (function () {
        function Span(source, start, end) {
            this.source = source;
            this.start = start;
            this.end = end;
            if (start > end)
                throw new wee.CompilerError(source, "Start must be <= end.");
            if (start < 0)
                throw new wee.CompilerError(source, "Start must be >= 0.");
            if (start > source.content.length - 1)
                throw new wee.CompilerError(source, "Start outside of content string.");
            if (end > source.content.length)
                throw new wee.CompilerError(source, "End outside of content string.");
            this.text = source.content.substring(start, end);
        }
        Span.fromIndex = function (source, start, end) {
            return new Span(source, start, end);
        };
        Span.fromSpans = function (start, end) {
            if (start.source !== end.source)
                throw new wee.CompilerError(start.source, "Sources of input spans are not the same.");
            return new Span(start.source, start.start, end.end);
        };
        Span.prototype.getLine = function () {
            var lineStart = this.start;
            var content = this.source.content;
            while (true) {
                if (lineStart < 0)
                    break;
                var c = content.charAt(lineStart);
                if (c == '\n') {
                    lineStart = lineStart + 1;
                    break;
                }
                lineStart--;
            }
            if (lineStart < 0)
                lineStart = 0;
            var lineEnd = this.end;
            while (true) {
                if (lineEnd > content.length - 1)
                    break;
                var c = content.charAt(lineEnd);
                if (c == '\n') {
                    break;
                }
                lineEnd++;
            }
            var lineNumber = 0;
            var idx = lineStart;
            while (idx > 0) {
                var c = content.charAt(idx);
                if (c == '\n') {
                    lineNumber++;
                }
                idx--;
            }
            lineNumber++;
            return new Line(this.source, lineStart, lineEnd, lineNumber);
        };
        return Span;
    }());
    wee.Span = Span;
    var Line = (function () {
        function Line(source, start, end, lineNumber) {
            this.source = source;
            this.start = start;
            this.end = end;
            this.lineNumber = lineNumber;
            this.text = this.source.content.substring(this.start, this.end);
        }
        return Line;
    }());
    wee.Line = Line;
})(wee || (wee = {}));
var wee;
(function (wee) {
    var tests;
    (function (tests) {
        var CharacterStreamTest = (function () {
            function CharacterStreamTest() {
            }
            CharacterStreamTest.prototype.testDefaultConstructor = function () {
                var source = new wee.Source("test.wee", "var a = 0");
                var charStream = new wee.CharacterStream(source);
                tests.assert(charStream.start == 0);
                tests.assert(charStream.end == source.content.length);
            };
            CharacterStreamTest.prototype.testSubstringConstructor = function () {
                var source = new wee.Source("test.wee", "var a = 0");
                var charStream = new wee.CharacterStream(source, 2, 4);
                tests.assert(charStream.start == 2);
                tests.assert(charStream.end == 4);
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