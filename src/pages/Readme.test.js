import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import MarkdownIt from 'markdown-it'

import Readme from './Readme';
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

test('Display readme', async () => {
	const md = MarkdownIt({
		html: true,
		linkify: true,
		typographer: true
	})
	const username = 'imalbert',
		project = 'fake-coffee',
		fakeReadmeRaw =
			'Website design inspiration by [Alexey Maslov](https://www.behance.net/gallery/44582565/Techinque). Checkout his [behance page](https://www.behance.net/blackbread)!',
		fakeReadmeMd = md.render(fakeReadmeRaw)

	jest.spyOn(githubAPI, 'getReadme').mockImplementation(() => Promise.resolve(fakeReadmeRaw))

	await act(async () => {
		render(
			<Router initialEntries={[ `/${username}/${project}` ]}>
				<Route path={`/:username/:project`}>
					<Readme />
				</Route>
			</Router>,
			container
		);
	});

	expect(container.querySelector('h1').textContent).toBe(`${username}/${project} README`);
	expect(container.querySelector('article').innerHTML).toBe(fakeReadmeMd);
});

test('Display loading message', async () => {
	const username = 'imalbert',
		project = 'fake-coffee';
	jest.spyOn(githubAPI, 'getReadme').mockImplementation(() => Promise.resolve(undefined))

	await act(async () => {
		render(
			<Router initialEntries={[ `/${username}/${project}` ]}>
				<Route path={`/:username/:project`}>
					<Readme />
				</Route>
			</Router>,
			container
		);
	});

	expect(container.querySelector('p').textContent).toBe(`Project loading, please wait...`);
});

test('Display not found message', async () => {
	const username = 'imalbert',
		project = 'fake-coffee';
	jest.spyOn(githubAPI, 'getReadme').mockImplementation(() =>
		Promise.resolve({ message: 'Not Found' })
	);

	await act(async () => {
		render(
			<Router initialEntries={[ `/${username}/${project}` ]}>
				<Route path={`/:username/:project`}>
					<Readme />
				</Route>
			</Router>,
			container
		);
	});

	expect(container.querySelector('i').textContent).toBe('No README was provided for this project.');
});
