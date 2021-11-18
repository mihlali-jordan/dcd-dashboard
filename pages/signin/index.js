// Components
import Image from 'next/image'
import { Button } from '@chakra-ui/react'

// Hooks
import { useForm } from 'react-hook-form'

// Utilities
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd.js'
import * as yup from 'yup'

import logo from '../../public/hollard-logo-purple.png'
import FormInput from '../../components/form/FormInput.js'

const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()

export default function SignIn() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: 'ukhuni@conciergedeskonline.com',
      password: 'abc123abc',
    },
  })

  const handleSignIn = values => {
    console.log(values)
  }

  return (
    <div
      className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 space-y-6"
      style={{ fontFamily: 'Antartida' }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image src={logo} alt="Hollard Logo" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary-default">
          Sign in to your account
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="sm:mx-auto sm:w-full sm:max-w-md space-y-3"
      >
        <FormInput name="email" control={control} errors={errors} />
        <FormInput
          name="password"
          control={control}
          errors={errors}
          type="password"
        />
        <Button
          type="submit"
          isFullWidth
          colorScheme="brand.secondary"
          variant="solid"
        >
          Sign In
        </Button>
      </form>
    </div>
  )
}
