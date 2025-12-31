import { motion } from 'framer-motion'

const SplashScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none" />

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for premium feel
                    delay: 0.2
                }}
                className="relative"
            >
                <img
                    src="/pwa-512x512.png"
                    alt="App Icon"
                    className="w-32 h-32 md:w-48 md:h-48 rounded-[32px] shadow-2xl shadow-blue-500/20"
                />
                <motion.div
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 rounded-[32px] bg-blue-400/20 blur-xl -z-10"
                />
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-8 text-center"
            >
                <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 tracking-tight">
                    Pleasant To-Do
                </h2>
                <p className="text-slate-500 font-semibold mt-2 tracking-widest uppercase text-xs">
                    Crafting Focus
                </p>
            </motion.div>
        </motion.div>
    )
}

export default SplashScreen
