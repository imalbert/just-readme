const GITHUB_API_URL = 'https://api.github.com';

export const getGithubAPI = (URL) => fetch(URL).then((response) => response.json()).then((data) => data);

/**
 * Fetch the list of repositories of a given github user
 * https://api.github.com/users/imalbert/repos
 *
 * @param {github username} username
 */
export const getRepos = (username) => {
	const GITHUB_REPOS_URL = `${GITHUB_API_URL}/users/${username}/repos`;
	return getGithubAPI(GITHUB_REPOS_URL);
};

/**
 * Fetch readme data of a given repository from a github user
 * https://api.github.com/repos/imalbert/fake-coffee/readme
 *
 * @param {github username} username
 * @param {name of project} projectName
 */
export const getReadme = (username, projectName) => {
	const GITHUB_README_URL = `${GITHUB_API_URL}/repos/${username}/${projectName}/readme`;
	return getGithubAPI(GITHUB_README_URL);
};
