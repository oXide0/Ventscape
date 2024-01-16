export function isErrorWithMessage(error: unknown): error is { data: { message: string } } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof (error as { data?: unknown }).data === 'object' &&
        'message' in (error as { data: { message?: unknown } }).data &&
        typeof (error as { data: { message: unknown } }).data.message === 'string'
    );
}
