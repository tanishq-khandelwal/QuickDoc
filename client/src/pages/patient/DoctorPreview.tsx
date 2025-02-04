import Layout from "@/Layout";
import { Navbar } from "@/Navbar";
import { fetchDoctorAvailabilty } from "@/redux/actions/patient/doctorAvailabiltyAction";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const DoctorPreview=()=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(fetchDoctorAvailabilty());
    },[dispatch])




    return(
        <Layout>
            <Navbar/>
        <div>
            <h1>Doctor Preview</h1>
        </div>
        </Layout>
    )
}

export default DoctorPreview;