import { FaTimes, FaCreditCard, FaLock } from "react-icons/fa";

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const PaymentModal = ({
  isOpen,
  onClose,
  onConfirm,
}: PaymentModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-3xl font-seasons font-bold mb-2 text-black">
          Finalize Project
        </h2>
        <p className="text-gray-500 mb-8 text-sm">
          To publish your project and submit it for evaluation, please complete
          a one-time verification fee.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-6 flex justify-between items-center border border-gray-100">
          <span className="font-bold text-gray-700">Total:</span>
          <span className="text-2xl font-black text-black">29.99 PLN</span>
        </div>

        <div className="space-y-4 mb-8">
          <div className="relative">
            <FaCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Card number"
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all cursor-not-allowed text-gray-400"
              readOnly
              value="**** **** **** 4242"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              className="w-1/2 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all cursor-not-allowed text-gray-400"
              readOnly
              value="12/25"
            />
            <input
              type="text"
              placeholder="CVC"
              className="w-1/2 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all cursor-not-allowed text-gray-400"
              readOnly
              value="***"
            />
          </div>
        </div>

        <button
          onClick={onConfirm}
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2 uppercase"
        >
          <FaLock className="text-sm" /> Pay and Add
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          Payments are securely encrypted. (This is a mock-up).
        </p>
      </div>
    </div>
  );
};
