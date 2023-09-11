import './AccommodationFilter.scss';
import React, { useCallback, useState } from 'react';
import { AccommodationFilterParams } from './AccommodationFilterParams';

// eslint-disable-next-line no-unused-vars
function AccommodationFilter(props: { setFilter: (filter: AccommodationFilterParams) => void }) {
    const { setFilter } = props;
    const [accommodationFilter, setAccommodationFilter] = useState<AccommodationFilterParams>(
        new AccommodationFilterParams()
    );

    useCallback(() => {
        setAccommodationFilter(new AccommodationFilterParams());
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccommodationFilter((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    function changeFilter() {
        setFilter(accommodationFilter);
    }

    return (
        <div className="filter-bar">
            <div className="filter-group">
                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={accommodationFilter.city}
                    onChange={handleInputChange}
                />
            </div>
            <div className="filter-group">
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={accommodationFilter.address}
                    onChange={handleInputChange}
                />
            </div>
            <div className="filter-group">
                <label htmlFor="guests">Number of Guests:</label>
                <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={accommodationFilter.guests}
                    onChange={handleInputChange}
                />
            </div>
            <div className="filter-group">
                <label htmlFor="fromDate">From:</label>
                <input
                    type="date"
                    id="fromDate"
                    name="fromDate"
                    value={accommodationFilter.fromDate}
                    onChange={handleInputChange}
                />
            </div>
            <div className="filter-group">
                <label htmlFor="toDate">To:</label>
                <input
                    type="date"
                    id="toDate"
                    name="toDate"
                    value={accommodationFilter.toDate}
                    onChange={handleInputChange}
                />
            </div>
            <button className="filter-button" onClick={changeFilter}>
                Filter
            </button>
        </div>
    );
}

export default AccommodationFilter;
