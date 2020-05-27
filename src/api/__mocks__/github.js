export const getRepos = () => {
	return new Promise((resolve, reject) => {
		process.nextTick(() => resolve([ { name: 'fake-coffee' }, { name: 'walletx' } ]));
	});
};
