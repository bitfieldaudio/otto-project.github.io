const heading = {
  fontFamily: 'heading',
  fontWeight: 'heading',
  lineHeight: 'heading',
  color: 'heading',
  a: {
    color: 'inherit',
    textDecoration: 'none'
  }
}

export default {
  initialColorMode: 'light',
  colors: {
    text: '#3b454e',
    background: '#fff',
    primary: '#E53D34',
    secondary: '#119',
    muted: 'rgb(245, 247, 249)',
    mutedText: 'rgb(193, 199, 205)',
    highlight: '#ffffcc',
    gray: '#777',
    purple: '#705',
    heading: 'rgb(36, 42, 49)',
    modes: {
      dark: {
        text: '#d8d8d8',
        background: '#060606',
        primary: '#e8524a',
        secondary: '#e0f',
        muted: '#191919',
        mutedText: '#4a4a4a',
        highlight: '#ffffcc',
        gray: '#999',
        purple: '#f6c',
        heading: '#f1f1f1',
      },
    },
  },
  fonts: {
    body: 'Content-font, Roboto, sans-serif',
    heading: 'inherit',
    monospace: '"Source Code Pro", Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: '400',
    heading: '700',
  },
  lineHeights: {
    body: 1.625,
    heading: 1.25,
    code: 1.3,
  },
  textStyles: {
    heading,
    display: {
      variant: 'textStyles.heading',
      fontSize: [3, 5, 6],
      color: 'heading',
      mt: 3,
    },
  },
  styles: {
    Container: {
      p: 3,
      maxWidth: 1024,
      "&.content": {
        maxWidth: 750,
      },
    },
    YouTube: {
      borderRadius: '4px',
      overflow: 'hidden',
    },
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      variant: 'textStyles.display',
    },
    h2: {
      variant: 'textStyles.heading',
      fontSize: 4,
    },
    h3: {
      variant: 'textStyles.heading',
      fontSize: 3,
    },
    h4: {
      variant: 'textStyles.heading',
      fontSize: 2,
    },
    h5: {
      variant: 'textStyles.heading',
      fontSize: 2,
    },
    h6: {
      variant: 'textStyles.heading',
      fontSize: 1,
    },
    a: {
      color: 'primary',
      textDecoration: 'none',
      '&:hover': {
        color: 'secondary',
      },
    },
    pre: {
      variant: 'prism',
    },
    code: {
      fontFamily: 'monospace',
      color: 'text',
      fontSize: 1,
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'text',
      bg: 'muted',
      fontSize: 1,
      py: '3px',
      px: '6px',
      mx: '1px',
      borderRadius: '3px',
    },
    table: {
      width: '100%',
      my: 4,
      borderCollapse: 'separate',
      borderSpacing: 0,
      [['th', 'td']]: {
        textAlign: 'left',
        py: '4px',
        pr: '4px',
        pl: 0,
        borderColor: 'muted',
        borderBottomStyle: 'solid',
      },
    },
    th: {
      verticalAlign: 'bottom',
      borderBottomWidth: '2px',
    },
    td: {
      verticalAlign: 'top',
      borderBottomWidth: '1px',
    },
    hr: {
      border: 0,
      borderBottom: '1px solid',
      borderColor: 'muted',
    },
    img: {
      maxWidth: '100%',
      borderRadius: '10px',
    },
  },
  prism: {
    fontFamily: 'monospace',
    fontSize: 1,
    lineHeight: 'code',
    p: 3,
    color: 'text',
    overflow: 'auto',
    code: {
      color: 'inherit',
    },
    borderRadius: '3px',
    bg: 'muted',
    [[
      '.comment',
      '.prolog',
      '.doctype',
      '.cdata',
      '.punctuation',
      '.operator',
      '.entity',
      '.url',
    ]]: {
      color: 'gray',
    },
    '.comment': {
      //fontStyle: 'italic',
    },
    [[
      '.property',
      '.tag',
      '.boolean',
      '.number',
      '.constant',
      '.symbol',
      '.deleted',
      '.function',
      '.class-name',
      '.regex',
      '.important',
      '.variable',
    ]]: {
      color: 'purple',
    },
    [['.atrule', '.attr-value', '.keyword']]: {
      color: '#07a',
    },
    [[
      '.selector',
      '.attr-name',
      '.string',
      '.char',
      '.builtin',
      '.inserted',
    ]]: {
      color: 'secondary',
    },
    '.react-syntax-highlighter-line-number': {
      color: 'mutedText',
      fontSize: '12px',
      marginLeft: '1px',
      marginRight: '5px',
    }
  },
}
