declare module '*.json' {
	const value: any;
	export default value;
}

declare module '*package.json' {
	const value: {
    dependencies: {
      [deps: string]: string
    };
	};
	export default value;
}
