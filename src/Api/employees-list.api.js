const getAllEmployees = () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    };

    // Use CRA dev proxy to avoid browser CORS issues in local development.
    return fetch('/api/v1/employees/detail', options).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to fetch employees: ${response.status}`);
        }

        return response.json();
    });
};

export {
    getAllEmployees
};