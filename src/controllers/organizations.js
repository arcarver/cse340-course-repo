// import 
import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

// define 
const showOrganizationsPage = async (req, res) => {
    const organization = await getAllOrganizations();
    // console.log(organization);
      
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organization });
};


const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', {title, organizationDetails, projects});
};

// Export any controller functions
export { showOrganizationsPage, showOrganizationDetailsPage };