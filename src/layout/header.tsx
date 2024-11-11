// 'use client'
'use server'

// ** REACT Imports
import { Suspense } from 'react'

// ** NEXT Imports
import dynamic from 'next/dynamic'

// ** COMPONENT Imports
import MainNav from '#/layout/ui/main-nav'
import UserButtonNextAuth from '#/layout/ui/user-button'
// const UserButtonNextAuth = dynamic(() => import('#/layout/ui/user-button'), { ssr: false })
// const UserButtonNextAuth = dynamic(() => import('#/layout/ui/user-button'), { })
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { LayoutDashboard } from 'lucide-react'

// ** RADIX-UI Imports
import {
  Grid,
  Flex,
  Container,
  Button,
} from '@radix-ui/themes'

// ** RETURN JSX
export default async function Header() {
  return (
    <Suspense fallback={null}>
      <Flex
        id='ThreeDAppHeader'
        className='flex'
        display='inline-flex'
        // direction='row'
        // width='100%'
        // style={{
        //   display: 'inline-flex',
        //   flexDirection: 'row',
        // }}
      >
        <Flex
          // className='flex'
          // justify='start'
          // flexGrow='1'
          style={{
            flexGrow: 1,
          }}
        >
          {/* HEY HEY HEY */}
          <MainNav />
        </Flex>
        <Flex
          // className='flex'
          // justify='end'
          // flexGrow='0'
          style={{
            flexGrow: 0,
            marginTop: 8,
            marginRight: 8,
          }}
        >
          {/* YO YO YO */}
            
            {/* <UserButtonNextAuth /> */}

            {/* <SignedOut>
              <SignInButton mode='modal'>
                <Button 
                  className='
                    rounded 
                    border 
                    border-black 
                    bg-black 
                    px-2 
                    py-0.5 
                    text-xs 
                    text-white 
                    transition-colors 
                    hover:bg-black 
                    hover:text-gray
                  '
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label='Dashboard'
                    labelIcon={<LayoutDashboard className='h-6 w-6' />}
                    href='/'
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn> */}

        </Flex>
      </Flex>
    </Suspense>
  )
}
