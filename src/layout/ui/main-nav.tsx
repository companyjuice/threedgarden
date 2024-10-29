// 'use client'
// 'use server'
// ^^ does this file require client or server pragma ???

// ** UI Imports
import {
  Container,
  Grid,
  Flex,
  Text,
  Button,
} from '@radix-ui/themes'

import Image from 'next/image'

import { cn } from '#//lib/utils/tailwind-utils'
import CustomLink from './custom-link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './navigation-menu'
import React from 'react'
// import { Button } from './button'

export default function MainNav() {
  return (
    <>
    <Flex
      // direction='row'
      // justify='between'
      // gap='2'
      // align='start'
      // className='
      //   m-0
      // '
      style={{
        display: 'inline-flex',
        marginLeft: '2px',
      }}
    >
      <Flex
        align='center'
        style={{
          display: 'inline-flex',
          flexGrow: '0',
          alignItems: 'center'
        }}
      >
        <CustomLink href='/#home'>
          <Image 
            src='/favicon/favicon.png' 
            priority={true} 
            alt='Home' 
            width='32' 
            height='32' 
          />
        </CustomLink>
        <CustomLink href='/#threedgarden' 
          style={{
            color: '#DDDDDD',
            textDecoration: 'none',
            marginLeft: '4px',
          }}
        >
          ThreeD Garden
        </CustomLink>
      </Flex>
      
      <Flex
        // justify={'between'}
        // gap={'2'}
        // align={'center'}
        style={{
          flexGrow: '1'
        }}
      >
        <NavigationMenu>
          <NavigationMenuList>
        
            <NavigationMenuItem>
              <NavigationMenuLink
                href='/participate'
                className={navigationMenuTriggerStyle()}
                style={{
                  // backgroundColor: '#222222', 
                  color: '#DDDDDD',
                  textDecoration: 'none',
                  // borderWidth: 0,
                  // margin: 0,
                  // padding: 0,
                  fontSize: 12,
                }}
              >
                Demo: 1
              </NavigationMenuLink>
            </NavigationMenuItem>
        
            <NavigationMenuItem>
              <NavigationMenuLink
                href='/home-design'
                className={navigationMenuTriggerStyle()}
                style={{
                  // backgroundColor: '#222222', 
                  color: '#DDDDDD',
                  textDecoration: 'none',
                  // borderWidth: 0,
                  // margin: 0,
                  // padding: 0,
                  fontSize: 12,
                }}
              >
                Demo: 2
              </NavigationMenuLink>
            </NavigationMenuItem>

            
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                style={{
                  backgroundColor: '#222222',
                  color: '#DDDDDD', 
                  borderWidth: 0,
                  textDecoration: 'none',
                }}
              >
                <CustomLink href='/participate' 
                  style={{
                  // backgroundColor: '#222222',
                    color: '#DDDDDD', 
                    textDecoration: 'none',
                  }}
                >
                  Participate
                </CustomLink>
              </NavigationMenuTrigger>
              <NavigationMenuContent 
                style={{
                  backgroundColor: '#222222',
                  color: '#DDDDDD', 
                  // listStyleType: 'none'
                  textDecoration: 'none',
                }}
              >
                <ul 
                  className='
                    grid 
                    gap-0 
                    p-1
                    md:w-[400px] 
                    lg:w-[500px] 
                    lg:grid-cols-[.75fr_1fr]
                  '
                  style={{
                    listStyleType: 'none',
                    textDecoration: 'none',
                  }}
                >
                  <ListItem href='/home' title='Home'>
                    Go to the home page of this app.
                  </ListItem>
                  <ListItem href='/participate' title='Participate'>
                    Use the ThreeD Garden user interface.
                  </ListItem>
                  <ListItem href='/page' title='About Page'>
                    Read more about this project's pages.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {/*
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                style={{
                  // backgroundColor: '#222222', 
                  color: '#DDDDDD', 
                  borderWidth: 0,
                }}
              >
                <CustomLink href='/server-example' 
                  style={{
                    color: '#DDDDDD', 
                    textDecoration: 'none',
                  }}
                >
                  Server
                </CustomLink>
              </NavigationMenuTrigger>
              <NavigationMenuContent 
                style={{
                  // backgroundColor: '#222222', 
                  color: '#DDDDDD', 
                  // listStyleType: 'none'
                }}
              >
              <ul 
                className='
                  grid 
                  gap-0 
                  p-1
                  md:w-[400px] 
                  lg:w-[500px] 
                  lg:grid-cols-[.75fr_1fr]
                '
                style={{
                  listStyleType: 'none',
                }}  
              >
                  <ListItem href='/server-example' title='RSC Example'>
                    Protecting React Server Component.
                  </ListItem>
                  <ListItem href='/middleware-example' title='Middleware Example'>
                    Using Middleware to protect pages & APIs.
                  </ListItem>
                  <ListItem href='/api-example' title='Route Handler Example'>
                    Getting the session inside an API Route.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger 
                style={{
                  // backgroundColor: '#222222', 
                  color: '#DDDDDD', 
                  borderWidth: 0,
                }}
              >
                <CustomLink href='/client-example' 
                  style={{
                    color: '#DDDDDD', 
                    textDecoration: 'none',
                  }}
                >
                  Client
                </CustomLink>
              </NavigationMenuTrigger>
              <NavigationMenuContent 
                style={{
                  // backgroundColor: '#222222', 
                  color: '#DDDDDD', 
                  // listStyleType: 'none'
                }}
              >
                <ul 
                  className='
                    grid 
                    gap-0 
                    p-1
                    md:w-[400px] 
                    lg:w-[500px] 
                    lg:grid-cols-[.75fr_1fr]
                  '
                  style={{
                    listStyleType: 'none',
                  }}
                >
                  <ListItem href='/participate' title='ThreeD Garden: Participate'>
                    Participate
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            */}

          </NavigationMenuList>
        </NavigationMenu>
      </Flex>

    </Flex>
    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li
      className='
        p-2
      '
    >
      {/* <NavigationMenuLink> */}
        <div 
          className='
            p-2
            text-sm 
            font-medium 
            leading-none
          '
        >
          <a
            ref={ref}
            className={cn(
              // 'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            {title}
          </a>
        </div>
        <div
          className='
            p-2
            text-sm 
            leading-snug 
            line-clamp-2 
            text-muted-foreground
          '
        >
          {children}
        </div>
        
      {/* </NavigationMenuLink> */}
    </li>
  )
})
ListItem.displayName = 'ListItem'