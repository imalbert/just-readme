import React from 'react'
import { render } from '@testing-library/react';

import Loading from './Loading'

test('Loading component should render title', () => {
  const pageTitle = 'this page'
  const { getByTestId } = render (<Loading title={pageTitle} />)

  const message = getByTestId('loading-message')

  expect(message.innerHTML).toBe(`${pageTitle} loading, please wait...`)
})
