const FAQ = () => {
  return (
    <section className="py-20 bg-slate-950">

      <div className="max-w-4xl mx-auto px-4">

        <h2 className="text-5xl font-black text-orange-400 text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">

          <div className="bg-slate-900 rounded-xl p-5">
            <h3 className="text-orange-400 font-bold">
              How long does delivery take?
            </h3>
            <p className="text-gray-300 mt-2">
              Usually within 1-5 minutes after payment confirmation.
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-5">
            <h3 className="text-orange-400 font-bold">
              Which payment methods are accepted?
            </h3>
            <p className="text-gray-300 mt-2">
              eZ Cash.
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-5">
            <h3 className="text-orange-400 font-bold">
              Is it safe?
            </h3>
            <p className="text-gray-300 mt-2">
              Yes. Your account is completely safe.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default FAQ;