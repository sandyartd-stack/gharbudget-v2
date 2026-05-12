export function BottomSheet({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      <div className="absolute inset-0 bg-aub/55" onClick={onClose} />
      <div className="relative bg-cotton rounded-t-[20px] px-5 pt-5 pb-7 max-h-[82%] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>
        <div className="w-9 h-1 rounded-sm bg-bdr mx-auto mb-4" />
        {children}
      </div>
    </div>
  );
}

export function CenterModal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-aub/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-[280px] text-center"
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
