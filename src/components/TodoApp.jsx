import { useState, useEffect } from 'react'
import { Plus, Trash2, CheckCircle2, Circle, Filter, LayoutGrid, CheckSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const TodoApp = () => {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos')
        return saved ? JSON.parse(saved) : []
    })
    const [inputValue, setInputValue] = useState('')
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = (e) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        const newTodo = {
            id: Date.now(),
            text: inputValue.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        }

        setTodos([newTodo, ...todos])
        setInputValue('')
    }

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed))
    }

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
    })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center">
            <div className="w-full max-w-xl px-6 py-12 md:py-24">
                {/* Header Section */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 space-y-2"
                >
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Today
                        </h1>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold">
                            <CheckSquare size={14} />
                            <span>{todos.filter(t => !t.completed).length} items</span>
                        </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                        Focus on what matters most.
                    </p>
                </motion.header>

                {/* Input Section */}
                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onSubmit={addTodo}
                    className="relative group mb-10"
                >
                    <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent group-focus-within:via-blue-500 transition-all"></div>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Add a task for today..."
                        className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-none rounded-2xl py-5 pl-7 pr-16 text-lg md:text-xl font-medium shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 focus:ring-2 focus:ring-blue-500/50 transition-all outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 dark:bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-lg shadow-blue-500/20"
                    >
                        <Plus size={24} strokeWidth={2.5} />
                    </button>
                </motion.form>

                {/* Filters Section */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-xl backdrop-blur-md">
                        {['all', 'active', 'completed'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${filter === f
                                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    {todos.some(t => t.completed) && (
                        <button
                            onClick={clearCompleted}
                            className="text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors"
                        >
                            Clear Done
                        </button>
                    )}
                </div>

                {/* List Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3"
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {filteredTodos.map((todo) => (
                            <motion.div
                                key={todo.id}
                                layout
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="group relative flex items-center gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl ring-1 ring-slate-200/60 dark:ring-slate-800/60 hover:ring-blue-500/30 transition-all shadow-sm"
                            >
                                <button
                                    onClick={() => toggleTodo(todo.id)}
                                    className="relative flex-shrink-0 w-8 h-8 flex items-center justify-center transition-transform active:scale-90"
                                >
                                    <div className={`absolute inset-0 rounded-full border-2 transition-all ${todo.completed
                                            ? 'bg-emerald-500 border-emerald-500 scale-110'
                                            : 'border-slate-300 dark:border-slate-600'
                                        }`}></div>
                                    <AnimatePresence>
                                        {todo.completed && (
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                            >
                                                <CheckCircle2 size={18} className="text-white" strokeWidth={3} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>

                                <span className={`flex-grow text-lg font-semibold transition-all duration-300 ${todo.completed
                                        ? 'text-slate-400 dark:text-slate-600 line-through'
                                        : 'text-slate-700 dark:text-slate-200'
                                    }`}>
                                    {todo.text}
                                </span>

                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="opacity-0 group-hover:opacity-100 p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredTodos.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-50 dark:bg-slate-900/30 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center"
                        >
                            <LayoutGrid className="mx-auto text-slate-300 dark:text-slate-700 mb-4" size={48} />
                            <p className="text-slate-500 dark:text-slate-500 text-lg font-bold">
                                No tasks to show
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            <footer className="mt-auto py-8 text-center text-slate-400 dark:text-slate-600 font-bold text-sm">
                SENIOR UX OPTIMIZED &bull; PWA READY
            </footer>
        </div>
    )
}

export default TodoApp
