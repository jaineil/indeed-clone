import CompanyPhotos from "../../../db/models/mongo/companyPhotos.js";
import fs from "fs";
import multiparty from "multiparty";
import fileType from "file-type";
import uploadFile from "../../../db/config/s3_config.js";

class PhotoController {
	create = async (req, res) => {
		try {
			const { companyId, jobSeekerId } = req.query;
			const form = new multiparty.Form();
			//console.log(req);
			form.parse(req, async (error, fields, files) => {
				if (error) {
					return res.status(500).send(error);
				} else {
					console.log(files);
					let photos = [];
					for (let i = 0; i < files.file.length; i++) {
						const path = files.file[i].path;
						const buffer = fs.readFileSync(path);
						const type = await fileType.fromBuffer(buffer);
						const fileName = `photo/${companyId}/${jobSeekerId}/${files.file[i].originalFilename}`;
						const s3res = await uploadFile(buffer, fileName, type);
						console.log("Success: ", s3res);
						if (s3res) {
							const newPhoto = new CompanyPhotos({
								jobSeekerId: jobSeekerId,
								companyId: companyId,
								companyPhotoUrl: s3res.Location,
							});
							const response = await newPhoto.save();
							photos.push(response);
						}
					}

					res.status(200).send(photos);
				}
			});
		} catch (err) {
			console.error(err);
		}
	};

	getRequests = async (req, res) => {
		try {
			let photos = [];
			if (req.query.filter) {
				photos = await CompanyPhotos.aggregate([
					{
						$match: {
							isPhotoApprovedByAdmin: req.query.filter,
						},
					},
					{
						$lookup: {
							from: "companydetails",
							localField: "companyId",
							foreignField: "_id",
							as: "companyDetails",
						},
					},
					{
						$project: {
							_id: 1,
							jobSeekerId: 1,
							companyId: 1,
							companyPhotoUrl: 1,
							isPhotoApprovedByAdmin: 1,
							"companyDetails.companyName": 1,
						},
					},
				]);
			} else {
				console.log("in else");
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
