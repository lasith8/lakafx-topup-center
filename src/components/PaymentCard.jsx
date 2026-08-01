import { Copy } from "lucide-react";

export default function PaymentCard() {
  const copyNumber = () => {
    navigator.clipboard.writeText("0740482490");
    alert("eZ Cash Number Copied!");
  };

  return (
    <section className="py-10 bg-black">
      <div className="max-w-xl mx-auto bg-gray-900 rounded-2xl p-8 border border-cyan-500">

        <h2 className="text-3xl font-bold text-cyan-400 text-center mb-6">
          Payment Method
        </h2>

        <div className="text-center">

          <p className="text-gray-400 mb-2">
            eZ Cash
          </p>

          <h1 className="text-4xl font-bold text-white mb-6">
            0740482490
          </h1>

          <button
            onClick={copyNumber}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl flex items-center gap-2 mx-auto"
          >
            <Copy size={18} />
            Copy Number
          </button>

          <div className="mt-8 bg-yellow-500/10 border border-yellow-500 rounded-xl p-4">

            <p className="text-yellow-300 font-semibold">
              Complete your payment using the above eZ Cash number.
            </p>

            <p className="text-gray-300 mt-2">
              After payment, upload your payment screenshot and submit the order.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}