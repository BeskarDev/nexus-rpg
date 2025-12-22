import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CharacterSheetCard } from '../CharacterSheetCard'
import { Menu } from '@mui/material'

describe('CharacterSheetCard', () => {
	it('renders children correctly', () => {
		render(
			<CharacterSheetCard>
				<div data-testid="test-child">Test Content</div>
			</CharacterSheetCard>,
		)
		expect(screen.getByTestId('test-child')).toBeInTheDocument()
	})

	it('displays header when provided', () => {
		render(
			<CharacterSheetCard header={<div data-testid="test-header">Header</div>}>
				<div>Content</div>
			</CharacterSheetCard>,
		)
		expect(screen.getByTestId('test-header')).toBeInTheDocument()
	})

	it('displays footer when provided', () => {
		render(
			<CharacterSheetCard footer={<div data-testid="test-footer">Footer</div>}>
				<div>Content</div>
			</CharacterSheetCard>,
		)
		expect(screen.getByTestId('test-footer')).toBeInTheDocument()
	})

	it('shows config button when showConfigButton is true', () => {
		const handleClick = vi.fn()
		render(
			<CharacterSheetCard
				showConfigButton
				onConfigClick={handleClick}
				data-testid="card"
			>
				<div>Content</div>
			</CharacterSheetCard>,
		)
		expect(screen.getByTestId('card-config-button')).toBeInTheDocument()
	})

	it('does not show config button when showConfigButton is false', () => {
		render(
			<CharacterSheetCard data-testid="card">
				<div>Content</div>
			</CharacterSheetCard>,
		)
		expect(screen.queryByTestId('card-config-button')).not.toBeInTheDocument()
	})

	it('calls onConfigClick when config button clicked', () => {
		const handleClick = vi.fn()
		render(
			<CharacterSheetCard
				showConfigButton
				onConfigClick={handleClick}
				data-testid="card"
			>
				<div>Content</div>
			</CharacterSheetCard>,
		)
		fireEvent.click(screen.getByTestId('card-config-button'))
		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('wraps in tooltip when tooltip prop provided', () => {
		render(
			<CharacterSheetCard tooltip="Test Tooltip">
				<div>Content</div>
			</CharacterSheetCard>,
		)
		// Tooltip rendering is handled by MUI, just verify no crash
		expect(screen.getByText('Content')).toBeInTheDocument()
	})

	it('applies custom sx props', () => {
		render(
			<CharacterSheetCard sx={{ backgroundColor: 'red' }} data-testid="card">
				<div>Content</div>
			</CharacterSheetCard>,
		)
		expect(screen.getByTestId('card')).toBeInTheDocument()
	})

	it('applies minWidth prop', () => {
		render(
			<CharacterSheetCard minWidth="10rem" data-testid="card">
				<div>Content</div>
			</CharacterSheetCard>,
		)
		const card = screen.getByTestId('card')
		expect(card).toHaveStyle({ minWidth: '10rem' })
	})

	it('applies maxWidth prop', () => {
		render(
			<CharacterSheetCard maxWidth="20rem" data-testid="card">
				<div>Content</div>
			</CharacterSheetCard>,
		)
		const card = screen.getByTestId('card')
		expect(card).toHaveStyle({ maxWidth: '20rem' })
	})

	it('applies custom border color', () => {
		const testColor = '#ff0000'
		render(
			<CharacterSheetCard borderColor={testColor} data-testid="card">
				<div>Content</div>
			</CharacterSheetCard>,
		)
		const card = screen.getByTestId('card')
		expect(card).toHaveStyle({ border: `1px solid ${testColor}` })
	})
})
