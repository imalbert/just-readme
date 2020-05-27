export const GITHUB_API_URL = 'https://api.github.com';

/**
 * Fetch the list of repositories of a given github user
 * https://api.github.com/users/imalbert/repos
 *
 * @param {github username} username
 */
export const getRepos = (username) => {
	const GITHUB_REPOS_ENDPOINT = `${GITHUB_API_URL}/users/${username}/repos`
	return fetch(GITHUB_REPOS_ENDPOINT)
		.then((response) => response.json())
		.then((data) => data);
};

/**
 * Fetch readme data of a given repository from a github user
 * https://api.github.com/repos/imalbert/fake-coffee/readme
 * https://raw.githubusercontent.com/imalbert/fake-coffee/master/README.md
 *
 * @param {github username} username
 * @param {name of project} project
 */
export const getReadme = async (username, project) => {
	const GITHUB_README_ENDPOINT = `${GITHUB_API_URL}/repos/${username}/${project}/readme`
	const { message, download_url } = await fetch(GITHUB_README_ENDPOINT)
		.then((response) => response.json())
		.then((data) => data);

	if (download_url) {
		return fetch(download_url)
			.then(response => response.text())
			.then(data => data)
	} else {
		return { message }
	}
};
