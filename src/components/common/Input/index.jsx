/**
 * Input Component
 * Reusable input field with label, error handling, and validation
 */

const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    disabled = false,
    className = '',
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`input ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
                {...props}
            />

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default Input;
