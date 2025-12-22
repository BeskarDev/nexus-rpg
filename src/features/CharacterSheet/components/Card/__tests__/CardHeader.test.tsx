import React from 'react'
import { render, screen } from '@testing-library/react'
import { CardHeader } from '../CardHeader'
import { Favorite } from '@mui/icons-material'

describe('CardHeader', () => {
	it('renders label correctly', () => {
		render(<CardHeader label="HP" />)
		expect(screen.getByText('HP')).toBeInTheDocument()
	})

	it('renders icon when provided', () => {
		const { container } = render(
			<CardHeader label="HP" icon={<Favorite data-testid="test-icon" />} />,
		)
		expect(screen.getByTestId('test-icon')).toBeInTheDocument()
	})

	it('applies color to icon and label', () => {
		const testColor = '#ff0000'
		const { container } = render(
			<CardHeader label="HP" icon={<Favorite />} color={testColor} />,
		)
		const labelElement = screen.getByText('HP')
		expect(labelElement).toHaveStyle({ color: testColor })
	})

	it('renders without icon', () => {
		render(<CardHeader label="Test Label" />)
		expect(screen.getByText('Test Label')).toBeInTheDocument()
	})

	it('applies custom sx props', () => {
		const { container } = render(
			<CardHeader label="HP" sx={{ mb: 2 }} data-testid="header" />,
		)
		expect(screen.getByTestId('header')).toBeInTheDocument()
	})

	it('applies default color when not provided', () => {
		const { container } = render(<CardHeader label="HP" />)
		const labelElement = screen.getByText('HP')
		expect(labelElement).toHaveStyle({ color: '#9e9e9e' })
	})
})
