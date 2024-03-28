export const buildFailMessage = (error) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal Server Error';
    
    switch (statusCode) {
        case 400:
            message = 'Bad Request';
            break;
        case 401:
            message = 'Unauthorized';
            break;
        case 403:
            message = 'Forbidden';
            break;
        case 404:
            message = 'Not Found';
            break;
        case 409:
            message = 'Conflict';
            break;
        case 422:
            message = 'Unprocessable Entity';
            break;
        case 500:
            message = 'Internal Server Error';
            break;
        default:
            message = 'Unknown Error';
    }

    return {
        data: {
            success: false,
            error: {
                message
            }
        },
        statusCode
    };
};


export const buildSuccessMessage = (data: unknown) => {
    return {
        statusCode: 200, 
        data
    }
}