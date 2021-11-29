import JobSeekerDetails from "../../../db/models/mongo/jobSeekerDetails.js";
import fs from 'fs';
import multiparty from 'multiparty';
import fileType from 'file-type';
import uploadFile from '../../../db/config/s3_config.js';

export class JobSeekerController {
	
	getprofile = async (req, res) => {
		try {
			const jobSeekerDetails = await JobSeekerDetails.findById(
				req.query.jobseekerId
			);
			if (!jobSeekerDetails) {
				res.status(404).send({
					message: "Could not find jobseeker profile",
				});
			} else {
				res.status(200).send(jobSeekerDetails);
			}
		} catch (err) {
			console.error(err);
		}
	};

	updateprofile = async(req, res) => {

		try {

		const { jobseekerId, firstName, lastName, profilePicture='', resumes=[], coverLetters=[], contactNumber, street, apt, city, state, country, zip, savedJobs=[]} = req.body;
 
		const address = {
			street: street,
			apt : apt,
			city : city,
			state : state,
			country : country,
			zip : zip
		}

        console.log(req.body);
        const update = { firstName, lastName, profilePicture, resumes, coverLetters, contactNumber, address, savedJobs }
        const result = await JobSeekerDetails.findByIdAndUpdate(jobseekerId, update, { new:true });
        console.log(result);
        res.status(200).send(result);
	} catch (err) {
		console.error(err);
	}

	};

	unsaveJob = async (req, res) => {
		try{
		const {jobseekerId, jobId} = req.body
		const jobseeker = await JobSeekerDetails.updateOne({ jobseekerId : jobseekerId}, 
			{$pull: {savedJobs: {jobId: jobId}}}, 
			{multi: true});

		res.status(200).send(jobseeker);
		} catch (err){
			console.error(err);
		}
	}


	uploadResume = async (req, res) => {
		try {
			const { jobseekerId, resumeName } = req.query;
			const form = new multiparty.Form();
			//console.log(req);
			form.parse(req, async (error, fields, files) => {
			if (error) {
				return res.status(500).send(error);
			}
			else {
				console.log(form.file)
				const path = files.file[0].path;
				const buffer = fs.readFileSync(path);
				const type = await fileType.fromBuffer(buffer);
				const fileName = `resume/${jobseekerId}/${resumeName}`;
				const s3res = await uploadFile(buffer, fileName, type);
				console.log("Success: ", s3res);
				if (s3res) {

					const resume = {
						url : s3res.Location,
						name : resumeName
					}
					const jobseeker = await JobSeekerDetails.findById(jobseekerId);
					jobseeker.resumes.push(resume);

				}
				else {
					res.status(500).send({ message : "Resume not uploaded!" })
				}
			
			}
		});
	 	} catch (err) {
			console.error(err)
		}
	}

	uploadS3 = async (req, res) => {
		const rest_id = req.params.rest_id;
		const form = new multiparty.Form();
		form.parse(req, async (error, fields, files) => {
		try {
			console.log(form.file)
			const path = files.file[0].path;
			const buffer = fs.readFileSync(path);
			const type = await fileType.fromBuffer(buffer);
			const fileName = `restaurantImages/${rest_id}`;
			const s3res = await uploadFile(buffer, fileName, type);
			console.log("Success: ", s3res);
			if (s3res) {
			  const data = {
				rest_id: rest_id,
				url: s3res.Location
			  }
			}
			else {
			  rest.status(400).json({ msg: "Image was not uploaded!" })
			}
		} catch (err) {
			console.log("Upload Error: ", err);
			return res.status(500).send(err);
		}
		
		});
	}

}

export default JobSeekerController;
