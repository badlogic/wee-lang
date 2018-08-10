module wee.tests {
	export class CharacterStreamTest {
		testDefaultConstructor() {
			let source = new Source("test.wee", "var a = 0");
			let charStream = new CharacterStream(source);
			assert(charStream.start == 0);
			assert(charStream.end == source.content.length);
		}

		testSubstringConstructor() {
			let source = new Source("test.wee", "var a = 0");
			let charStream = new CharacterStream(source, 2, 4);
			assert(charStream.start == 2);
			assert(charStream.end == 4);
		}
	}
}