import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { NameCard } from '../NameCard'

describe('NameCard', () => {
it('renders with name value', () => {
const mockOnChange = vi.fn()
const mockOnBlur = vi.fn()

render(
<NameCard
name="Test Character"
onChange={mockOnChange}
onBlur={mockOnBlur}
/>
)

const input = screen.getByDisplayValue('Test Character')
expect(input).toBeInTheDocument()
})

it('calls onChange when value changes', () => {
const mockOnChange = vi.fn()
const mockOnBlur = vi.fn()

render(
<NameCard
name="Test"
onChange={mockOnChange}
onBlur={mockOnBlur}
/>
)

const input = screen.getByDisplayValue('Test')
fireEvent.change(input, { target: { value: 'New Name' } })

expect(mockOnChange).toHaveBeenCalledWith('New Name')
})

it('calls onBlur when focus is lost', () => {
const mockOnChange = vi.fn()
const mockOnBlur = vi.fn()

render(
<NameCard
name="Test"
onChange={mockOnChange}
onBlur={mockOnBlur}
/>
)

const input = screen.getByDisplayValue('Test')
fireEvent.blur(input)

expect(mockOnBlur).toHaveBeenCalled()
})
})
