// import 
import { getAllProjects } from "../models/projects.js";
import { getUpcomingProjects } from "../models/projects.js";
import { getProjectDetails } from "../models/projects.js";
import { getAllCategoriesForProject } from "../models/categories.js";
import { createProject } from "../models/projects.js";
import { getAllOrganizations } from "../models/organizations.js";
import { body, validationResult } from "express-validator";

// Validation
const projectValidation = [
  body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required')
        .isLength({ min: 3, max: 1200 })
        .withMessage('Project title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required')
        .isLength({ max: 1000 })
        .withMessage('Project description cannot exceed 1000 characters'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('location is required')
        .isLength({ max: 200})
        .withMessage('Project location cannot exceed 200 characters'),
    body('project_date')
        .notEmpty()
        .withMessage('Date is required')
        .isDate() // could have also used .isISO8601()
        .withMessage('Must have a valid date'),
    body('organization_id')
        .notEmpty()
        .withMessage('Organization is required')
        .isInt()
        .withMessage('Please select a valid organization from these options')
];

const NUMBER_OF_UPCOMING_PROJECTS = 5;
// define 
const showProjectsPage = async (req, res) => {
  const project = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  console.log("UPCOMING PROJECTS: ", project);
  
  
  const title = 'Upcoming Service Projects';
    res.render('projects', { title, project });
};

const showProjectDetailsPage = async (req, res) => {
  const { project_id } = req.params;
  const projectDetails = await getProjectDetails(project_id);
  const showCategories = await getAllCategoriesForProject(project_id);

  console.log("DATABASE RESULTS is:", projectDetails);
  console.log("categories are:", showCategories);
  res.render('project.ejs', { project: projectDetails[0], title: 'Project Details', categories: showCategories });
  }

const showNewProjectForm = async (req, res) => {
  const organizations = await getAllOrganizations(); 
  const title = 'Add New Servide Project'; 
  
  res.render('new-project', { title, organizations }); 
}
  
const processNewProjectForm = async (req, res) => {
  // process validation
  const results = validationResult(req);
  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash('error', error.msg);
    });

    return res.redirect('/new-project');
  }
  // Extradct form date from req.body
 
  const { title, description, location, project_date, organization_id } = req.body;
  
  try {
    //Create the new project in the database
    const newProjectID = await createProject(title, description, location, project_date, organization_id);

    req.flash('success', 'New service project created successfully!');
    res.redirect(`/project/${newProjectID}`);

  } catch (error) {
    console.error('Error creating new project:', error);
    req.flash('error', 'There was an error creating the service project.');
    res.redirect('/new-project');
  }

}

// export 
export { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation };
