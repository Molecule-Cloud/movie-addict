import { type ButtonProps } from '@/app/interfaces/tmbd'

const Button: React.FC<ButtonProps> = ({ size, shape, text }) => {
    const sizeClasses = {
        small: "p-2",
        medium: "p-5",
        large: "p-7",
    }

    const shapeClasses = {
        'rounded-sm': "rounded-sm",
        'rounded-md': "rounded-md",
        'rounded-full': "rounded-full"
    }

    return (
        <button className={`${sizeClasses[size]} ${shapeClasses[shape]} bg-blue-600 text-white hover:bg-yellow-300 cursor-pointer`}>
            {text}
        </button>
    )
}


export default Button;