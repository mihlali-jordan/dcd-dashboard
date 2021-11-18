import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from '@chakra-ui/react'
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
    <FormControl id={name}>
      <FormLabel>Email address</FormLabel>
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
      {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
    </FormControl>
    // <TextField
    //   margin="normal"
    //   error={invalid}
    //   autoFocus
    //   onChange={onChange}
    //   onBlur={onBlur}
    //   value={value}
    //   name={name}
    //   inputRef={ref}
    //   id={name}
    //   helperText={errors[name]?.message}
    //   {...otherProps}
    // />
  )
}
