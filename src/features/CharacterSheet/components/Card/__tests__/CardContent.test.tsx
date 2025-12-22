import React from 'react'
import { render, screen } from '@testing-library/react'
import { CardContent } from '../CardContent'

describe('CardContent', () => {
	it('renders string value', () => {
		render(<CardContent value="100" />)
		expect(screen.getByText('100')).toBeInTheDocument()
	})

	it('renders number value', () => {
		render(<CardContent value={42} />)
		expect(screen.getByText('42')).toBeInTheDocument()
	})

	it('renders ReactNode value', () => {
		render(
			<CardContent
				value={
					<span data-testid="custom-content">Custom Content</span>
				}
			/>,
		)
		expect(screen.getByTestId('custom-content')).toBeInTheDocument()
	})

	it('applies custom color', () => {
		const testColor = '#00ff00'
		render(<CardContent value="Test" color={testColor} data-testid="content" />)
		const element = screen.getByTestId('content')
		expect(element).toHaveStyle({ color: testColor })
	})

	it('applies custom sx props', () => {
		render(<CardContent value="Test" data-testid="content" sx={{ fontSize: '2rem' }} />)
		expect(screen.getByTestId('content')).toBeInTheDocument()
	})
})
