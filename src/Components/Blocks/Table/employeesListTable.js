import React, { useEffect } from 'react';

const EmployeesListTable = ({ employees, currentPage, setCurrentPage, searchFilters }) => {
    const normalize = (value) => (value ? String(value).trim().toLowerCase() : '');

    const filteredEmployees = employees?.length > 0 ? employees.filter((employee) => {
        const fullNameMatch = !searchFilters.fullName ||
            normalize(employee.fullName).includes(normalize(searchFilters.fullName));

        const dobMatch = !searchFilters.dateOfBirth || employee.dateOfBirth === searchFilters.dateOfBirth;

        const hometownMatch = !searchFilters.hometown ||
            normalize(employee.hometown).includes(normalize(searchFilters.hometown));

        const militaryRankMatch = !searchFilters.militaryRank ||
            normalize(employee.militaryRank).includes(normalize(searchFilters.militaryRank));

        const positionMatch = !searchFilters.position ||
            normalize(employee.position).includes(normalize(searchFilters.position));

        return fullNameMatch && dobMatch && hometownMatch && militaryRankMatch && positionMatch;
    }) : [];

    const PAGE_SIZE = 5;
    const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / PAGE_SIZE));
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + PAGE_SIZE);


    const formatISODate = (dateOfBirth) => {
        const dateOnly = new Date(dateOfBirth).toISOString().split("T")[0];
        // Keep it consistent with the `<input type="date" />` value format.
        return dateOnly|| '';
    };

    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) return '';
    
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        // Adjust if birthday hasn’t occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="employees-table">
                <table className="employees-table__table">
                    <thead>
                        <tr className="employees-table__row employees-table__row--header">
                            <th className="employees-table__th">Id</th>
                            <th className="employees-table__th">Full Name</th>
                            <th className="employees-table__th">Date of Birth</th>
                            <th className="employees-table__th">Age</th>
                            <th className="employees-table__th">Hometown</th>
                            <th className="employees-table__th">Military Rank</th>
                            <th className="employees-table__th">Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedEmployees.length > 0 ? (
                            paginatedEmployees.map((employee) => (
                                <tr key={employee.id} className="employees-table__row">
                                    <td className="employees-table__td">{employee.id}</td>
                                    <td className="employees-table__td">{employee.fullName}</td>
                                    <td className="employees-table__td">{formatISODate(employee.dateOfBirth)}</td>
                                    <td className="employees-table__td">{calculateAge(employee.dateOfBirth)}</td>
                                    <td className="employees-table__td">{employee.hometown}</td>
                                    <td className="employees-table__td">{employee.militaryRank}</td>
                                    <td className="employees-table__td">{employee.position}</td>
                                </tr>
                            ))
                        ) : (
                            <tr className="employees-table__row">
                                <td className="employees-table__td" colSpan="7">
                                    No employees found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {filteredEmployees.length > 0 && (
                    <div className="employees-table__pagination">
                        <p className="employees-table__pagination-info">
                            Showing {startIndex + 1}-{Math.min(startIndex + PAGE_SIZE, filteredEmployees.length)} of {filteredEmployees.length}
                        </p>
                        <div className="employees-table__pagination-controls">
                            <button
                                type="button"
                                className="employees-table__pagination-button"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className="employees-table__pagination-page">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                type="button"
                                className="employees-table__pagination-button"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
    )
}

export default EmployeesListTable;