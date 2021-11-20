import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react'
import { useController } from 'react-hook-form'

export default function FormInput({
  name,
  errors,
  control,
  label,
  ...otherProps
}) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    defaultValue: '',
  })
  return (
    <FormControl id={name} isInvalid={invalid}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Input
        _focus={{ borderColor: 'brand.tertiary.500' }}
        isInvalid={invalid}
        errorBorderColor="crimson"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        id={name}
        variant="filled"
        {...otherProps}
      />
      {invalid ? (
        <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
      ) : null}
    </FormControl>
  )
}
