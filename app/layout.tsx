// ==============================================================
// RESOURCES
// ** FOR ENTIRE APP CONTEXTS

'use client'

// ** Next
// import { useRouter, usePathname } from 'next/navigation'

// ** React
import type { ReactNode } from 'react'
// import { useEffect } from 'react'

// ** Apollo Client -- State Management using Cache/Store (via GraphQL)
import { ApolloProvider } from '@apollo/client'
import { client } from '#/lib/api/graphql/client'

// ** Redux Store
import { Provider as ReduxProvider } from 'react-redux'
import { store as reduxStore } from '#/lib/stores/redux'

// ** Contexts for User Authorization + Settings
import { AuthProvider } from '#/lib/contexts/AuthContext'

// ** User Authorization Hook
import { useAuth } from '#/lib/auth/hooks/useAuth'

// ** User Authorization Guards/Boundaries (~CORE Components)
import AuthGuard from '#/ui/auth/AuthGuard'
// import GuestGuard from '#/ui/auth/GuestGuard'
// import AclGuard from '#/ui/auth/AclGuard'

// ** @Fake-DB (axios mock adapter)
import '#/lib/api/@fake-db'

// ** Contexts for Theme Settings + MUI Components
// import { MaterialUIControllerProvider, useMaterialUIController, setMiniSidenav, setOpenConfigurator } from '#/lib/contexts'
import { SettingsProvider, SettingsConsumer } from '#/lib/contexts/settingsContext'
import ThemeRegistry from '#/ui/theme/ThemeRegistry'

// ** Configs
import '#/lib/config/i18n' // NOT YET SUPPORTED IN NEXT 13
import { defaultACLObj } from '#/lib/config/acl'
// import themeConfig from '#/lib/config/themeConfig'

// ** Layouts
import BlankLayout from '#/ui/layouts/BlankLayout' // this is your login layout
import UserLayout from '#/ui/layouts/UserLayout' // this is your user-authorized layout
import MainLayout from '#/ui/layouts/MainLayout' // this is your default layout

// ** Helper Components
import Spinner from '#/ui/components/spinner'

// ** CSS Styles
import '#/ui/styles/globals.css'
// import stylesGlobal from '#/ui/styles/globals.module.css'
// import stylesDemo from '#/ui/styles/demo/demo.module.css'
import '#/lib/threed/styles/index.css'

// ** Colorful Console Messages: Utility
import ccm from '#/lib/utils/console-colors'

// ==============================================================
// IMPORTS COMPLETE
// console.debug('%c=======================================', ccm.black)
console.debug('%c🥕 ThreeDGarden<FC,R3F>: {layout.tsx}', ccm.green)
// console.debug('%c=======================================', ccm.black)

// ==============================================================
// MAIN APP

// provide basic React Provider context node with props.children
// const ThreeDAppProvider: FC<{ children?: ReactNode }> = (props) => {
const ThreeDAppProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  // const { children } = props
  return (
    <html lang="en">
      <head />
      <body>
        <main id="ThreeDAppProvider">
          {children}
        </main>
      </body>
    </html>
  )
}

// ==============================================================
// ** Security Guard

const AuthConsumer = ({ children, authGuard, guestGuard }: any) => {
  if (!guestGuard && !authGuard) {
    console.debug('%c📛 noGuard loading...', ccm.red)
    // console.debug('%c=======================================', ccm.black)
    return (
      <>{children}</>
    )
  }
  else if (authGuard) {
    console.debug('%c🔱 authGuard loading...', ccm.red)
    // console.debug('%c=======================================', ccm.black)
    return (
      // <AuthGuard fallback={<Spinner />}>
      <>{children}</>
      // </AuthGuard>
    )
  }
  else if (guestGuard) {
    console.debug('%c⚜ guestGuard loading...', ccm.red)
    // console.debug('%c=======================================', ccm.black)
    return (
      // <GuestGuard fallback={<Spinner />}>
      //   <>{children}</>
      // </GuestGuard>
      // <AuthGuard fallback={<Spinner />}>
        <>{children}</>
      // </AuthGuard>
    )
  }
  else {
    console.debug('%c🔱 authGuard loading (by default)...', ccm.red)
    // console.debug('%c=======================================', ccm.black)
    return (
      // <AuthGuard fallback={<Spinner />}>
        <>{children}</>
      // </AuthGuard>
    )
  }
}

// ==============================================================
// ** Construct App using Function Component (Functional Noun)

// const App = (props: any) => {
// const App: FC<AppPropsWithLayoutEmotion> = (props: AppPropsWithLayoutEmotion) => {
// const App: NextComponentType<AppContext, AppInitialProps, AppPropsWithLayoutEmotion> = (props: any) => {
// const App: NextComponentType<AppContext, AppInitialProps, AppPropsWithLayout> = (props: any) => {
const AppLayout = ({ children }: { children: any }): JSX.Element => {
  // **
  // console.debug('AppLayout.children', children)

  // ** Props.children.props
  // const { props } = children

  // ** Hooks
  const auth = useAuth()

  // console.debug('%c🥕 auth', ccm.orange, auth)
  // console.debug('%c🥕 router', ccm.orange, router)
  // console.debug('%c🥕 children', ccm.orange, children)
  // console.debug('%c=======================================', ccm.black)

  // // destructure props for vars
  // // const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  // const { Component, pageProps } = props
  const Component = {
    getLayout: () => {},
    setConfig: () => {},
    authGuard: true,
    guestGuard: false,
    // acl: defaultACLObj
    acl: {
      action: 'manage',
      subject: 'all',
    },
  }

  // console.debug('%c🥕 props', ccm.orange, props)
  // console.debug('%c🥕 Component', ccm.black, Component)
  // console.debug('%c🥕 pageProps', ccm.black, pageProps)

  // ** PageComponent.Properties
  const getLayout = ({ children }: { children: any }): JSX.Element => {
    //
    // console.debug('getLayout.children', children)

    const { props } = children

    // authorized: UserLayout
    if ((auth.user && auth.user.role) ||
      (props.childProp.segment !== '' && props.childProp.segment !== 'auth')) {
      return (
        <div id='ThreeDAppLayout-UserLayout'>
          <UserLayout>
            {children}
          </UserLayout>
        </div>
      )
    }

    // default: BlankLayout
    else {
      return (
        <div id='ThreeDAppLayout-BlankLayout'>
          <BlankLayout>
            {children}
          </BlankLayout>
        </div>
      )
    }
  }
  const { setConfig, authGuard, guestGuard, acl } = Component // .setConfig ?? false
  // const authGuard = Component.authGuard ?? true
  // const guestGuard = Component.guestGuard ?? false
  // const acl = Component.acl ?? defaultACLObj

  // ** Return JSX
  return (
    <ThreeDAppProvider>
      <AuthProvider>
        <AuthConsumer authGuard={authGuard} guestGuard={guestGuard}>
          {/* <AclGuard aclAbilities={acl} guestGuard={guestGuard}> */}
            <ApolloProvider client={client}>
              <ReduxProvider store={reduxStore}>
                <SettingsProvider { ...(setConfig ? { pageSettings: setConfig() } : { pageSettings: null }) }>
                  <SettingsConsumer>
                    {({ settings }) => (
                      <ThemeRegistry settings={settings}>
                        {children}
                        {/* {
                          getLayout(
                            // <EthApp {...props}>
                              // <Component {...pageProps} />
                              {children}
                            // </EthApp>
                          )
                        } */}
                      </ThemeRegistry>
                    )}
                  </SettingsConsumer>
                </SettingsProvider>
              </ReduxProvider>
            </ApolloProvider>
          {/* </AclGuard> */}
        </AuthConsumer>
      </AuthProvider>
    </ThreeDAppProvider>
  )
}

export default AppLayout
