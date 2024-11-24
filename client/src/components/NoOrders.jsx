import { PlusIcon } from '@heroicons/react/20/solid'

const NoOrders = () => {
    return (
        <div className="text-center">

            <h3 className="mt-2 text-sm font-semibold text-gray-900">No Orders</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new orders.</p>
            <div className="mt-6">
                <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Submit Order
                </button>
            </div>
        </div>
    )
}

export default NoOrders;