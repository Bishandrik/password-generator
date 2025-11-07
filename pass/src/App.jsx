import { useCallback, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [length, setLength] = useState(6)
  const [numbers, setNumbers] = useState(false)
  const [characters, setCharacters] = useState(false)
  const [password, setPassword] = useState('')
  const [view, setView] = useState('password')
  const [icon,setIcon] = useState('../public/view.png')
  const [copied, setCopied] = useState(false)

  const generatePassword = useCallback(()=>{
    let pass=''
    let str ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numbers){
      str += '0123456789'
    }
    if(characters){
      str += '!@#$%^&*()_+'
    }
    for(let i=0;i<length;i++){
      pass += str.charAt(Math.floor(Math.random()*str.length))
    }
    setPassword(pass)

  },[length,numbers,characters])

  useEffect(generatePassword,[length,numbers,characters])

  useEffect(()=>{
    setView('password')
    setIcon('../public/view.png')
  },[length,numbers,characters])

  return (
    <div className="min-h-screen animated-gradient p-4">
      <div className="flex justify-center items-center mt-12">
        <div className="glass-effect container-hover rounded-2xl w-full max-w-md p-8">
          <div className="flex justify-between items-center">
            <h1 className='text-3xl mb-6 text-white font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
              Password Generator
            </h1>
            <button 
              onClick={generatePassword}
              className="transform hover:rotate-180 transition-all duration-300"
            >
              <img className='w-6 opacity-70 hover:opacity-100' src="../public/refresh.png" />
            </button>
          </div>
          
          <div className="flex bg-gray-700/50 rounded-lg p-2 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/30 transition-colors">
            <input 
              className='rounded-lg bg-transparent text-white p-3 m-auto w-full focus:outline-none placeholder-gray-400' 
              value={password} 
              type={view} 
              placeholder='Your password here' 
            />
            <button 
              className='mx-2 hover:scale-110 transition-transform' 
              onClick={() => {
                setView((prev) => prev === 'password' ? 'text' : 'password')
                setIcon((prev) => prev === '../public/view.png' ? '../public/hide.png' : '../public/view.png')
              }}
            >
              <img className='w-7 opacity-70 hover:opacity-100' src={icon} />
            </button>
            <button 
              className='mx-2 hover:scale-110 transition-transform' 
              onClick={() => {
                window.navigator.clipboard.writeText(password)
                toast.success("Password Copied", {
                  position: 'bottom-center',
                  theme: 'dark',
                  className: 'bg-gray-800'
                })
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
            >
              <img className='w-7 opacity-70 hover:opacity-100' src='../public/copy.png' />
            </button>
            <ToastContainer limit={3} autoClose={1500} />
          </div>
          
          <div className="flex flex-col gap-6 mt-6">
            <div className="flex items-center space-x-3">
              <input 
                className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500' 
                type="range" 
                value={length} 
                min={6} 
                max={20} 
                onChange={(e) => {setLength(e.target.value)}} 
              />
              <span className='text-white bg-purple-500/20 px-3 py-1 rounded-full text-sm min-w-[3rem] text-center'>
                {length}
              </span>
            </div>
            
            <div className="flex items-center justify-center space-x-6">
              <label className="inline-flex items-center space-x-2 cursor-pointer group">
                <input 
                  className='w-4 h-4 accent-purple-500 cursor-pointer' 
                  type="checkbox" 
                  onClick={() => {
                    setNumbers((prev) => !prev)
                  }} 
                />
                <span className='text-white group-hover:text-purple-400 transition-colors'>Numbers</span>
              </label>
              <label className="inline-flex items-center space-x-2 cursor-pointer group">
                <input 
                  className='w-4 h-4 accent-purple-500 cursor-pointer' 
                  type="checkbox" 
                  onClick={() => {
                    setCharacters((prev) => !prev)
                  }} 
                />
                <span className='text-white group-hover:text-purple-400 transition-colors'>Characters</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
