// import 
import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';
import { createOrganization } from '../models/organizations.js';

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

    res.render('new-organization', { title });
}

const processNewOrganizationForm = async (req, res) => {
    const { name, description, contactEmail } = req.body;
    const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);
    res.redirect(`/organization/${organizationId}`);
};
// Export any controller functions
export { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm };