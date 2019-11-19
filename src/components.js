/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Prism } from 'react-syntax-highlighter';

import theme from './theme.js'
import Blog from './components/blog'
import YouTube from './components/youtube'

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
export default {
  pre: ({ children }) => children,
  code: CodeHl,
  Blog,
  YouTube,
}
