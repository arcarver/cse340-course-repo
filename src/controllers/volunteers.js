import { getProjectDetails } from "../models/projects.js";
import { isVolunteer } from "../models/volunteers.js";

const checkIfVolunteer = async (req, res, next) => {
    const user_id = req.session.user.user_id;
    const project_id = req.session.project.project_id;
    const verified = await isVolunteer(user_id, project_id); 
    if (verified) {  next();}
   
};

export {checkIfVolunteer}