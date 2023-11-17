import { Link } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
        <div className='container-home'>
            <h2>Login</h2>
            <Link to={'/dashboard'}>acceder</Link>
        </div>
    </>
  )
}

export default App
