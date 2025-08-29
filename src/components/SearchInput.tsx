import React, { type InputHTMLAttributes } from 'react';

type VariantType = 'searchOne' | 'searchTwo';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: VariantType;
    leftIcon?: React.ComponentType<{ className?: string }>;
    rightIcon?: React.ComponentType<{ className?: string }>;
    className?: string;
}

interface VariantConfig {
    container: string;
    input: string;
    leftIcon: string;
    rightIcon: string;
    iconSize: string;
}

// Reusable SearchInput Component
const SearchInput: React.FC<SearchInputProps> = ({
    placeholder = "Search",
    value,
    onChange,
    variant = "searchOne",
    className = "",
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    ...props
}) => {
    const variants: Record<VariantType, VariantConfig> = {
        searchOne: {
            container: "relative flex-1 gap-2.5",
            input: "w-[298px] h-11 pl-[58px] bg-[#181818] rounded-[100px] text-[#838383] text-[16px] tracking-normal font-normal font-figtree focus:outline-none focus:border-blue-500",
            leftIcon: "absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#838383]",
            rightIcon: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-300",
            iconSize: "w-6 h-6"
        },
        searchTwo: {
            container: "relative flex-1",
            input: "w-full h-auto text-[#616161] pl-[58px] leading-[18px] font-normal text-[14px] pr-4 py-3 rounded-lg font-figtree focus:outline-none focus:border-blue-500",
            leftIcon: "absolute left-[15px] top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#838383]",
            rightIcon: "absolute right-6 top-1/2 transform -translate-y-1/2 text-[#838383] cursor-pointer hover:text-gray-400",
            iconSize: "w-6 h-6"
        },

    };

    const currentVariant = variants[variant];

    return (
        <div className={`${currentVariant.container} ${className}`}>
            {/* Left Icon */}
            {LeftIcon && (
                <LeftIcon className={currentVariant.iconSize} />
            )}

            {/* Input */}
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={currentVariant.input}
                {...props}
            />

            {/* Right Icon */}
            {RightIcon && (
                <RightIcon />
            )}
        </div>
    );
};

export default SearchInput;