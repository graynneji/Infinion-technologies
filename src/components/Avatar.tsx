import React from 'react';


interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
    src?: string;
    alt?: string;
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
    src,
    alt = 'Avatar',
    className = '',
    ...props
}) => {


    return (
        <div className={className} {...props}>
            <img
                src={src}
                alt={alt}
                className="rounded-full mx-auto object-cover"
            />
        </div>
    );
};

export default Avatar;