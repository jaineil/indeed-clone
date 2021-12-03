import { useEffect, useState } from "react";
import { Redirect } from 'react-router';

export default function RedirectUnauthorized(props) {
    let role = '';
    if (localStorage.getItem('role') === "EMPLOYER") {
        role = "EMPLOYER";
    }
    else if (localStorage.getItem('role') === "JOB_SEEKER") {
        role = "JOB_SEEKER";
    }
    else if (localStorage.getItem('role') === "ADMIN") {
        role = "ADMIN";
    }

    return (
        <div>
            {
                role !== "EMPLOYER" ? (role === "JOB_SEEKER" ? (<Redirect to='/home' />) : (role === "ADMIN" ? <Redirect to='/admin' /> : <Redirect to='/' />)) : null
            }
        </div>
    );
}