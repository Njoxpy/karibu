

const SettingsPage = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
            <form className="mt-6 space-y-4">
                <div>
                    <label htmlFor="site-name" className="block text-gray-700">
                        Site Name
                    </label>
                    <input
                        id="site-name"
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default SettingsPage;
