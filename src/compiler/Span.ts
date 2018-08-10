module wee {
	export class Span {
		readonly text: string;

		private constructor  (readonly source: Source, readonly start: number, readonly end: number) {
			if (start > end) throw new CompilerError(source, "Start must be <= end.");
			if (start < 0) throw new CompilerError(source, "Start must be >= 0.");
			if (start > source.content.length - 1) throw new CompilerError(source, "Start outside of content string.");
			if (end > source.content.length) throw new CompilerError(source, "End outside of content string.");

			this.text= source.content.substring(start, end);
		}

		static fromIndex(source: Source, start: number, end: number) {
			return new Span(source, start, end);
		}

		static fromSpans(start: Span, end: Span) {
			if (start.source !== end.source) throw new CompilerError(start.source, "Sources of input spans are not the same.");
			return new Span(start.source, start.start, end.end);
		}

		/** Returns the line this span is on. Does not return a correct result for spans across multiple lines. **/
		getLine () {
			let lineStart = this.start;
			let content = this.source.content;
			while (true) {
				if (lineStart < 0) break;
				let c = content.charAt(lineStart);
				if (c == '\n') {
					lineStart = lineStart + 1;
					break;
				}
				lineStart--;
			}
			if (lineStart < 0) lineStart = 0;

			let lineEnd = this.end;
			while (true) {
				if (lineEnd > content.length - 1) break;
				let c = content.charAt(lineEnd);
				if (c == '\n') {
					break;
				}
				lineEnd++;
			}

			let lineNumber = 0;
			let idx = lineStart;
			while (idx > 0) {
				let c = content.charAt(idx);
				if (c == '\n') {
					lineNumber++;
				}
				idx--;
			}
			lineNumber++;

			return new Line(this.source, lineStart, lineEnd, lineNumber);
		}
	}

	/** A line within a Source **/
	export class Line {
		readonly text: string;
		constructor (readonly source: Source, readonly start: number, readonly end: number, readonly lineNumber: number) {
			this.text = this.source.content.substring(this.start, this.end);
		}
	}
}