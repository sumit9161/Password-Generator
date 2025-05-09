import { useState, useCallback , useEffect, useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [num, setNum]  = useState(false)
  const [char,setChar] = useState(false)
  const [pass,setPass] = useState("")

  // useRef hook
  const passRef=useRef(null)

  const passgen = useCallback(()=>{
    let password=""
    let str=
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num) str += "0123456789"
    if(char) str += "!@#$%^&*()_+{}[]~`"

    for(let i=1;i<=length;i++){
      let char=  Math.floor(Math.random() * str.length+1);
      password += str.charAt(char)
    }
    setPass(password)

  },[length,num,char,setPass])

  const CopyPasswordToClipboard = useCallback(()=>{
    passRef.current?.select();
    //passRef.current?.setSelectionRange(0,length);
    window.navigator.clipboard.writeText(pass)
  },[pass])

  useEffect(()=>{
    passgen();
  },[length,num,char,passgen])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'> 
      <h1 className='text-white text-center my-3'> Password Generator</h1>
      <div className='className = "flex shadow rounded-lg overflow-hidden mb-4"'>
        <input
          type="text"
          value={pass}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passRef}
        />
        <button 
        onClick={CopyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
          copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex-items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={num}
            id="numberInput"
            onChange={()=>{
              setNum((prev)=>!prev);
            }}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={char}
              id="characterInput"
              onChange={()=>{
                setChar((prev)=>!prev);
              }}
            />
            <label htmlFor='characterInput'>Characters</label>
          </div>
      </div>
      </div>
    </>
  )
}

export default App
