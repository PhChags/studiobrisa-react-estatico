import React from 'react';
import { type FieldError } from 'react-hook-form';

interface FormFeedbackProps {
    error: FieldError | undefined;
}

const FormFeedback: React.FC<FormFeedbackProps> = ({ error }) => {
    if (!error) return null;
    
    return (
        <div className="invalid-feedback d-block">
            {error.message}
        </div>
    );
};

export default FormFeedback;