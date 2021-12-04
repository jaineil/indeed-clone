import conn from "../../../db/config/mysql.config.js"
import JobSeekerDetails from "../../../db/models/mongo/jobSeekerDetails.js";
import EmployerDetails from "../../../db/models/mongo/employerDetails.js"
import bcrypt from 'bcrypt';

export class UserController {
	login = async (req, res) => {
		try {
                console.log("Inside backend login", req.body);
                let sql = "SELECT * FROM users WHERE emailId = ?";
                const emailId = req.body.emailId;
                const pass = req.body.pass;
                
                conn.query(sql, [emailId], function (err, result) {
                    if (err) throw err;
                    else if(result.length==0){
                        console.log("hii");
                        res.status(404).send({
                        message: "User not found" });
                    }
                    else{
                        if (bcrypt.compareSync(pass, result[0].pass)) {
                            res.status(200).send(result)
                        }
                        else{
                            res.status(400).send({
                                message: "Invalid Credentials"
                            });
                        }
                    }
                });
 
        }catch (err) { console.error(err); }
    };


    signup = async (req, res) => {
		try {
            const {emailId, pass, userPersona="ADMIN"} = req.body
            const hashpass = await bcrypt.hash(pass, 10);
            var mongoId
        
            let sql = "INSERT INTO users (emailId, pass, userPersona) VALUES (?, ?, ?)"
            conn.query(sql, [emailId, hashpass, userPersona],
                async (err, result) => {
                    if (err) {
                        res.status(500);
                        console.log(err);
                        res.send("SQL error, Check log for more details");
                    } else {
                        const id = result.insertId

                        switch(userPersona){
                            case 'JOB_SEEKER':
                                const jobSeeker = new JobSeekerDetails({userId: id, emailId: emailId})
                                await jobSeeker.save()
                                mongoId = jobSeeker._id.valueOf()
                                break
                            case 'EMPLOYER':
                                const employer = new EmployerDetails({userId: id, emailId: emailId})
                                await employer.save()
                                mongoId = employer._id.valueOf()
                                break
                            default:
                                mongoId = ''
                        }

                        let sql = `UPDATE users SET mongoId = ? WHERE userId = ?`;
                        const user = conn.query(sql, [mongoId, id ])
                        res.status(200);
                        res.send({message: "User Created"});
                    }
                }
            );   
        }catch (err) { console.error(err); }
    };

    getuser = async (req, res) => {
		try {
                let sql = "SELECT * FROM users WHERE emailId = ?";
                const emailId = req.body.emailId;
                conn.query(sql, [emailId], function (err, result) {
                    if (err) throw err;
                    else{
                        res.status(200).send(result);
                    }
                });
 
        }catch (err) { console.error(err); }
    };



}
export default UserController;
