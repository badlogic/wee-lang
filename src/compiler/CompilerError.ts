module wee {
	export class CompilerError {
		constructor(readonly source: Source, readonly message: string) {
		}
	}
}