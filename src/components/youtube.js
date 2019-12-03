/** @jsx jsx */
import { jsx } from 'theme-ui'
import theme from '../theme.js'

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
  },
  ...theme.styles.YouTube
}

const YouTube = props => (<div sx={wrapperStyle}>
  <iframe title={props.videoId} width="100%" height="100%" src={"https://www.youtube.com/embed/" + props.videoId}
         frameborder="0"
         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen />
</div>)

export default YouTube
