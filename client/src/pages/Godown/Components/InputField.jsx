// InputField.js
import PropTypes from 'prop-types';

const InputField = ({
  label,
  type = 'text',
  id,
  value,
  onChange,
  placeholder,
  required = false,
  isNumber = false,
  min,
  error,
}) => {
  return (
    <div className="mb-6">
      <label 
        htmlFor={id}
        className="block mb-2 text-sm font-semibold text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className={`
          w-full
          px-4
          py-3
          rounded-lg
          border
          bg-white
          transition-all
          duration-200
          placeholder:text-gray-400
          ${error 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }
          focus:outline-none
          focus:ring-2
          focus:ring-opacity-50
          disabled:bg-gray-100
          disabled:cursor-not-allowed
        `}
        {...(isNumber && {
          step: "0.01",
          pattern: "[0-9]*[.,]?[0-9]*",
          inputMode: "decimal"
        })}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'number', 'email', 'password', 'tel']),
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  isNumber: PropTypes.bool,
  min: PropTypes.number,
  error: PropTypes.string,
};

export default InputField;
