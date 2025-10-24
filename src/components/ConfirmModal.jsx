export default function ConfirmModal({ open, title = 'Xác nhận', message = 'Bạn có chắc không?', onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onCancel} className="px-3 py-1 rounded bg-gray-100">Hủy</button>
          <button onClick={onConfirm} className="px-3 py-1 rounded bg-red-600 text-white">Xác nhận</button>
        </div>
      </div>
    </div>
  )
}
