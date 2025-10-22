# Character Sheet Validation with react-hook-form

This document explains the validation approach used in the character sheet tool.

## Overview

The character sheet uses [react-hook-form](https://react-hook-form.com/) for form validation. This provides:

- **Type-safe validation** - Full TypeScript support with proper type inference
- **Performance** - Minimal re-renders by using uncontrolled components where possible
- **User-friendly feedback** - Immediate validation feedback with clear error messages
- **No wrapper components** - Direct integration with Material-UI components

## Architecture

### Helper Functions (`validation.ts`)

The validation system consists of three main parts:

1. **Validation Rules** - Reusable validation rule objects
2. **Helper Functions** - Functions that merge react-hook-form registration with MUI props
3. **Type-safe Exports** - All utilities are fully typed for TypeScript support

### Design Principles

1. **No Wrapper Components** - Use helper functions instead of wrapper components to keep the codebase simple and maintainable
2. **Minimal Overhead** - Each validated field requires only a few extra lines of code
3. **Consistent Patterns** - Same validation approach works across all field types
4. **Clear Error Messages** - User-friendly validation messages that help fix issues

## Usage Examples

### Example 1: Basic Text Field (PersonalTab)

For simple text fields with basic validation:

```tsx
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import { getTextFieldProps, validationRules } from '../../utils/validation'

function MyComponent() {
  const { register, formState: { errors } } = useForm({
    defaultValues: { name: '' },
    mode: 'onBlur', // Validate when user leaves field
  })

  return (
    <TextField
      {...getTextFieldProps(
        register('name', validationRules.name),
        errors.name
      )}
      variant="standard"
      label="Name"
      onBlur={(e) => {
        register('name').onBlur(e)
        // Update Redux state here
      }}
    />
  )
}
```

**Key Points:**
- `getTextFieldProps` merges registration with error display
- `validationRules.name` provides pre-defined validation
- Manual `onBlur` handler syncs with Redux state

### Example 2: Number Field with Controller (HpField)

For complex number fields with dynamic validation:

```tsx
import { useForm, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import { validationRules } from '../../utils/validation'

function MyComponent() {
  const { control } = useForm({
    defaultValues: { hp: 0 },
    mode: 'onChange', // Validate immediately for instant feedback
  })
  
  const maxHp = 100 // Dynamic max value

  return (
    <Controller
      name="hp"
      control={control}
      rules={{
        ...validationRules.hp,
        max: {
          value: maxHp,
          message: `Cannot exceed max HP (${maxHp})`,
        },
      }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          type="number"
          onChange={(e) => {
            const value = Number(e.target.value)
            field.onChange(value)
            // Update Redux state here
          }}
          error={!!fieldState.error}
          helperText={fieldState.error?.message || ''}
          label="Current HP"
        />
      )}
    />
  )
}
```

**Key Points:**
- `Controller` provides more control over the field behavior
- Dynamic validation rules can be added (like `max`)
- `fieldState.error` provides error information directly

## Available Validation Rules

### Pre-defined Rules

All rules are exported from `validation.ts`:

| Rule | Description | Constraints |
|------|-------------|-------------|
| `validationRules.required` | Field must have a value | - |
| `validationRules.name` | Character name validation | 1-50 characters, required |
| `validationRules.shortText` | Short text fields | Max 100 characters |
| `validationRules.positiveInteger` | Positive whole numbers | Min 0, must be integer |
| `validationRules.hp` | Hit point values | Min 0, must be number |
| `validationRules.age` | Age field | Max 20 characters |
| `validationRules.physicalMeasurement` | Height/weight | Max 30 characters |
| `validationRules.description` | Description field | Max 1000 characters |
| `validationRules.notes` | Notes field | Max 5000 characters |

### Custom Validation

You can create custom validation rules inline:

```tsx
<Controller
  name="myField"
  control={control}
  rules={{
    validate: (value) => {
      if (value < 0) return 'Must be positive'
      if (value > 100) return 'Must be 100 or less'
      return true
    }
  }}
  render={...}
/>
```

## Helper Functions

### `getTextFieldProps(registration, error)`

Merges react-hook-form registration with MUI TextField error display.

**Parameters:**
- `registration` - Return value from `register()`
- `error` - Field error from `formState.errors`

**Returns:** Props object to spread onto TextField

**Usage:**
```tsx
<TextField {...getTextFieldProps(register('name'), errors.name)} />
```

### `getNumberFieldProps(registration, error)`

Same as `getTextFieldProps` but adds `step: 1` for number inputs.

**Usage:**
```tsx
<TextField 
  {...getNumberFieldProps(register('count'), errors.count)}
  type="number"
/>
```

### `getSelectProps(registration, error)`

For MUI Select components (doesn't include helperText since Select doesn't support it).

**Usage:**
```tsx
<Select {...getSelectProps(register('option'), errors.option)}>
  <MenuItem value="a">Option A</MenuItem>
</Select>
```

## Validation Modes

react-hook-form supports different validation modes:

| Mode | Description | Use Case |
|------|-------------|----------|
| `onBlur` | Validate when field loses focus | Text fields where you don't want to interrupt typing |
| `onChange` | Validate immediately on change | Number fields where instant feedback is helpful |
| `onSubmit` | Validate only on form submit | Not typically used in character sheet |
| `all` | Validate on both blur and change | Not recommended (too aggressive) |

Set mode in `useForm`:
```tsx
const { register } = useForm({ mode: 'onBlur' })
```

## Form State Management

### Syncing with Redux

The character sheet uses Redux for global state. Validation state is local to the component:

```tsx
const { register, watch } = useForm({ defaultValues: { name: character.name }})
const formValues = watch()

// Sync to Redux on blur
<TextField
  {...getTextFieldProps(register('name'), errors.name)}
  onBlur={(e) => {
    register('name').onBlur(e) // Trigger validation
    dispatch(updateCharacter({ name: formValues.name })) // Sync to Redux
  }}
/>
```

### Resetting Form State

When loading a different character or external changes occur:

```tsx
const { reset } = useForm()

useEffect(() => {
  reset({ name: character.name })
}, [character.id, reset])
```

## Testing Validation

### Unit Tests

Validation utilities have comprehensive unit tests in `__tests__/validation.test.ts`:

```bash
npm test -- validation.test.ts
```

### Integration Tests

Existing integration tests verify that validated forms work correctly:

```bash
npm test -- character-sheet-functional.test.tsx
```

### Manual Testing

1. Start the dev server: `npm start`
2. Open character sheet
3. Test validation:
   - Leave required field empty
   - Enter text exceeding max length
   - Enter negative numbers in HP field
   - Verify error messages appear
   - Verify errors clear when fixed

## Common Patterns

### Pattern 1: Basic String Field

```tsx
<TextField
  {...getTextFieldProps(register('fieldName', validationRules.shortText), errors.fieldName)}
  variant="standard"
  onBlur={(e) => {
    register('fieldName').onBlur(e)
    updateCharacter({ fieldName: formValues.fieldName })
  }}
  label="Field Label"
/>
```

### Pattern 2: Number Field with Dynamic Max

```tsx
<Controller
  name="value"
  control={control}
  rules={{
    ...validationRules.positiveInteger,
    max: { value: dynamicMax, message: `Max is ${dynamicMax}` },
  }}
  render={({ field, fieldState }) => (
    <TextField
      {...field}
      type="number"
      onChange={(e) => {
        field.onChange(Number(e.target.value))
        updateCharacter({ value: Number(e.target.value) })
      }}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  )}
/>
```

### Pattern 3: Multiline Text

```tsx
<TextField
  {...getTextFieldProps(register('notes', validationRules.notes), errors.notes)}
  variant="standard"
  multiline
  minRows={3}
  maxRows={10}
  onBlur={(e) => {
    register('notes').onBlur(e)
    updateCharacter({ notes: formValues.notes })
  }}
/>
```

## Best Practices

1. **Use `onBlur` mode for text fields** - Don't interrupt the user while typing
2. **Use `onChange` mode for numbers** - Provide immediate feedback for invalid numbers
3. **Keep validation rules reusable** - Add new rules to `validationRules` object
4. **Provide clear error messages** - Tell the user exactly what's wrong and how to fix it
5. **Test edge cases** - Verify validation works with empty, min, max, and invalid values
6. **Sync form state properly** - Always reset form when character changes externally

## Troubleshooting

### Form values not updating

**Problem:** Field shows old value after character changes
**Solution:** Add `useEffect` hook to reset form when character changes

```tsx
useEffect(() => {
  reset({ fieldName: character.fieldName })
}, [character.id, reset])
```

### Validation not triggering

**Problem:** No error messages appear
**Solution:** Verify validation mode and check error object

```tsx
// Check errors object
console.log(errors)

// Ensure mode is set
const { register } = useForm({ mode: 'onBlur' })
```

### State not syncing to Redux

**Problem:** Changes in form don't save to Redux
**Solution:** Add `onBlur` handler to update Redux state

```tsx
onBlur={(e) => {
  register('name').onBlur(e)
  dispatch(updateCharacter({ name: formValues.name }))
}}
```

## Future Enhancements

Potential improvements to the validation system:

1. **Async validation** - Validate against server data (e.g., unique character names)
2. **Cross-field validation** - Rules that depend on multiple fields
3. **Conditional validation** - Different rules based on character state
4. **Custom error components** - More sophisticated error display
5. **Form-level error summary** - Show all errors in one place

## References

- [react-hook-form Documentation](https://react-hook-form.com/)
- [Material-UI Form Components](https://mui.com/material-ui/react-text-field/)
- [TypeScript with react-hook-form](https://react-hook-form.com/ts)
