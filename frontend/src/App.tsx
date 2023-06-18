import hljs from 'highlight.js'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import axios from 'axios'

interface IResponse {
  json: string
}

function App() {
  const url = import.meta.env.VITE_API_BASE_URL
  const id = window.location.pathname.split('/')[1]
  const [json, setJson] = useState<string | null>(null)

  useEffect(() => {
    axios.get(`${url}/${id}`).then((res) => {
      const data = res.data as IResponse
      if (!data.json) return
      setJson(data.json)
    })
  }, [id])

  useEffect(() => {
    hljs.highlightAll()
  })

  return (
    <Box
      sx={{
        backgroundColor: '#253238',
        width: '100%',
        height: '100vh',
        '& pre': {
          margin: 0,
        },
        '& code': {
          fontFamily: 'monospace',
          fontSize: '0.8rem',
          lineHeight: '1.2rem',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          backgroundColor: '#253238',
        },
        '& .hljs-attr': {
          color: '#82aaff',
        },
        '& .hljs-string': {
          color: '#c3e88d',
        },
        '& .hljs-punctuation': {
          color: '#82aaff',
        },
        '& .hljs-keyword': {
          color: '#fd9bab',
        },
        '& .hljs-number': {
          color: '#f78c6c',
        },
      }}
    >
      {json && (
        <Box component="pre" sx={{}}>
          <Box component="code" className="hljs language-json">
            {JSON.stringify(JSON.parse(json), null, 2)}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default App
