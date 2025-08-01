import React from 'react';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', text }) => {
    const sizeClasses = {
        sm: 'spinner-border-sm',
        md: '',
        lg: 'spinner-border-lg'
    };
    
    return (
        <div className="d-flex align-items-center justify-content-center">
            <div 
                className={`spinner-border text-purple ${sizeClasses[size]}`} 
                role="status"
            >
                <span className="visually-hidden">Carregando...</span>
            </div>
            {text && <span className="ms-2">{text}</span>}
        </div>
    );
};

export default Loader;