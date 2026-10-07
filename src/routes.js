import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectsPage } from './controllers/projects.js';
import { processEditCategoryForm, processNewCategoryForm, showCategoriesPage, showCategoryDetailsPage, showEditCategoryForm, showNewCategoryForm } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showProjectDetailsPage } from './controllers/projects.js';
import { showNewOrganizationForm } from './controllers/organizations.js';
import { processNewOrganizationForm } from './controllers/organizations.js';
import { organizationValidation } from './controllers/organizations.js';
import { showEditOrganizationForm } from './controllers/organizations.js';
import { processEditOrganizationForm } from './controllers/organizations.js';
import { showNewProjectForm, processNewProjectForm } from './controllers/projects.js';
import { projectValidation } from './controllers/projects.js';
import { showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';
import { showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
// appartently you can put many function together if they are from the same file;



const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
// Route for organization details page
router.get('/organization/:organization_id', showOrganizationDetailsPage);
// Route for project details page
router.get('/project/:project_id', showProjectDetailsPage);
// Route for category details page
router.get('/category/:category_id', showCategoryDetailsPage);
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
// error-handling routes
router.get('/test-error', testErrorPage);
// edit organization route
router.get('/edit-organization/:organization_id', showEditOrganizationForm);
router.post('/edit-organization/:organization_id', organizationValidation, processEditOrganizationForm);
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
// handle the assign cattegorie to projects
router.get('/assign-categories/:project_id', showAssignCategoriesForm);
router.post('/assign-categories/:project_id', processAssignCategoriesForm);
//edit projects
router.get('/edit-project/:project_id', showEditProjectForm);
router.post('/edit-project/:project_id', projectValidation, processEditProjectForm);   
// new categories
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', projectValidation, processNewCategoryForm);
// edit categories
router.get('/edit-category/:category_id', showEditCategoryForm);
router.post('/edit-category/:category_id', projectValidation, processEditCategoryForm);


export default router;