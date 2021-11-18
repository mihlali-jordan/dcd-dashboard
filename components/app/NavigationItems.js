import React from 'react'

// Components
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'

// Icons
import {
  Dashboard as DashboardIcon,
  ShoppingCart as OrdersIcon,
  AccessTime as BookingsIcon,
  Storefront as ProductsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'

const navList = [
  { name: 'Dashboard', route: '/', icon: DashboardIcon },
  { name: 'Orders', route: '/orders', icon: OrdersIcon },
  { name: 'Bookings', route: '/bookings', icon: BookingsIcon },
  { name: 'Products', route: '/products', icon: ProductsIcon },
]

const actionList = [
  { name: 'Logout', action: () => {}, icon: LogoutIcon },
]

export const NavItems = (
  <div>
    {navList.map((navItem) => (
      <Link href={navItem.route} key={navItem.name}>
        <ListItem button>
          <ListItemIcon>
            <navItem.icon />
          </ListItemIcon>
          <ListItemText primary={navItem.name} />
        </ListItem>
      </Link>
    ))}
  </div>
)

export const ActionItems = (
  <div>
    {actionList.map((item) => (
      <ListItem button key={item.name} onClick={item.action}>
        <ListItemIcon>
          <item.icon />
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItem>
    ))}
  </div>
)
