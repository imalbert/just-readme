import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter as Router, Route } from 'react-router-dom';

import Repos from './Repos';
import * as githubAPI from '../api/github';

let container = null;
beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

test('Display repo links from the response by github', async () => {
	const username = 'imalbert';
	const fakeRepos = [ { name: 'fake-coffee' }, { name: 'walletx' } ];
	jest.spyOn(githubAPI, 'getRepos').mockImplementation(() => Promise.resolve(fakeRepos))

	await act(async () => {
		render(
			<Router initialEntries={[ `/${username}` ]}>
				<Route path={`/:username`}>
					<Repos />
				</Route>
			</Router>,
			container
		);
	});

	expect(container.querySelector('h1').textContent).toBe(`${username} - Repositories`);
	expect(container.getElementsByTagName('li').item(0).textContent).toBe(fakeRepos[0].name);
	expect(container.getElementsByTagName('li').item(1).textContent).toBe(fakeRepos[1].name);
	expect(githubAPI.getRepos).toBeCalledWith(username);
});

test('Display loading message', async () => {
	const username = 'imalbert';
	jest.spyOn(githubAPI, 'getRepos').mockImplementation(() => Promise.resolve(null))

	await act(async () => {
		render(
			<Router initialEntries={[ `/${username}` ]}>
				<Repos />
			</Router>,
			container
		);
	});

	expect(container.querySelector('p').textContent).toBe(`Repos loading, please wait...`);
});

test('Display no repos message', async () => {
	const username = 'imalbert';
	jest.spyOn(githubAPI, 'getRepos').mockImplementation(() => Promise.resolve([]))

	await act(async () => {
		render(
			<Router initialEntries={[ `/${username}` ]}>
				<Route path={`/:username`}>
					<Repos />
				</Route>
			</Router>,
			container
		);
	});

	expect(container.querySelector('p').textContent).toBe(`${username} has no repos`);
});

test('Navigate to readme page when clicking', async () => {
	const username = 'imalbert';
	const fakeRepos = [ { name: 'fake-coffee' }, { name: 'walletx' } ];
	jest.spyOn(githubAPI, 'getRepos').mockImplementation(() => Promise.resolve(fakeRepos))

	let locationNow = null;
	await act(async () => {
		render(
			<Router initialEntries={[ `/${username}` ]}>
				<Route path={`/:username`}>
					<Repos />
				</Route>
				<Route
					path="*"
					render={({ history, location }) => {
						locationNow = location.pathname;
						return null;
					}}
				/>
			</Router>,
			container
		);
	});

	jest.spyOn(githubAPI, 'getReadme').mockImplementation(() => Promise.resolve(""))
	let repoListItem = null;
	await act(async () => {
		repoListItem = container.getElementsByTagName('a').item(0);
		repoListItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
	});

	expect(locationNow).toBe(`/${username}/${repoListItem.innerHTML}`);
});
