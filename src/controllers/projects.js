// import 
import { getAllProjects } from "../models/projects.js";
import { getUpcomingProjects } from "../models/projects.js";
import { getProjectDetails } from "../models/projects.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;
// define 
const showProjectsPage = async (req, res) => {
  const project = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  // console.log(project);
  
  
  const title = 'Upcoming Service Projects';
    res.render('projects', { title, project });
};

const showProjectDetailsPage = async (req, res) => {
  const { project_id } = req.params;
  const projectDetails = await getProjectDetails(project_id);

  res.render('project.ejs', { project: projectDetails });
  }

// export 
export { showProjectsPage, showProjectDetailsPage };
