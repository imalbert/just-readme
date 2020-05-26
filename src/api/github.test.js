import { getRepos, getReadme } from './github';

beforeEach(() => {
	global.fetch = jest.fn().mockImplementation(() =>
		Promise.resolve({
			json: jest.fn()
		})
	);
});

test('getRepos should "fetch" with a correct URL', () => {
	getRepos('imalbert');

	expect(global.fetch).toBeCalledWith('https://api.github.com/users/imalbert/repos');
});

test('getReadme should "fetch" with a correct URL', () => {
	getReadme('imalbert', 'fake-coffee');

	expect(global.fetch).toBeCalledWith('https://api.github.com/repos/imalbert/fake-coffee/readme');
});
