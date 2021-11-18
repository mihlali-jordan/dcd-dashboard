import React from 'react'
import Link from 'next/link'

const navList = [
  { name: 'Dashboard', route: '/' },
  { name: 'Orders', route: '/orders' },
  { name: 'Bookings', route: '/bookings' },
  { name: 'Products', route: '/products' },
]

// const actionList = [{ name: 'Logout', action: () => {} }]

export default function Layout({ children }) {
  return (
    <div>
      {navList.map(link => (
        <Link href={link.route} key={link.name}>
          {link.name}
        </Link>
      ))}
      <main>{children}</main>
    </div>
  )
}
