// InputField.js
const InputField = ({ label, type, id, value, onChange, placeholder, required, min, max, isNumber }) => {
    return (
        <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-medium" htmlFor={id}>
                {label}
            </label>
            {isNumber ? (
                <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className="border border-gray-300 rounded w-full p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholder}
                    required={required}
                    min={min}
                    max={max}
                />
            ) : (
                <textarea
                    id={id}
                    value={value}
                    onChange={onChange}
                    className="border border-gray-300 rounded w-full p-4 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholder}
                    required={required}
                ></textarea>
            )}
        </div>
    );
};

export default InputField;
