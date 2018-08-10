module wee {
	/** A source stores the content of a file and its path. A file in Wee equals a module. **/
	export class Source {
		constructor(readonly path: string, readonly content: string) {
		}
	}
}