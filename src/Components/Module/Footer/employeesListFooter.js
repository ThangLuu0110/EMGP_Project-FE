import React from 'react';
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

const EmployeesListFooter = ({ handleCreateNewEmployees }) => {
    return (
        <div className='employees-list__footer'>
            <button 
                className='employees-list__footer-button create'
                type='button'
                onClick={handleCreateNewEmployees}>
                <FaPlus/>
                New Employee
            </button>

            <button 
                className='employees-list__footer-button delete'
                type='button'
                onClick={handleCreateNewEmployees}>
                <MdDeleteOutline/>
                Delete
            </button>

        </div>
    )
}

export default EmployeesListFooter;