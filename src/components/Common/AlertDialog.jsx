export default function AlertDialog({ open, onContinue, onCancel }) {
  return (
    <div
      className={`fixed flex justify-center items-center w-screen h-screen bg-[rgba(0,0,0,0.6)] z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transition-[visibility,opacity] duration-300 ${
        open ? "visible opacity-100" : "invisible opacity-0 "
      }`}
    >
      <div>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 rounded-t-lg shadow-2xl">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Are you absolutely sure ?
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                This action cannot be undone. This will permanently delete.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 rounded-b-lg sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={onContinue}
          >
            Continue
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
