import { motion } from "framer-motion";

const reviews = [
  {
    name: "Kasun",
    text: "Super fast service. Diamonds received within 2 minutes!",
    stars: "★★★★★",
  },
  {
    name: "Nimesh",
    text: "Best prices in Sri Lanka. Highly recommended.",
    stars: "★★★★★",
  },
  {
    name: "Tharindu",
    text: "Easy payment with eZ Cash and instant top up.",
    stars: "★★★★★",
  },
];

const Reviews = () => {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-orange-400">
            CUSTOMER REVIEWS
          </h2>

          <p className="text-gray-400 mt-3">
            Trusted by thousands of Free Fire players.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {reviews.map((review, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-slate-900 border border-orange-500/20 rounded-2xl p-6"
            >

              <div className="text-yellow-400 text-xl mb-3">
                {review.stars}
              </div>

              <p className="text-gray-300 mb-4">
                "{review.text}"
              </p>

              <h3 className="font-bold text-orange-400">
                {review.name}
              </h3>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Reviews;