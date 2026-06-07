import React, { useEffect, useState } from 'react';
import { getAllEmployees } from '../../../Api/employees-list.api';
import EmployeeCreateModal from '../../Blocks/Modal/employeesCreateModal';
import EmployeesListTable from '../../Blocks/Table/employeesListTable';
import EmployeeSearchForm from '../../Blocks/Form/employeesSearchForm';
import EmployeesListFooter from '../Footer/employeesListFooter';

const initialSearchFilters = {
    fullName: '',
    dateOfBirth: '',
    hometown: '',
    militaryRank: '',
    position: '',
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

const EmployeesListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchFilters, setSearchFilters] = useState(initialSearchFilters);
    const [employees, setEmployees] = useState([]);
    const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleReset = () => {
        setSearchFilters(initialSearchFilters);
        setCurrentPage(1);
    };

    const handleCreateNewEmployees = () => {
        setIsNewEmployeeModalOpen(true);
    };

    const fetchEmployees = async () => {
        try {
            const response = await getAllEmployees();
            const employeesData = response.data ? response.data : [];
            console.log(employeesData);
            setEmployees(normalizeEmployees(employeesData));
        } catch (error) {
            console.error('Failed to fetch employees list:', error);
            setEmployees([]);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchFilters]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="employees-list">
            <div className='employees-list__header'>
                <h2 className="employees-list__header-title">Employees List</h2>
            </div>
            
            <EmployeeSearchForm 
                handleSubmit={handleSubmit}
                handleReset={handleReset}
                searchFilters={searchFilters}
                setSearchFilters={setSearchFilters}
            />

            <EmployeesListTable
                employees={employees}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                searchFilters={searchFilters}
            />

            <EmployeeCreateModal
                isOpen={isNewEmployeeModalOpen}
                onClose={() => setIsNewEmployeeModalOpen(false)}
                onEmployeeCreated={fetchEmployees}
            />

            <EmployeesListFooter 
                handleCreateNewEmployees={handleCreateNewEmployees}
            />
        </div>
    );
};

export default EmployeesListPage;
