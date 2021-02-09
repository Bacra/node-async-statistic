const async_hooks = require('async_hooks');

module.exports = async function statistic(
	handler = function() {},
	options = {}
) {
	const parentAsyncIds = {};
	const inRun = [];
	const outRun = [];

	const asyncHook = async_hooks.createHook({
		init(asyncId, type, triggerAsyncId) {
			const stack = options.stack && new Error().stack || undefined;

			if (parentAsyncIds[triggerAsyncId]) {
				parentAsyncIds[asyncId] = true;
				inRun.push({ type, stack });
			} else {
				outRun.push({ type, stack });
			}
		},
	});

	await 0;

	asyncHook.enable();
	parentAsyncIds[async_hooks.executionAsyncId()] = true;

	const promise = handler();
	if (promise && promise.then) await promise;

	asyncHook.disable();

	return {
		inRun,
		outRun,
	};
}
