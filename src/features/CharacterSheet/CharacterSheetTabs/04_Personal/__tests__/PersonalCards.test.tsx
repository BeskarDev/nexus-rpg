import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { HeightCard, WeightCard, AgeCard, DescriptionCard } from '../PersonalCards'

describe('PersonalCards', () => {
describe('HeightCard', () => {
it('renders and is editable', () => {
const mockOnChange = vi.fn()
const mockOnBlur = vi.fn()

render(
<HeightCard
value="5'10"
onChange={mockOnChange}
onBlur={mockOnBlur}
/>
)

const input = screen.getByDisplayValue("5'10")
expect(input).toBeInTheDocument()

fireEvent.change(input, { target: { value: "6'2" } })
expect(mockOnChange).toHaveBeenCalledWith("6'2")
})
})

describe('WeightCard', () => {
it('renders and is editable', () => {
const mockOnChange = vi.fn()
const mockOnBlur = vi.fn()

render(
<WeightCard
value="180 lbs"
onChange={mockOnChange}
onBlur={mockOnBlur}
/>
)

const input = screen.getByDisplayValue("180 lbs")
expect(input).toBeInTheDocument()

fireEvent.change(input, { target: { value: "200 lbs" } })
expect(mockOnChange).toHaveBeenCalledWith("200 lbs")
})
})

describe('AgeCard', () => {
it('renders and is editable', () => {
const mockOnChange = vi.fn()
const mockOnBlur = vi.fn()

render(
<AgeCard
value="25"
onChange={mockOnChange}
onBlur={mockOnBlur}
/>
)

const input = screen.getByDisplayValue("25")
expect(input).toBeInTheDocument()

fireEvent.change(input, { target: { value: "30" } })
expect(mockOnChange).toHaveBeenCalledWith("30")
})
})

describe('DescriptionCard', () => {
it('renders as multiline and is editable', () => {
const mockOnChange = vi.fn()
const mockOnBlur = vi.fn()

render(
<DescriptionCard
value="Tall warrior"
onChange={mockOnChange}
onBlur={mockOnBlur}
/>
)

const textarea = screen.getByDisplayValue("Tall warrior")
expect(textarea).toBeInTheDocument()
expect(textarea.tagName).toBe('TEXTAREA')

fireEvent.change(textarea, { target: { value: "Tall warrior with sword" } })
expect(mockOnChange).toHaveBeenCalledWith("Tall warrior with sword")
})
})
})
