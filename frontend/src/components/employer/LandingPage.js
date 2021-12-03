import Jobs from './Jobs';
import { useEffect } from "react";
import endPointObj from '../../endPointUrl.js';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import RedirectUnauthorized from './RedirectUnauthorized';
import { Redirect } from 'react-router';

export default function LandingPage(props) {

    const mongoId = localStorage.getItem('userId');
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
            <RedirectUnauthorized />
            <Jobs />
        </div>
    );
}