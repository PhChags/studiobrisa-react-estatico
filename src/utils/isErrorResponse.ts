const isErrorResponse = (error: unknown): error is { message: string } => {
    return (
        error !== null &&
        typeof error === 'object' &&
        'message' in error &&
        typeof (error as Record<string, unknown>).message === 'string'
    );
};

export default isErrorResponse;