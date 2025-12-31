import { useState, useEffect } from 'react'
import { Plus, Trash2, CheckCircle2, Circle, X, Filter, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const TodoApp = () => {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos')
        return saved ? JSON.parse(saved) : []
    })
    const [inputValue, setInputValue] = useState('')
    const [filter, setFilter] = useState('all') // all, active, completed

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

    return (
        <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-3xl p-8 md:p-12 mb-8"
            >
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-[#0f172a] dark:text-white mb-2">
                            Stay Focused.
                        </h1>
                        <p className="text-[#64748b] dark:text-[#94a3b8] font-medium">
                            {todos.filter(t => !t.completed).length} tasks remaining
                        </p>
                    </div>
                </header>

                <form onSubmit={addTodo} className="relative mb-8">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Add a new task..."
                        className="w-full bg-[#f1f5f9]/50 dark:bg-[#1e293b]/50 border-none rounded-2xl py-4 pl-6 pr-14 text-lg focus:ring-2 focus:ring-blue-500/20 transition-all outline-none placeholder:text-[#94a3b8]"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#3b82f6] text-white p-2.5 rounded-xl hover:bg-[#2563eb] transition-all shadow-lg shadow-blue-500/25"
                    >
                        <Plus size={24} />
                    </button>
                </form>

                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {['all', 'active', 'completed'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all ${filter === f
                                    ? 'bg-[#3b82f6] text-white shadow-md shadow-blue-500/20'
                                    : 'bg-[#f1f5f9] dark:bg-[#1e293b] text-[#64748b] hover:bg-[#e2e8f0] dark:hover:bg-[#334155]'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                    {todos.some(t => t.completed) && (
                        <button
                            onClick={clearCompleted}
                            className="ml-auto text-sm font-semibold text-[#ef4444] hover:bg-red-50 dark:hover:bg-red-900/10 px-4 py-2 rounded-full transition-all"
                        >
                            Clear Completed
                        </button>
                    )}
                </div>

                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {filteredTodos.map((todo) => (
                            <motion.div
                                key={todo.id}
                                layout
                                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                className={`group flex items-center gap-4 p-4 rounded-2xl transition-all border border-transparent hover:border-blue-500/10 ${todo.completed ? 'opacity-60' : ''
                                    }`}
                            >
                                <button
                                    onClick={() => toggleTodo(todo.id)}
                                    className="flex-shrink-0 transition-transform active:scale-90"
                                >
                                    {todo.completed ? (
                                        <CheckCircle2 className="text-[#10b981]" size={26} />
                                    ) : (
                                        <Circle className="text-[#cbd5e1] dark:text-[#475569]" size={26} />
                                    )}
                                </button>

                                <span className={`flex-grow text-lg font-medium transition-all ${todo.completed ? 'line-through text-[#94a3b8]' : 'text-[#334155] dark:text-[#e2e8f0]'
                                    }`}>
                                    {todo.text}
                                </span>

                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="opacity-0 group-hover:opacity-100 p-2 text-[#94a3b8] hover:text-[#ef4444] hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredTodos.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <div className="bg-[#f1f5f9] dark:bg-[#1e293b] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Filter className="text-[#94a3b8]" size={32} />
                            </div>
                            <p className="text-[#64748b] font-medium text-lg">No tasks found here.</p>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            <footer className="text-center">
                <p className="text-[#94a3b8] text-sm font-medium">
                    Premium Productivity &bull; Built with React
                </p>
            </footer>
        </div>
    )
}

export default TodoApp
