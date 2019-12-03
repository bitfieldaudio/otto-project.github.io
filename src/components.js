/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Prism } from 'react-syntax-highlighter'

import theme from './theme.js'
import Blog from './components/blog'
import YouTube from './components/youtube'
import Icon from './components/Icon.js'

const getLang = (className) => {
  var arr = className.match(/(?<=language-)\w+/) || [""];
  return arr[0];
};

// Explicitly set an empty background, as this is otherwise set to white
const CodeHl = props => <Prism sx={ theme.prism }
                        style={{ "pre[class*=\"language-\"]": {background: "" } }}
                        showLineNumbers={ true }
                        language={ getLang(props.className) }
                        children={ props.children } />

const PatreonBadge = props => (
  <a href="https://www.patreon.com/bePatron?u=21164987" data-patreon-widget-type="become-patron-button">
    <img src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.herokuapp.com%2Fottosynthesizer&style=for-the-badge"/>
  </a>);

export default {
  pre: ({ children }) => children,
  code: CodeHl,
  Blog,
  YouTube,
  Icon,
  PatreonBadge
}
