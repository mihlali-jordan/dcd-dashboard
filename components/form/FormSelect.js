import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react'
import { useController } from 'react-hook-form'

export default function FormSelect({
  name,
  errors,
  control,
  label,
  options,
  ...otherProps
}) {
  const {
    field: { onChange, onBlur, value },
    formState: { invalid },
  } = useController({ name, control })

  return (
    <FormControl id={name} isInvalid={invalid}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Select
        variant="filled"
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        {...otherProps}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}
