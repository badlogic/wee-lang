declare module wee {
    class CharacterStream {
        foo(): void;
    }
}
declare module wee.tests {
    class CharacterStreamTest {
        test(): void;
    }
}
declare module wee.tests {
    function runTests(weeTests: any): void;
}
