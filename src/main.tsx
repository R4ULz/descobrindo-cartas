import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainContainer from './components/MainContainer'
import ScoreContainer from './components/ScoreContainer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='bg-gray-900 w-screen h-screen'>
      <div className='flex justify-center items-center p-5'>
        <p className='text-zinc-100 text-lg font-bold'>👑 Descubra a carta do Clash Royale 👑</p>
      </div>
      <div className='flex justify-center items-center'>
        <p className='text-zinc-100'>Descubra qual é a carta através dos emojis.</p>
      </div>

      <div className='px-6 py-3'>
        <ScoreContainer />
      </div>
      <div className='px-6 py-3'>
        <MainContainer />
      </div>
    </div>
  </StrictMode>,
)
