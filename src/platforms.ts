const isSandboxed: boolean =
	(function() {
		return `/*{%^&$#_PLATFORM_IS_SANDBOXED_#$&^%}*/`;
	})() === `true`;

const platform: string = (function() {
	/*{%^&$#_PLATFORM_HERE_#$&^%}*/ return 'notset';
})();

export default {
	is: platform,
	sandboxed: isSandboxed,
	open: !isSandboxed,
};
