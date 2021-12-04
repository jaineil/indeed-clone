import axios from "axios";
import React from "react";
import { Card } from "react-bootstrap";
import { Row, Col, Button } from "reactstrap";
import endPointObj from "../../endPointUrl";
import { useEffect, useState } from "react";

const ReviewTab = () => {
	const getNewReviews = async (req, res) => {
		try {
			const response = await axios.get(
				`${endPointObj.url}/admin/get-review-requests?filter=PENDING`
			);
			//   console.log(response);
			setReviews(response.data);
		} catch (err) {
			console.error(err);
		}
	};

	const updateReviewStatus = async (e) => {
		try {
			const payload = {
				reviewId: e.target.id,
				companyId: e.target.name,
				status:
					e.target.innerText === "Accept review"
						? "APPROVED"
						: "REJECTED",
			};
			const response = await axios.put(
				`${endPointObj.url}/admin/update-review`,
				payload
			);
			console.log(response);
			getNewReviews();
		} catch (err) {
			console.error(err);
		}
	};

	const createReviewCard = (review) => {
		return (
			<Card style={{ width: "1000px" }} className="my-3" key={review._id}>
				<Card.Header>
					<Row>
						<Col>Company: {review.companyName}</Col>
						<Col>Status: {review.isReviewApprovedByAdmin}</Col>
					</Row>
				</Card.Header>
				<Card.Body>
					<Card.Title>{review.reviewTitle}</Card.Title>
					<Card.Text>{review.reviewBody}</Card.Text>
					<Card.Text>
						<b>Pros: </b>
						{review.pros.join()}
					</Card.Text>
					<Card.Text>
						<b>Cons: </b>
						{review.cons.join()}
					</Card.Text>
					<Card.Text>
						<b>CEO Approval rating: </b>
						{review.ceoApprovalRating}/5
					</Card.Text>
					<Card.Text>
						<b>Interview Tips: </b>
						{review.interviewTips.join()}
					</Card.Text>
					<Card.Text>
						<b>Helpful count: </b>
						{review.reviewHelpfulCount}
					</Card.Text>
					<Card.Text>
						<b>Unhelpful count: </b>
						{review.reviewNotHelpfulCount}
					</Card.Text>
					<Button
						id={review._id}
						name={review.companyId}
						onClick={updateReviewStatus}
					>
						Accept review
					</Button>
					<Button
						id={review._id}
						name={review.companyId}
						onClick={updateReviewStatus}
						className="mx-5"
					>
						Reject review
					</Button>
				</Card.Body>
			</Card>
		);
	};

	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		getNewReviews();
	}, []);
	return <>{reviews.length ? reviews.map(createReviewCard) : ""}</>;
};

export default ReviewTab;
