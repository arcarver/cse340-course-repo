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
import { categoryValidation } from './controllers/categories.js';
import { showUserRegistrationForm, processUserRegistrationForm } from './controllers/users.js';
import { showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole } from './controllers/users.js';
import { showCurrentUsers } from './controllers/users.js';
import { addVolunteer, isVolunteer } from './models/volunteers.js';
import { checkIfVolunteer, handleVolunteer, cancelSignup } from './controllers/volunteers.js';
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
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
// error-handling routes
router.get('/test-error', testErrorPage);
// edit organization route
router.get('/edit-organization/:organization_id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:organization_id', requireRole('admin'), organizationValidation, processEditOrganizationForm);
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
// handle the assign cattegorie to projects
router.get('/assign-categories/:project_id', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:project_id', requireRole('admin'), processAssignCategoriesForm);
//edit projects
router.get('/edit-project/:project_id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:project_id', requireRole('admin'), projectValidation, processEditProjectForm);   
// new categories
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
// edit categories
router.get('/edit-category/:category_id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:category_id', requireRole('admin'), categoryValidation, processEditCategoryForm);

router.get('/category/:category_id', showCategoryDetailsPage);
// hashing
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
// login and logout
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
// dashboard stuff
router.get('/dashboard', requireLogin, showDashboard);
// User page
router.get('/users', requireRole('admin'), showCurrentUsers);
// volunteer stuff
router.get('/dashboard/signup', requireLogin, showDashboard);
router.post('/dashboard/signup', requireLogin, handleVolunteer);
router.post('/dashboard/cancel', requireLogin, cancelSignup )

export default router;