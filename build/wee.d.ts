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
declare module wee {
    class TokenType {
        readonly literal: string | null;
        readonly error: string;
        constructor(literal: string | null, error: string);
        static Period: TokenType;
        static Comma: TokenType;
        static Semicolon: TokenType;
        static Colon: TokenType;
        static Plus: TokenType;
        static Minus: TokenType;
        static Asterisk: TokenType;
        static ForwardSlash: TokenType;
        static Percentage: TokenType;
        static Exponent: TokenType;
        static Less: TokenType;
        static Greater: TokenType;
        static LessEqual: TokenType;
        static GreaterEqual: TokenType;
        static Equal: TokenType;
        static NotEqual: TokenType;
        static Assignment: TokenType;
        static Not: TokenType;
        static And: TokenType;
        static Or: TokenType;
        static Xor: TokenType;
        static Shl: TokenType;
        static Shr: TokenType;
        static Ushr: TokenType;
        static Pipe: TokenType;
        static LeftParantheses: TokenType;
        static RightParantheses: TokenType;
        static LeftBracket: TokenType;
        static RightBracket: TokenType;
        static LeftCurly: TokenType;
        static RightCurly: TokenType;
        static Questionmark: TokenType;
        static DoubleQuote: TokenType;
        static BooleanLiteral: TokenType;
        static DoubleLiteral: TokenType;
        static FloatLiteral: TokenType;
        static LongLiteral: TokenType;
        static IntegerLiteral: TokenType;
        static ShortLiteral: TokenType;
        static ByteLiteral: TokenType;
        static CharacterLiteral: TokenType;
        static StringLiteral: TokenType;
        static NothingLiteral: TokenType;
        static Identifier: TokenType;
        private static values;
        static getSortedTypes(): TokenType[];
    }
    class Token {
        readonly type: TokenType;
        readonly span: Span;
        readonly text: string;
        constructor(type: TokenType, span: Span);
    }
}
declare module wee.tests {
    class CharacterStreamTest {
        testDefaultConstructor(): void;
        testSubstringConstructor(): void;
    }
}
declare module wee.tests {
    class TokenizerTest {
        testSortedTokenTypes(): void;
    }
}
declare module wee.tests {
    function assert(condition: boolean, message?: string): void;
    function log(message: string, isError?: boolean): void;
    function runTests(tests: any): void;
}
