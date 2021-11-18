import React from 'react'
import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

export default function FormInput({ name, errors, control, ...otherProps }) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    defaultValue: '',
  })
  return (
    <TextField
      margin="normal"
      error={invalid}
      autoFocus
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      inputRef={ref}
      id={name}
      helperText={errors[name]?.message}
      {...otherProps}
    />
  )
}
