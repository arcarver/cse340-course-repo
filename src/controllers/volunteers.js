import { getProjectDetails } from "../models/projects.js";
import { isVolunteer, addVolunteer, removeVolunteer } from "../models/volunteers.js";

const checkIfVolunteer = async (req, res, next) => {
    const user_id = req.session.user.user_id;
    const project_id = req.session.project.project_id;
    const verified = await isVolunteer(user_id, project_id); 
    if (verified) {  next();}
   
};

const handleVolunteer = async (req, res) => {
    const user_id = req.session.user.user_id;
    const { project_id } = req.body;
    await addVolunteer(user_id, project_id, "title");
    res.redirect('/dashboard');
}

const cancelSignup = async (req, res) => {
    const user_id = req.session.user.user_id;
    const { project_id } = req.body;
    await removeVolunteer(user_id, project_id, "title");
    res.redirect('/dashboard');
}

export {checkIfVolunteer, handleVolunteer, cancelSignup}