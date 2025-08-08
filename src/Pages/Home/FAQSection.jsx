
import { useState } from 'react';


const faqs = [
  {
    question: 'How do I track my reading progress?',
    answer: 'Go to the "My Books" page and update the reading status for each book.',
  },
  {
    question: 'Can I edit or delete my review?',
    answer: 'Yes! On the book detail page, locate your review and use the edit/delete options.',
  },
  {
    question: 'How can I upvote a book?',
    answer: 'On any book detail page, click the upvote button — unless it’s your own book!',
  },
  {
    question: 'What categories are available?',
    answer: 'Currently: Fiction, Non-Fiction, and Fantasy. More coming soon!',
  },
];

const FAQSection=()=> {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className=" py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8"> <span className='text-blue-500'>Reading</span> FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center font-medium text-gray-800 hover:bg-gray-100"
              >
                <span>{faq.question}</span>
                <span>{activeIndex === index ? '−' : '+'}</span>
              </button>

              
                {activeIndex === index && (
                  <div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-gray-600 text-sm"
                  >
                    {faq.answer}
                  </div>
                )}
            
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection
