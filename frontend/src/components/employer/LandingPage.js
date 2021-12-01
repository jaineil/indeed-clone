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
    useEffect(() => {
        dispatch(getEmployerProfile(mongoId));
    }, [])

    const employerProfile = useSelector((state) => state.employer.employerProfile);

    if (employerProfile) {
        localStorage.setItem('employerId', employerProfile._id)
        localStorage.setItem('employerProfile', JSON.stringify(employerProfile));
        if (employerProfile.companyId) {
            localStorage.setItem('companyId', employerProfile.companyId._id)
            localStorage.setItem('companyProfile', JSON.stringify(employerProfile.companyId));
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

    return (
        <div>
            <Jobs />
        </div>
    );
}