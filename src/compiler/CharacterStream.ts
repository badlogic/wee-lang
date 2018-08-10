module wee {

	/** A character stream wraps the content of a {@link Source} and handles traversing the content's characters. **/
	export class CharacterStream {
		private spanStart = 0;

		constructor (readonly source: Source, readonly start = 0, readonly end = source.content.length, private index = start) {
			if (start > end) throw new CompilerError(source, "Start must be <= end.");
			if (start < 0) throw new CompilerError(source, "Start must be >= 0.");
			if (start > Math.max(0, source.content.length - 1)) throw new CompilerError(source, "Start outside of source content.");
			if (end > source.content.length) throw new CompilerError(source, "End outside of source content.");
		}

		/** Reeturns whether there are more characters in the stream. **/
		hasMore () {
			return this.index < this.end;
		}

		/** Returns the next character without advancing the stream. **/
		peek () {
			if (!this.hasMore()) throw new CompilerError(this.source, "No more characters in stream.");
			return this.source.content.charAt(this.index);
		}

		/** Returns the next character and advances the stream. **/
		consume () {
			if (!this.hasMore()) throw new CompilerError(this.source, "No more characters in stream.");
			return this.source.content.charAt(this.index++);
		}

		/** Matches the given needle with the next characters. Returns true if the needle is
		 * matched, false otherwise. If there's a match and consume is true, the stream is
		 * advanced by the needle's length. */
		match (needle: string, consume: boolean) {
			let needleLength = needle.length;
			let content = this.source.content;
			for (var i = 0, j = this.index; i < needleLength; i++, j++) {
				if (this.index >= this.end) return false;
				if (needle.charAt(i) != content.charAt(j)) return false;
			}
			if (consume) this.index += needleLength;
			return true;
		}

		/** Returns whether the next character is a digit and optionally consumes it. **/
		matchDigit (consume: boolean) {
			if (this.index >= this.end) return false;
			let c = this.source.content.charAt(this.index);
			if (c >= '0' && c <= '9') {
				if (consume) this.index++;
				return true;
			}
			return false;
		}

		/** Returns whether the next character is the start of an identifier and optionally consumes it. Identifiers
		 * can start with [a-zA-Z] or an _. **/
		matchIdentifierStart (consume: boolean) {
			if (this.index >= this.end) return false;
			let c = this.source.content.charAt(this.index);
			if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c == '_')) {
				if (consume) this.index++;
				return true;
			}
			return false;
		}

		/** Returns whether the next character is part of an identifier and optionally consumes it. Identifiers
		 * parts can be [a-zA-Z], [0-9] or an _. **/
		matchIdentifierPart (consume: boolean) {
			if (this.index >= this.end) return false;
			let c = this.source.content.charAt(this.index);
			if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || (c == '_')) {
				if (consume) this.index++;
				return true;
			}
			return false;
		}

		/** Skips any number of successive whitespace characters. **/
		skipWhiteSpace () {
			let content = this.source.content;
			while (true) {
				if (this.index >= this.end) return;
				let c = content.charAt(this.index);
				if (c == ' ' || c == '\n' || c == '\r' || c == '\t') {
					this.index++;
					continue;
				} else {
					break;
				}
			}
		}

		/** Start a new Span at the current stream position. Call {@link endSpan} to complete the span. **/
		startSpan () {
			this.spanStart = this.index;
		}

		/** Completes the span started with {@link #startSpan()} at the current stream position. **/
		endSpan () {
			return Span.fromIndex(this.source, this.spanStart, this.index);
		}

		isSpanEmpty () {
			return this.spanStart == this.index;
		}

		/** Returns the current character position in the stream. **/
		getPosition () {
			return this.index;
		}
	}
}