import EmployerDetails from "../../../db/models/mongo/employerDetails.js";
export class EmployerController {
	
    getprofile = async (req, res) => {
		try {
			
            const employerDetails = await EmployerDetails.findOne({_id: req.query.employerId}).populate('companyId');

			if (!employerDetails) {
				res.status(404).send({
					message: "Could not find employer profile",
				});
			} else {
				res.status(200).send(employerDetails);
			}
		} catch (err) {
			console.error(err);
		}
	};

	updateprofile = async(req, res) => {

		const { employerId, firstName, lastName, role, contactNumber, street, apt, city, state, country, zip} = req.body;
 
		const companyLocation = {
			street: street,
			apt : apt,
			city : city,
			state : state,
			country : country,
			zip : zip
		}

        const update = { firstName, lastName, role, contactNumber, companyLocation }
        const result = await EmployerDetails.findByIdAndUpdate(employerId, update, { new:true });
        res.status(200).send(result);
	};


}

export default EmployerController;
