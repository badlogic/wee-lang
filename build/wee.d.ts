declare module wee {
    class CharacterStream {
        foo(): void;
    }
}
declare module wee.tests {
    class CharacterStreamTest {
        testStuff(): void;
    }
}
declare module wee.tests {
    function assert(condition: boolean, message?: string): void;
    function log(message: string, isError?: boolean): void;
    function runTests(tests: any): void;
}
