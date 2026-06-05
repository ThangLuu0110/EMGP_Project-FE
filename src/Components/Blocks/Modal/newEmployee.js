import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { createEmployee } from '../../../Api/employees-list.api';

const initialFormData = {
    fullName: '',
    dateOfBirth: '',
    hometown: '',
    militaryRank: '',
    position: '',
};

const NewEmployeeModal = ({ isOpen, onClose, onEmployeeCreated }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleClose = () => {
        setFormData(initialFormData);
        setError('');
        onClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.fullName.trim()) {
            setError('Full name is required.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            await createEmployee({
                empName: formData.fullName.trim(),
                empDateOfBirth: formData.dateOfBirth,
                empAge: new Date(formData.dateOfBirth).getFullYear() - new Date().getFullYear(),
                empHometown: formData.hometown.trim(),
                empMilitaryRank: formData.militaryRank.trim(),
                empPosition: formData.position.trim(),
            });

            setFormData(initialFormData);
            onEmployeeCreated?.();
            onClose();
        } catch (submitError) {
            console.error('Failed to create employee:', submitError);
            setError('Failed to create employee. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="employee-create-modal" onClick={handleClose}>
            <div
                className="employee-create-modal__content"
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="new-employee-title"
            >
                <div className="employee-create-modal__header">
                    <h3 id="new-employee-title" className="employee-create-modal__title">
                        New Employee
                    </h3>
                    <button
                        type="button"
                        className="employee-create-modal__close"
                        onClick={handleClose}
                        aria-label="Close modal"
                    >
                        <IoClose />
                    </button>
                </div>

                <form className="employee-create-modal__form" onSubmit={handleSubmit}>
                    <div className="employee-create-modal__fields">
                        <div className="employee-create-modal__field">
                            <label className="employee-create-modal__label" htmlFor="newEmployeeFullName">
                                Full Name
                            </label>
                            <input
                                id="newEmployeeFullName"
                                name="fullName"
                                className="employee-create-modal__input"
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                required
                            />
                        </div>

                        <div className="employee-create-modal__field">
                            <label className="employee-create-modal__label" htmlFor="newEmployeeDateOfBirth">
                                Date of Birth
                            </label>
                            <input
                                id="newEmployeeDateOfBirth"
                                name="dateOfBirth"
                                className="employee-create-modal__input"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="employee-create-modal__field">
                            <label className="employee-create-modal__label" htmlFor="newEmployeeHometown">
                                Hometown
                            </label>
                            <input
                                id="newEmployeeHometown"
                                name="hometown"
                                className="employee-create-modal__input"
                                type="text"
                                value={formData.hometown}
                                onChange={handleChange}
                                placeholder="Enter hometown"
                            />
                        </div>

                        <div className="employee-create-modal__field">
                            <label className="employee-create-modal__label" htmlFor="newEmployeeMilitaryRank">
                                Military Rank
                            </label>
                            <input
                                id="newEmployeeMilitaryRank"
                                name="militaryRank"
                                className="employee-create-modal__input"
                                type="text"
                                value={formData.militaryRank}
                                onChange={handleChange}
                                placeholder="Enter military rank"
                            />
                        </div>

                        <div className="employee-create-modal__field">
                            <label className="employee-create-modal__label" htmlFor="newEmployeePosition">
                                Position
                            </label>
                            <input
                                id="newEmployeePosition"
                                name="position"
                                className="employee-create-modal__input"
                                type="text"
                                value={formData.position}
                                onChange={handleChange}
                                placeholder="Enter position"
                            />
                        </div>
                    </div>

                    {error && <p className="employee-create-modal__error">{error}</p>}

                    <div className="employee-create-modal__actions">
                        <button
                            type="button"
                            className="employee-create-modal__button employee-create-modal__button--secondary"
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="employee-create-modal__button employee-create-modal__button--primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewEmployeeModal;
