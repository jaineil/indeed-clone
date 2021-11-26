import conn from "../../../db/config/mysql.config.js"
import bcrypt from 'bcrypt';
export class UserController {
	login = async (req, res) => {
		try {
                let sql = "SELECT * FROM users WHERE emailId = ?";
                const emailId = req.body.emailId;
                const pass = req.body.pass;
                
                conn.query(sql, [emailId], function (err, result) {
                    if (err) throw err;
                    else if(result.length==0){
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
                            })
                        }
                    }
                });
 
        }catch (err) { console.error(err); }
    };


    signup = async (req, res) => {
		try {
            console.log("Request reached!");
            const {emailId, pass, userPersona} = req.body
            const hashpass = await bcrypt.hash(pass, 10);
            let sql = "INSERT INTO users (emailId, pass, userPersona) VALUES (?, ?, ?)"
            conn.query(sql, [emailId, hashpass, userPersona],
                (err, result) => {
                    if (err) {
                        res.status(500);
                        console.log(err);
                        res.send("SQL error, Check log for more details");
                    } else {
                        res.status(200);
                        res.send("User added");
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
