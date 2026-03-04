function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000]">
      <div className="bg-[#1e1e2e] border border-[#45475a] rounded-xl p-8 min-w-[320px] text-center">
        <p className="text-[#cdd6f4] text-lg mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="py-2 px-5 rounded-md border-0 cursor-pointer text-base font-medium bg-[#45475a] text-[#cdd6f4] hover:bg-[#585b70]"
            onClick={onCancel}
          >No</button>
          <button
            className="py-2 px-5 rounded-md border-0 cursor-pointer text-base font-medium bg-[#f38ba8] text-[#1e1e2e] hover:bg-[#f5a8bd]"
            onClick={onConfirm}
          >Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;