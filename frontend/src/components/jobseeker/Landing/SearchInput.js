import { Box } from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from "axios";
import endPointObj from "../../../endPointUrl";

function SearchInput({ placeholder, classes, setValue, value, setError }) {
	const [display, setDisplay] = useState(false);
	const [options, setOptions] = useState([]);
	const wrapperRef = useRef(null);

	useEffect(() => {
		window.addEventListener("mousedown", handleClickOutside);
		return () => {
			window.removeEventListener("mousedown", handleClickOutside);
		};
	});

	const handleClickOutside = (event) => {
		const { current: wrap } = wrapperRef;
		if (wrap && !wrap.contains(event.target)) {
			setDisplay(false);
		}
	};

	const handleSuggestionsInput = (e) => {
		setValue(e.target.value);
		setError(false);

		const query = e.target.value;

		axios
			.get(endPointObj.url + "/job-seeker/search-suggestions", {
				params: {
					query: query,
				},
			})
			.then((response) => {
				console.log(response.data.response);
				const fetchedOptions = response.data.response;
				setOptions(fetchedOptions);
			})
			.catch((err) => console.error(err));
	};

	return (
		<Box ref={wrapperRef} className={classes.suggestionInput}>
			<OutlinedInput
				placeholder={placeholder}
				className={classes.input}
				onKeyUp={() => setDisplay(value !== "" ? true : false)}
				value={value}
				onChange={handleSuggestionsInput}
			/>
			{display && (
				<div
					style={{ position: "absolute" }}
					className={classes.autocontainer}
				>
					{options
						?.filter(
							(option) =>
								option
									.toLowerCase()
									.indexOf(value.toLowerCase()) > -1
						)
						.map((option, index) => {
							return (
								<div
									key={index}
									onClick={() => {
										setValue(option);
										setDisplay(false);
									}}
									style={{ cursor: "pointer" }}
								>
									<span style={{ marginLeft: "15px" }}>
										{option}
									</span>
								</div>
							);
						})}
				</div>
			)}
		</Box>
	);
}

export default SearchInput;
