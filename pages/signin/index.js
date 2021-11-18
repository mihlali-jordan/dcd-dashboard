import Image from 'next/image'
import logo from '../../public/hollard-logo-purple.png'

export default function SignIn() {
  return (
    <div
      className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{ fontFamily: 'Antartida' }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image src={logo} alt="Hollard Logo" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
    </div>
  )
}
