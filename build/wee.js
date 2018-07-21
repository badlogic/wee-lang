var wee;
(function (wee) {
    var CharacterStream = (function () {
        function CharacterStream() {
        }
        CharacterStream.prototype.foo = function () {
            throw "Oh no";
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
            CharacterStreamTest.prototype.test = function () {
                new wee.CharacterStream().foo();
            };
            return CharacterStreamTest;
        }());
        tests.CharacterStreamTest = CharacterStreamTest;
    })(tests = wee.tests || (wee.tests = {}));
})(wee || (wee = {}));
var wee;
(function (wee) {
    var tests;
    (function (tests) {
        function runTests(weeTests) {
            var props = Object.getOwnPropertyNames(weeTests);
            for (var i = 0; i < props.length; i++) {
                console.log(weeTests[props[i]]);
            }
        }
        tests.runTests = runTests;
    })(tests = wee.tests || (wee.tests = {}));
})(wee || (wee = {}));
wee.tests.runTests(wee.tests);
//# sourceMappingURL=wee.js.map