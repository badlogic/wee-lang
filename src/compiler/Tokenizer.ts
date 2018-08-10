module wee {
	export class TokenType {
		constructor (readonly literal: string | null, readonly error: string) {}

		static Period = new TokenType(".", ".");
		static Comma = new TokenType(",", ",");
		static Semicolon = new TokenType(";", ";");
		static Colon = new TokenType(":", ":");

		static Plus = new TokenType("+", "+");
		static Minus = new TokenType("-", "-");
		static Asterisk = new TokenType("*", "*");
		static ForwardSlash = new TokenType("/", "/");
		static Percentage = new TokenType("%", "%");
		static Exponent = new TokenType("^", "^");

		static Less = new TokenType("<", "<");
		static Greater = new TokenType(">", ">");
		static LessEqual = new TokenType("<=", "<=");
		static GreaterEqual = new TokenType(">=", ">=");
		static Equal = new TokenType("==", "==");
		static NotEqual = new TokenType("!=", "!=");
		static Assignment = new TokenType("=", "=");

		static Not = new TokenType("not", "not");
		static And = new TokenType("and", "and");
		static Or = new TokenType("or", "or");
		static Xor = new TokenType("xor", "xor");
		static Shl = new TokenType("shl", "shl");
		static Shr = new TokenType("shr", "shr");
		static Ushr = new TokenType("ushr", "ushr");

		static Pipe = new TokenType("|", "|");
		static LeftParantheses = new TokenType("(", ")");
		static RightParantheses = new TokenType(")", ")");
		static LeftBracket = new TokenType("[", "[");
		static RightBracket = new TokenType("]", "]");
		static LeftCurly = new TokenType("{", "{");
		static RightCurly = new TokenType("{", "}");
		static Questionmark = new TokenType("?", "?");
		static DoubleQuote = new TokenType("\"", "\"");

		static BooleanLiteral = new TokenType(null, "true or false");
		static DoubleLiteral = new TokenType(null, "a double floating point number");
		static FloatLiteral = new TokenType(null, "a floating point number");
		static LongLiteral = new TokenType(null, "a long integer number");
		static IntegerLiteral = new TokenType(null, "an integer number");
		static ShortLiteral = new TokenType(null, "a short integer number");
		static ByteLiteral = new TokenType(null, "a byte integer number");
		static CharacterLiteral = new TokenType(null, "a character");
		static StringLiteral = new TokenType(null, "a string");
		static NothingLiteral = new TokenType(null, "null");
		static Identifier = new TokenType(null, "an identifier");

		private static values: Array<TokenType> = [];

		static getSortedTypes () {
			if (TokenType.values.length == 0) {
				let names = Object.getOwnPropertyNames(TokenType);
				for (let i = 0; i < names.length; i++) {
					let property = (TokenType as any)[names[i]];
					if (property.constructor.name == "TokenType") {
						if (property.error != undefined) TokenType.values.push(property as TokenType);
					}
				}
				TokenType.values = TokenType.values.sort((a, b) => {
					if (a.literal == null && b.literal == null) return 0;
					if (a.literal == null && b.literal != null) return 1;
					if (a.literal != null && b.literal == null) return -1;
					if (a.literal != null && b.literal != null) {
						return a.literal.length - b.literal.length;
					}
					return 0;
				});
			}
			return TokenType.values;
		}
	}

	export class Token {
		readonly text: string;

		constructor (readonly type: TokenType, readonly span: Span) {
			this.text = span.text
		}
	}
}