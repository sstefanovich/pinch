import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TimerProvider } from './context/TimerContext'
import Layout from './Layout'
import Home from './pages/Home'
import Converter from './pages/Converter'
import Scaler from './pages/Scaler'
import Timer from './pages/Timer'
import Reference from './pages/Reference'
import Substitutions from './pages/Substitutions'

export default function App() {
  return (
    <BrowserRouter>
      <TimerProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="convert" element={<Converter />} />
          <Route path="scale" element={<Scaler />} />
          <Route path="timer" element={<Timer />} />
          <Route path="reference" element={<Reference />} />
          <Route path="substitutions" element={<Substitutions />} />
        </Route>
      </Routes>
      </TimerProvider>
    </BrowserRouter>
  )
}
