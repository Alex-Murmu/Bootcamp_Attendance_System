import { motion } from "framer-motion";

 const Navbar = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-bold"
      >
        I Build <span className="text-blue-400">Scalable</span> Systems.
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-gray-400 text-xl"
      >
        MERN Stack | TypeScript | Docker
      </motion.p>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-8 px-8 py-3 bg-blue-600 rounded-full font-semibold"
      >
        Explore My Work
      </motion.button>
    </div>
  );
};

export default Navbar;