import CompanyPhotos from "../../../db/models/mongo/companyPhotos.js";

class PhotoController {
	create = async (req, res) => {
		try {
			const newPhoto = new CompanyPhotos({
				userId: req.body.userId,
				companyId: req.body.companyId,
				companyPhotoUrl: req.body.companyPhotoUrl,
			});
			const response = await newPhoto.save();
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	getRequests = async (req, res) => {
		try {
			let photos = [];
			if (req.query.filter) {
				photos = await CompanyPhotos.find({
					isPhotoApprovedByAdmin: req.query.filter,
				});
			} else {
				console.log("in else")
				photos = await CompanyPhotos.find({});
			}
			res.status(200).send(photos);
		} catch (err) {
			console.error(err);
		}
	};



	updateRequest = async (req, res) => {
		try {
			const { photoId, companyId, status } = req.body;

			const response = await CompanyPhotos.findOneAndUpdate(
				{
					companyId: companyId,
					_id: photoId,
				},
				{
					isPhotoApprovedByAdmin: status,
				}
			);

			res.status(200).send({ message: "Photo Status Updated" });
		} catch (err) {
			console.error(err);
		}
	};
}

export default PhotoController;
