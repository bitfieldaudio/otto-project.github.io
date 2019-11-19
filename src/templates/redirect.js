import React from 'react'

export default ({ pageContext: { to }}) => (<head><meta http-equiv="Refresh" content={`0; url=${to}`}/></head>)
