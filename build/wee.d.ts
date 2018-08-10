declare module wee {
    class CharacterStream {
        readonly source: Source;
        readonly start: number;
        readonly end: number;
        private index;
        private spanStart;
        constructor(source: Source, start?: number, end?: number, index?: number);
        hasMore(): boolean;
        peek(): string;
        consume(): string;
        match(needle: string, consume: boolean): boolean;
        matchDigit(consume: boolean): boolean;
        matchIdentifierStart(consume: boolean): boolean;
        matchIdentifierPart(consume: boolean): boolean;
        skipWhiteSpace(): void;
        startSpan(): void;
        endSpan(): Span;
        isSpanEmpty(): boolean;
        getPosition(): number;
    }
}
declare module wee {
    class CompilerError {
        readonly source: Source;
        readonly message: string;
        constructor(source: Source, message: string);
    }
}
declare module wee {
    class Source {
        readonly path: string;
        readonly content: string;
        constructor(path: string, content: string);
    }
}
declare module wee {
    class Span {
        readonly source: Source;
        readonly start: number;
        readonly end: number;
        readonly text: string;
        private constructor();
        static fromIndex(source: Source, start: number, end: number): Span;
        static fromSpans(start: Span, end: Span): Span;
        getLine(): Line;
    }
    class Line {
        readonly source: Source;
        readonly start: number;
        readonly end: number;
        readonly lineNumber: number;
        readonly text: string;
        constructor(source: Source, start: number, end: number, lineNumber: number);
    }
}
declare module wee.tests {
    class CharacterStreamTest {
        testDefaultConstructor(): void;
        testSubstringConstructor(): void;
    }
}
declare module wee.tests {
    function assert(condition: boolean, message?: string): void;
    function log(message: string, isError?: boolean): void;
    function runTests(tests: any): void;
}
