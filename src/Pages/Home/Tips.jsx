import { motion } from "framer-motion";
import { MdTipsAndUpdates } from "react-icons/md";
const tips = [
  {
    title: "Stay Consistent",
    description: "Dedicate at least 15 minutes daily to reading to build a habit.",
    quote: "A reader lives a thousand lives before he dies.",
    author: "George R.R. Martin",
  },
  {
    title: "Keep a Book Handy",
    description: "Use spare moments during travel or breaks to dive into a book.",
    quote: "Reading gives us someplace to go when we have to stay where we are.",
    author: "Mason Cooley",
  },
  {
    title: "Set Small Goals",
    description: "Aim to finish one chapter or a few pages daily for steady progress.",
    quote: "Little by little, one travels far.",
    author: "J.R.R. Tolkien",
  },
];

// Animation variants for container and items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } },
};

const Tips = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
       <div className="flex items-center justify-center gap-1 mb-8">
         <MdTipsAndUpdates className="text-2xl text-yellow-500"/>
        <h2 className="text-2xl md:text-3xl font-bold  text-center text-gray-900">
           Reading <span className="text-blue-500">Tips & Motivation</span>
        </h2>
       </div>
        <motion.div
          className="grid md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tips.map(({ title, description, quote, author }, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.06, boxShadow: "0 12px 30px rgba(0,0,0,0.18)" }}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
              </div>
              <blockquote className="text-blue-600 italic text-base">
                “{quote}”<br />
                <span className="font-semibold not-italic mt-2 block">— {author}</span>
              </blockquote>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Tips;
