import { useState } from 'react'
import './App.css'

interface ErrorResponse {
  message: string[]
  error: string
  statusCode: number
}

function App() {
  const [errors, setErrors] = useState<string[]>([]);

  async function newServer() {
    const response = await fetch('http://localhost:3000/servers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idAddress: 'hi'}),
    })
    if (response.status === 400) {
      const body = await response.json() as ErrorResponse;
      setErrors(body.message);
    }
  }
 return <div>
    <p style={{color:'red'}}>
      { errors.join('. ') }
    </p>
  <button onClick={newServer}>Új szerver</button>
 </div>
}

export default App
