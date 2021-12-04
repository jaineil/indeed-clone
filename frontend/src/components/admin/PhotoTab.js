import axios from "axios";
import React from "react";
import endPointObj from "../../endPointUrl";
import { useState, useEffect } from "react";
import { Card, Image } from "react-bootstrap";
import { Row, Col, Button } from "reactstrap";

const PhotoTab = () => {
	const getNewPhotos = async (req, res) => {
		try {
			const response = await axios.get(
				`${endPointObj.url}/admin/get-photo-requests?filter=PENDING`
			);
			// console.log(response);
			setPhotos(response.data);
		} catch (err) {
			console.error(err);
		}
	};

	const updatePhotoStatus = async (e) => {
		try {
			const payload = {
				photoId: e.target.id,
				companyId: e.target.name,
				status:
					e.target.innerText === "Accept photo"
						? "APPROVED"
						: "REJECTED",
			};
			const response = await axios.put(
				`${endPointObj.url}/admin/update-photo`,
				payload
			);
			console.log(response);
			getNewPhotos();
		} catch (err) {
			console.error(err);
		}
	};

	const createPhotoCard = (photo) => {
		return (
			<Card style={{ width: "800px" }} className="my-3">
				<Card.Header>
					<Row>
						<Col>
							Company: {photo.companyDetails[0].companyName}
						</Col>
						<Col>Status: {photo.isPhotoApprovedByAdmin}</Col>
					</Row>
				</Card.Header>
				<Card.Body>
					<Card.Text>
						<Image
							src={photo.companyPhotoUrl}
							style={{ width: "600px", height: "350px" }}
						></Image>
					</Card.Text>
					<Button
						id={photo._id}
						name={photo.companyId}
						onClick={updatePhotoStatus}
					>
						Accept photo
					</Button>
					<Button
						id={photo._id}
						name={photo.companyId}
						onClick={updatePhotoStatus}
						className="mx-5"
					>
						Reject photo
					</Button>
				</Card.Body>
			</Card>
		);
	};

	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		getNewPhotos();
	}, []);
	return <>{photos.length ? photos.map(createPhotoCard) : ""}</>;
};

export default PhotoTab;
