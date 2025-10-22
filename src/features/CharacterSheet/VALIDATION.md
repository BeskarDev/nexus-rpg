# Character Sheet Validation

This document describes the validation approach used in the Character Sheet feature, which leverages `react-hook-form` for form validation.

## Overview

The Character Sheet uses `react-hook-form` for input validation across all editable fields. This provides:
- **Immediate feedback** to users about invalid inputs
- **Consistent validation rules** across all fields
- **Accessible error messages** for screen readers
- **Minimal code overhead** through reusable helper functions

## Key Principles

1. **No wrapper components**: We use helper functions instead of wrapper components to keep the code clean and maintainable
2. **MUI integration**: Validation is integrated directly with Material-UI component props (`error`, `helperText`, etc.)
3. **Progressive validation**: Validation typically occurs `onBlur` to avoid interrupting the user while typing
4. **Declarative rules**: Validation rules are defined declaratively using the `validationRules` helper

## Core Utilities

All validation utilities are located in `src/features/CharacterSheet/utils/formValidation.ts` and exported from the utils index.

### Helper Functions

#### `getTextFieldProps(registration, error)`

Converts react-hook-form registration to MUI TextField props.

```tsx
import { useForm } from 'react-hook-form'
import { getTextFieldProps, validationRules } from '../../utils'

const { register, formState: { errors } } = useForm()

<TextField
  {...getTextFieldProps(
    register('name', validationRules.required('Name')),
    errors.name
  )}
  label="Name"
/>
```

#### `getSelectProps(registration, error)`

Same as `getTextFieldProps` but optimized for Select components.

```tsx
<TextField
  select
  {...getSelectProps(
    register('folk', validationRules.stringLength(undefined, 50)),
    errors.folk
  )}
  label="Folk"
>
  <MenuItem value="human">Human</MenuItem>
  <MenuItem value="elf">Elf</MenuItem>
</TextField>
```

### Validation Rules

The `validationRules` object provides common validation patterns:

#### `required(fieldName?)`

Makes a field required.

```tsx
register('name', validationRules.required('Name'))
// Error: "Name is required"
```

#### `numberRange(min, max, fieldName?)`

Validates numeric input within a range.

```tsx
register('resolve', validationRules.numberRange(0, 3, 'Resolve'))
// Error: "Resolve must be at least 0" or "Resolve must be at most 3"
```

#### `stringLength(minLength?, maxLength?, fieldName?)`

Validates string length.

```tsx
register('name', validationRules.stringLength(1, 100, 'Name'))
// Error: "Name must be at least 1 characters" or "Name must be at most 100 characters"
```

#### `pattern(regex, message)`

Validates against a regular expression.

```tsx
register('email', validationRules.pattern(/^\S+@\S+$/, 'Invalid email format'))
// Error: "Invalid email format"
```

#### `combine(...rules)`

Combines multiple validation rules.

```tsx
register('name', validationRules.combine(
  validationRules.required('Name'),
  validationRules.stringLength(1, 100, 'Name')
))
```

## Implementation Examples

### Example 1: Text Input with Validation (StatisticsTab)

```tsx
import { useForm } from 'react-hook-form'
import { getTextFieldProps, validationRules } from '../../utils'

export const StatisticsTab: React.FC = () => {
  const { register, formState: { errors }, setValue } = useForm({
    mode: 'onBlur',
    defaultValues: {
      resolve: character.statistics.resolve,
    },
  })

  // Sync form with character data
  React.useEffect(() => {
    setValue('resolve', character.statistics.resolve)
  }, [character.statistics.resolve, setValue])

  return (
    <RoundTextField
      type="number"
      {...getTextFieldProps(
        register('resolve', {
          ...validationRules.numberRange(0, 3, 'Resolve'),
          onChange: (event) => {
            const value = Number(event.target.value)
            if (value >= 0 && value <= 3) {
              updateCharacter({ statistics: { resolve: value } })
            }
          },
        }),
        errors.resolve,
      )}
      value={character.statistics.resolve}
      label="Resolve"
    />
  )
}
```

### Example 2: Select Input with Validation (AttributeColumn)

```tsx
import { useForm } from 'react-hook-form'
import { getSelectProps, validationRules } from '../../utils'

export const AttributeColumn: React.FC = ({ attribute, updateAttribute }) => {
  const { register, formState: { errors }, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
      attributeValue: attribute.value,
    },
  })

  React.useEffect(() => {
    setValue('attributeValue', attribute.value)
  }, [attribute.value, setValue])

  return (
    <AttributeField
      select
      {...getSelectProps(
        register('attributeValue', {
          ...validationRules.required('Attribute'),
          onChange: (event) => {
            updateAttribute({ value: Number(event.target.value) })
          },
        }),
        errors.attributeValue,
      )}
      value={attribute.value}
      label="Strength"
    >
      {attributeTypeArray.map((at) => (
        <MenuItem key={at} value={at}>d{at}</MenuItem>
      ))}
    </AttributeField>
  )
}
```

### Example 3: Text Field with Multiple Validations (PersonalTab)

```tsx
import { useForm } from 'react-hook-form'
import { getTextFieldProps, validationRules } from '../../utils'

export const PersonalTab: React.FC = () => {
  const { register, formState: { errors }, setValue } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: character.personal.name,
    },
  })

  React.useEffect(() => {
    setValue('name', character.personal.name)
  }, [character.personal.name, setValue])

  return (
    <PersonalField
      {...getTextFieldProps(
        register('name', {
          ...validationRules.combine(
            validationRules.required('Name'),
            validationRules.stringLength(1, 100, 'Name'),
          ),
          onChange: (event) => {
            setPersonal((p) => ({ ...p, name: event.target.value }))
          },
        }),
        errors.name,
      )}
      value={character.personal.name}
      label="Name"
    />
  )
}
```

## Best Practices

1. **Validation Mode**: Use `mode: 'onBlur'` for most fields to avoid interrupting the user while typing. Use `mode: 'onChange'` for fields that need immediate feedback (like selects).

2. **Sync with Character Data**: Always sync the form state with character data using `useEffect` and `setValue`:
   ```tsx
   React.useEffect(() => {
     setValue('fieldName', character.fieldValue)
   }, [character.fieldValue, setValue])
   ```

3. **Preserve Existing Behavior**: When adding validation, preserve the existing `onChange` and `onBlur` handlers:
   ```tsx
   register('field', {
     ...validationRules.required(),
     onChange: (event) => {
       // Existing update logic
       updateCharacter({ field: event.target.value })
     },
   })
   ```

4. **Error Messages**: Provide clear, user-friendly error messages by including field names in validation rules:
   ```tsx
   validationRules.required('Character Name')
   // Better than: validationRules.required()
   ```

5. **Value Spreading**: When spreading validation props, make sure the `value` prop comes after to ensure controlled component behavior:
   ```tsx
   <TextField
     {...getTextFieldProps(register('field'), errors.field)}
     value={actualValue}  // This overrides the registered value
   />
   ```

## Testing

Validation utilities are tested in `src/features/CharacterSheet/utils/__tests__/formValidation.test.ts`. When adding new validation rules, add corresponding tests.

Example test:
```tsx
import { validationRules } from '../formValidation'

it('should validate number range', () => {
  const rule = validationRules.numberRange(0, 3, 'Resolve')
  
  expect(rule.min.value).toBe(0)
  expect(rule.min.message).toBe('Resolve must be at least 0')
  expect(rule.max.value).toBe(3)
  expect(rule.max.message).toBe('Resolve must be at most 3')
})
```

## Migration Guide

To add validation to an existing field:

1. Import required utilities:
   ```tsx
   import { useForm } from 'react-hook-form'
   import { getTextFieldProps, validationRules } from '../../utils'
   ```

2. Initialize `useForm` in your component:
   ```tsx
   const { register, formState: { errors }, setValue } = useForm({
     mode: 'onBlur',
     defaultValues: { fieldName: initialValue },
   })
   ```

3. Add effect to sync with character data:
   ```tsx
   React.useEffect(() => {
     setValue('fieldName', character.fieldValue)
   }, [character.fieldValue, setValue])
   ```

4. Spread validation props on the input:
   ```tsx
   <TextField
     {...getTextFieldProps(
       register('fieldName', validationRules.required()),
       errors.fieldName
     )}
     // ... rest of props
   />
   ```

## Accessibility

The validation system is designed with accessibility in mind:
- Error messages are associated with inputs using `aria-describedby`
- Error state is communicated using `aria-invalid`
- Screen readers announce validation errors when they appear
- Error messages use clear, understandable language

## Future Enhancements

Potential improvements to consider:
- Server-side validation integration
- Custom validation rule builders for complex game rules
- Form-level validation for cross-field dependencies
- Async validation for checking name uniqueness
- Validation state persistence across page reloads
