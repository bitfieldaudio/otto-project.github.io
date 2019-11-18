/** @jsx jsx */
import { jsx } from 'theme-ui'
//import React from 'react'
//import PrismCodeBlock from '@theme-ui/prism'
import { Prism } from 'react-syntax-highlighter';
import theme from './theme.js'
import Blog from './components/blog'

const getLang = (className) => {
  var arr = className.match(/(?<=language-)\w+/) || [""];
  return arr[0];
};

export default {
  pre: ({ children }) => children,
  // Explicitly set an empty background, as this is otherwise set to white
  code: props => <Prism sx={ theme.prism }
                        style={{ "pre[class*=\"language-\"]": {background: "" } }}
                        showLineNumbers={ true }
                        language={ getLang(props.className) }
                        children={ props.children } />,
  Blog,
}
