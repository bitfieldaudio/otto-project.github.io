/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Prism } from 'react-syntax-highlighter';
import ReactYouTube from 'react-youtube'

const opts = {
  width: '100%',
  height: '100%',
}

const wrapperStyle = {
  position: 'relative',
  paddingBottom: '56.25%',
  height: 0,
  iframe: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%'
  }
}

const YouTube = props => (<div sx={wrapperStyle}>
  <ReactYouTube opts={opts} {...props}/>
</div>)

export default YouTube
