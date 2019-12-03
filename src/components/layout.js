/** @jsx jsx */
import { useState, useRef } from 'react'
import { Global } from '@emotion/core'
import { Styled, Layout, Main, Container, jsx, useThemeUI } from 'theme-ui'

import Header from './header'
import Sidenav from './sidenav'

export default ({ children }) => {
  const { theme: { colors = {} } } = useThemeUI()
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = useRef(null)

  const bodyStyles = {
    body: {
      margin: 0,
      color: colors.text,
      backgroundColor: colors.background
    }
  }

  return (
    <Styled.root>
      <Global styles={bodyStyles} />
      <Layout>
        <Header nav={nav} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Main>
            <div
              ref={nav}
              sx={{
                display: ['block', 'block', 'flex'],
                justifyContent: "center",
                alignItems: "space-around",
                //mx: -3,
              }}
            >
              <div
                sx={{
                  display: [null, null, 'block'],
                  flex: "0 0 256px",
                  width: "256px"
                }}>
                <Sidenav
                  open={menuOpen}
                  onFocus={() => setMenuOpen(true)}
                  onBlur={() => setMenuOpen(false)}
                  onClick={() => setMenuOpen(false)}
                />
              </div>
              <div
                sx={{
                  overflow: 'hidden',
                  px: 3,
                  flex: "0 1 auto",
                  //width: '100%',
                }}
              >
                <Container py={0} px={3} sx={{
                  }}>
                  <div sx={{ width: '10000px' }}/>
                  {children}
                </Container>
              </div>
              <div sx={{
                display: 'none',
                display: ['none', 'none', 'none', 'block'],
                flex: "0 1 256px",
                width: 256,
              }}/>
            </div>
        </Main>
      </Layout>
    </Styled.root>
  )
}
