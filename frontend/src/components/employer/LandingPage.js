import Jobs from './Jobs';
import { useEffect } from "react";
import endPointObj from '../../endPointUrl.js';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { createEmployerAndCompanyProfile, getEmployerProfile, getCompanyProfile } from '../../_actions/employerAction';

export default function LandingPage(props) {

    const dispatch = useDispatch();
    const mongoId = "61a2935f773d3378523d18f7";
    // const mongoId = localStorage.getItem('userId'); TBA by Vineet Batthina
    useEffect(async() => {
        try {
            const employer = await axios.get(endPointObj.url+ "/employer/get-profile?employerId=" + mongoId);
    
            console.log("Returned an Employer from backend: " + JSON.stringify(employer.data));
            if (employer.data) {
                localStorage.setItem('employerId', employer.data._id)
                localStorage.setItem('employerProfile', JSON.stringify(employer.data));
                if (employer.data.companyId) {
                    localStorage.setItem('companyId', employer.data.companyId._id)
                    localStorage.setItem('companyProfile', JSON.stringify(employer.data.companyId));
                }
                else {
                    localStorage.setItem('companyId', "");
                    localStorage.setItem('companyProfile', JSON.stringify({}));
                }
            }
            else {
                localStorage.setItem('employerId', "");
                localStorage.setItem('companyId', "");
                localStorage.setItem('employerProfile', JSON.stringify({}));
                localStorage.setItem('companyProfile', JSON.stringify({}));
            }
           
        }
        catch (err) {
            console.log("Error in fetching employer"+err);
        }
    }, [])

    

    return (
        <div>
            <Jobs />
        </div>
    );
}