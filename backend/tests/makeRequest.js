import axios from "axios";

makeGETRequest = async (url) => {
	const response = await axios.get(url);
	return response.data;
};

makePOSTRequest = async (url, data) => {
	const response = await axios.post(url, data);
	return response.data;
};

// makePOSTRequest('http://localhost:3001/favourites', {customer_ID: 26, restaurant_ID: 2})

export default makeGETRequest
export default makePOSTRequest
