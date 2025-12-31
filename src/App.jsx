import { useState, useEffect } from 'react'
import TodoApp from './components/TodoApp'
import SplashScreen from './components/SplashScreen'
import { AnimatePresence } from 'framer-motion'

function App() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2500) // 2.5 seconds for a premium feel
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="min-h-screen bg-[#fbfcfe] dark:bg-[#020617] text-slate-900 dark:text-slate-100 selection:bg-blue-100 dark:selection:bg-blue-900/40">
            <AnimatePresence mode="wait">
                {loading ? (
                    <SplashScreen key="splash" />
                ) : (
                    <TodoApp key="app" />
                )}
            </AnimatePresence>
        </div>
    )
}

export default App
