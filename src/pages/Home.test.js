import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import Home from './Home';

test('Homepage navigates to the github user repo page on submit', async () => {
	let locationNow;
	const inputValue = 'imalbert';
	const { getByTestId } = render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<Home />
			<Route
				path="*"
				render={({ history, location }) => {
					locationNow = location;
					return null;
				}}
			/>
		</MemoryRouter>
	);
	const input = getByTestId('gh-username-input');
	const form = getByTestId('gh-username-form');

	fireEvent.change(input, { target: { value: inputValue } });
	fireEvent.submit(form);

	expect(input.value).toBe(inputValue);
	expect(locationNow.pathname).toBe(`/${inputValue}`);
});
