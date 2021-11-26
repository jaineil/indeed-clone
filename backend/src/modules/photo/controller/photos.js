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
}

export default PhotoController;
