import { ButtonProps } from "@/app/interfaces/tmbd";

const Button: React.FC<ButtonProps> = ({
    text,
    size,
    shape,
    onClick,
    fullWidth = false,
    type = 'button'
}) => {
    const sizeClasses = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'px-8 py-4 text-lg'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors
                ${sizeClasses[size]}
                ${shape}
                ${fullWidth ? 'w-full' : ''}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
            `}
        >
            {text}
        </button>
    );
};

export default Button;