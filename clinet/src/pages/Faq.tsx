import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Github } from 'lucide-react';

const faqs = [
  {
    question: "What is Classes.io.edu?",
    answer: "Classes.io is an elite marketplace where teachers can host premium courses and students can learn in a zero-distraction environment with real-time progress tracking."
  },
  {
    question: "Do I need prior experience to start teaching?",
    answer: "No PhD required. If you have mastery over a craft and can explain it well, our platform provides all the tools you need to launch your academy."
  },
  {
    question: "How do I track my study progress?",
    answer: "We provide detailed analytics, heatmaps of your study sessions, and milestone reports for every course you are enrolled in."
  },
  {
    question: "Can I offer free courses?",
    answer: "Absolutely. Teachers have full control over their pricing, including offering introductory modules for free."
  },
  {
    question: "What about payment security?",
    answer: "We use enterprise-grade encryption for all transactions, ensuring teachers get paid on time and students' data remains private."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-[#fdfdfd] py-24 px-8 overflow-hidden">
      {/* 1. THE GRID BACKGROUND (Matching the image) */}
      <div className="absolute inset-0 opacity-[0.55]" 
           style={{ backgroundImage: `radial-gradient(#4f46e5 1px, transparent 2px)`, backgroundSize: '30px 30px' }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT SIDE: LARGE PIXEL-STYLE HEADER */}
          <div className="lg:w-1/3">
            <h2 className="text-[120px] font-black leading-none tracking-tighter text-black select-none bg-white pb-5 pl-5">
              FAQs
            </h2>
            <div className="mt-8 text-sm text-gray-500 max-w-[200px] bg-white ">
              <p>Spotted an issue?</p>
              <p>Help us improve — open it on GitHub.</p>
              <button className="mt-4 flex items-center gap-2 bg-[#6366f1] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#4f46e5] transition-colors">
                <Github size={18} />
                GitHub
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: ACCORDION */}
          <div className="lg:w-2/3 space-y">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 bg-white p-5">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center py-6 text-left group"
                >
                  <span className="text-xl font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    className="text-indigo-500"
                  >
                    <Plus size={24} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-gray-600 leading-relaxed max-w-2xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER MINI-BAR */}
        <div className="mt-24 pt-8 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400 font-medium tracking-widest uppercase">
          <div className="flex gap-6">
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Terms</a>
          </div>
          <div className="text-indigo-600 font-bold">Stay in the loop</div>
        </div>
      </div>
    </section>
  );
}