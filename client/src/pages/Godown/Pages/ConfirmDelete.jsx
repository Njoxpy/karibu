function ConfirmDelete() {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="p-4">
          <div className="rounded-lg bg-white p-8 shadow-2xl text-center">
            <h2 className="text-lg font-bold">
              Are you sure you want to do delete?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Doing that could delete an item from the list and there is no way
              to recover it , are you 100% sure it&apos;s OK?
            </p>

            <div className="mt-4 flex gap-2 justify-center">
              <button
                type="button"
                className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white"
              >
                Yes, delete
              </button>

              <button
                type="button"
                className="rounded bg-gray-500 px-4 py-2 text-sm font-medium text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmDelete;
