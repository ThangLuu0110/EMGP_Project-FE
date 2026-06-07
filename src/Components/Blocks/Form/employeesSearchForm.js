import React from 'react';
import { RiResetLeftFill } from "react-icons/ri";

const EmployeeSearchForm = ({ handleSubmit, handleReset, searchFilters, setSearchFilters}) => {
    return (
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
            </form>
    )
}

export default EmployeeSearchForm;