// import 
import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';
import { createOrganization } from '../models/organizations.js';
import { body, validationResult } from 'express-validator';


// Define validation and sanitization rules for organization form
// Define validation rules for organization form
const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required')
        .isLength({ max: 500 })
        .withMessage('Organization description cannot exceed 500 characters'),
    body('contactEmail')
        .normalizeEmail()
        .notEmpty()
        .withMessage('Contact email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
];

// define 
const showOrganizationsPage = async (req, res) => {
    const organization = await getAllOrganizations();
    console.log(organization);
      
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organization });
};


const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.organization_id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const project = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';
    console.log ("ORGANIZATION DETAILS IS:", organizationDetails);
    console.log("DATABASE RESULTS IS:", project);
    res.render('organization', { title, organization: organizationDetails, project});
};

const showNewOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';
    // req.flash('error', 'i see you');

    res.render('new-organization', { title });
}

const processNewOrganizationForm = async (req, res) => {
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new organization form
        return res.redirect('/new-organization');
    }

    const { name, description, contactEmail } = req.body;
    const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations    

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);
    req.flash('success', 'Organization added successfully!');
    res.redirect(`/organization/${organizationId}`);
};

const showEditOrganizationForm = async (req, res) => {
    const organizationId = req.params.organization_id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    console.log(organizationDetails);

    const title = "Organization: Edit Page";
    res.render('edit-organization', { title, organizationDetails });

}

const processEditOrganizationForm = async (req, res) => {
    const organizationDetails = req.params.organization_id;
    const { name, description, contactEmail, logoFilename } = req.body
    await updateOrganization(organizationDetails, name, description, contactEmail, logoFilename);

    // set flash for success
    req.flash('success', 'Organization was updated successfully!');
    res.redirect('/organization/${organizationDetails');
};

// Export any controller functions
export {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
};