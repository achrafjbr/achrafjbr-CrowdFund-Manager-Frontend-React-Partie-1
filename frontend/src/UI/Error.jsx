export default function Error({ message }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0D0F1A] min-w-[1030px]">
        <div className="bg-[#13162A] rounded-2xl p-8 text-center border border-white/10">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-gray-400">{message}</p>
        </div>
      </div>
  );
}