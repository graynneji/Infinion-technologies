import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

//i created a reusable Button component with different variants, sizes, and optional icons.
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'dark';
type ButtonSize = 'small' | 'medium' | 'large';
type IconPosition = 'left' | 'right';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: React.ComponentType<{ className?: string }>;
    iconPosition?: IconPosition;
    className?: string;
    disabled?: boolean;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    disabled = false,
    ...props
}) => {

    return (
        <button
            onClick={onClick}
            className={className}
            disabled={disabled}
            {...props}
        >
            {Icon && iconPosition === 'left' && <Icon />}
            <span>{children}</span>
            {Icon && iconPosition === 'right' && <Icon />}
        </button>
    );
};

export default Button;
