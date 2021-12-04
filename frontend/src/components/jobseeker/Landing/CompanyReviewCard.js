import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Link, Redirect } from "react-router-dom";

export function CompanyReviewCard({ companyId, companyName, ratingNumber }) {
	// localStorage.setItem("currentcompanyid", companyId);
	// localStorage.setItem("currentcompanyname", companyName);
	return (
		<Grid item container spacing={6}>
			<Grid item container spacing={6}>
				<Grid item>
					<h6>{companyName}</h6>
					<Grid item>
						<Rating
							style={{ color: "#6b0337" }}
							name="half-rating-read"
							defaultValue={0}
							value={ratingNumber}
							size="small"
							readOnly
						/>
						<br />
						<Link
							style={{ color: "#000000" }}
							to={{
								pathname: "/companyreview",
								state: {
									companyId: companyId,
									companyName: companyName,
								},
							}}
						>
							Reviews
						</Link>
						&nbsp;&nbsp;
						<Link
							style={{ color: "#000000" }}
							to={{
								pathname: "/companysalary",
								state: {
									companyId: companyId,
									companyName: companyName,
								},
							}}
						>
							Salaries
						</Link>
						&nbsp;&nbsp;
						<Link
							style={{ color: "#000000" }}
							to={{
								pathname: "/companyjobs",
								state: {
									companyId: companyId,
									companyName: companyName,
								},
							}}
						>
							Jobs
						</Link>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
