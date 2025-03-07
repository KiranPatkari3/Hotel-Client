import React, { useState } from "react"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRangePicker } from "react-date-range"
import './DateSlider.css' // Import the custom CSS file

const DateSlider = ({ onDateChange, onFilterChange }) => {
	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null,
		key: "selection"
	})

	const handleSelect = (ranges) => {
		setDateRange(ranges.selection)
		onDateChange(ranges.selection.startDate, ranges.selection.endDate)
		onFilterChange(ranges.selection.startDate, ranges.selection.endDate)
	}

	const handleClearFilter = () => {
		setDateRange({
			startDate: null,
			endDate: null,
			key: "selection"
		})
		onDateChange(null, null)
		onFilterChange(null, null)
	}

	return (
		<div className="date-slider-container">
			<h5 className="date-slider-title">Filter Bookings by Date</h5>
			<DateRangePicker
				ranges={[dateRange]}
				onChange={handleSelect}
				className="date-range-picker"
			/>
			<div className="button-container">
				<button className="btn btn-filter" onClick={handleClearFilter}>
					Clear Filter
				</button>
			</div>
		</div>
	)
}

export default DateSlider
