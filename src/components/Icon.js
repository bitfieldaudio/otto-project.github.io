/* eslint-disable react/forbid-prop-types */
import React from 'react'
import styled from 'styled-components'
import { any, string } from 'prop-types'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBars, faSpinner } from '@fortawesome/free-solid-svg-icons'

// By setting things up like this react-fontawesome knows of the icons
// I am also only using these icons from the libraries so less overhead.
library.add(
  fab,
  faBars
)

const UnstyledIcon = props => <FontAwesomeIcon {...props} />

export const StyledIcon = styled(UnstyledIcon)`
  color: ${({ nav, theme }) =>
    nav === 'true' ? theme.colors.alt : theme.colors.secondary};
  font-size: 1.75rem;
  margin: 0 0.5rem;
  :hover {
    color: yellow;
  }
  @media (min-width: ${({ theme }) => theme.screen.large}) {
    font-size: 2em;
  }
`

StyledIcon.propTypes = {
  nav: string
}

const SiteIcon = ({ nav, icon, size }) => (
  <UnstyledIcon nav={nav} icon={icon} size={size} />
)

SiteIcon.propTypes = {
  nav: string,
  icon: any,
  size: string
}

const StyledLoader = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Loading = () => (
  <StyledLoader>
    <FontAwesomeIcon icon={faSpinner} size="3x" spin />
  </StyledLoader>
)

export { Loading }
export default SiteIcon
