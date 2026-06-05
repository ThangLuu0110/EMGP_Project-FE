import React, { useEffect, useState } from 'react';
import { getAllEmployees } from '../../../Api/employees-list.api';
import { RiResetLeftFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import NewEmployeeModal from '../../Blocks/Modal/newEmployee';

const initialSearchFilters = {
    fullName: '',
    dateOfBirth: '',
    hometown: '',
    militaryRank: '',
    position: '',
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

const formatISODate = (dateOfBirth) => {
    const dateOnly = new Date(dateOfBirth).toISOString().split("T")[0];
    // Keep it consistent with the `<input type="date" />` value format.
    return dateOnly|| '';
};

const normalizeEmployees = (employeesData) =>
    employeesData.map((employee, index) => ({
        id: employee.empId || index + 1,
        fullName: employee.empName || '',
        dateOfBirth: employee.empDateOfBirth || '',
        hometown: employee.empHometown || '',
        militaryRank: employee.empMilitaryRank || '',
        position: employee.empPosition || '',
    }));

const EmployeesList = () => {
    const [searchFilters, setSearchFilters] = useState(initialSearchFilters);
    const [employees, setEmployees] = useState([]);
    const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleReset = () => {
        setSearchFilters(initialSearchFilters);
    };

    const handleCreateNewEmployees = () => {
        setIsNewEmployeeModalOpen(true);
    };

    const fetchEmployees = async () => {
        try {
            const response = await getAllEmployees();
            const employeesData = response.data ? response.data : [];
            setEmployees(normalizeEmployees(employeesData));
        } catch (error) {
            console.error('Failed to fetch employees list:', error);
            setEmployees([]);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const normalize = (value) => (value ? String(value).trim().toLowerCase() : '');

    const filteredEmployees = employees.filter((employee) => {
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
    });

    return (
        <div className="employees-list">
            <div className='employees-list__header'>
                <h2 className="employees-list__header-title">Employees List</h2>
                <button 
                    className='employees-list__header-button'
                    type='button'
                    onClick={handleCreateNewEmployees}>
                    <FaPlus/>
                    New Employee
                </button>
            </div>

            <form className="employees-search" onSubmit={handleSubmit}>
                <div className="employees-search__fields row-one">
                    <div className="employees-search__field">
                        <label className="employees-search__label" htmlFor="fullName">
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            className="employees-search__input"
                            type="text"
                            value={searchFilters.fullName}
                            onChange={(event) =>
                                setSearchFilters((prev) => ({ ...prev, fullName: event.target.value }))
                            }
                            placeholder="Enter full name"
                            />
                    </div>

                    <div className="employees-search__field">
                        <label className="employees-search__label" htmlFor="dateOfBirth">
                            Date of Birth
                        </label>
                        <input
                            id="dateOfBirth"
                            className="employees-search__input"
                            type="date"
                            value={searchFilters.dateOfBirth}
                            onChange={(event) =>
                                setSearchFilters((prev) => ({ ...prev, dateOfBirth: event.target.value }))
                            }
                            />
                    </div>
                </div>
                <div className="employees-search__fields row-two">
                    <div className="employees-search__field">
                        <label className="employees-search__label" htmlFor="hometown">
                            Hometown
                        </label>
                        <input
                            id="hometown"
                            className="employees-search__input"
                            type="text"
                            value={searchFilters.hometown}
                            onChange={(event) =>
                                setSearchFilters((prev) => ({ ...prev, hometown: event.target.value }))
                            }
                            placeholder="Enter hometown"
                            />
                    </div>

                    <div className="employees-search__field">
                        <label className="employees-search__label" htmlFor="militaryRank">
                            Military Rank
                        </label>
                        <input
                            id="militaryRank"
                            className="employees-search__input"
                            type="text"
                            value={searchFilters.militaryRank}
                            onChange={(event) =>
                                setSearchFilters((prev) => ({ ...prev, militaryRank: event.target.value }))
                            }
                            placeholder="Enter military rank"
                        />
                    </div>

                    <div className="employees-search__field">
                        <label className="employees-search__label" htmlFor="position">
                            Position
                        </label>
                        <input
                            id="position"
                            className="employees-search__input"
                            type="text"
                            value={searchFilters.position}
                            onChange={(event) =>
                                setSearchFilters((prev) => ({ ...prev, position: event.target.value }))
                            }
                            placeholder="Enter position"
                            />
                    </div>
                </div>

                <div className="employees-search__actions">
                    <button
                        type="button"
                        className="employees-search__button"
                        onClick={handleReset}
                    >   
                        <RiResetLeftFill/>
                        Reset
                    </button>
                </div>
            </form>

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
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee) => (
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
            </div>

            <NewEmployeeModal
                isOpen={isNewEmployeeModalOpen}
                onClose={() => setIsNewEmployeeModalOpen(false)}
                onEmployeeCreated={fetchEmployees}
            />
        </div>
    );
};

export default EmployeesList;
