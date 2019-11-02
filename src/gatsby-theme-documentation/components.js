import React from 'react'
 import PrismCodeBlock from '@theme-ui/prism'
// import { Prism } from 'react-syntax-highlighter';
// 
// const getLang = (className) => {
//   var arr = className.match(/(?<=language-)\w+/) || [""];
//   return arr[0];
// };

export default {
  pre: ({ children }) => <>{children}</>,
  code: props => <PrismCodeBlock className={ "line-numbers" } {...props} />
  // code: props => <Prism showLineNumbers={ true } language={ getLang(props.className) } children={ props.children } />
}
