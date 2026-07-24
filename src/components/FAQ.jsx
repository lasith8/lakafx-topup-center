import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does delivery take?",
    answer: "Usually within 1-5 minutes after payment confirmation.",
  },
  {
    question: "Is it safe?",
    answer: "Yes. We use official top-up methods. Your account is completely safe.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "eZ Cash and Bank Transfer.",
  },
  {
    question: "Can I order anytime?",
    answer: "Yes, we provide 24/7 support.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-5">

        <h2 className="text-4xl font-black text-center text-orange-400 mb-12">
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 bg-slate-900 rounded-xl border border-orange-500/20 overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full flex justify-between items-center p-5 text-left"
            >
              <span className="text-white font-semibold">
                {faq.question}
              </span>

              <ChevronDown
                className={`transition-transform ${
                  open === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {open === index && (
              <div className="px-5 pb-5 text-gray-400">
                {faq.answer}
              </div>
            )}
          </div>
        ))}

      </div>
    </section>
  );
}