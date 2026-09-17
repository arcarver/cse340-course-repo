// import 
import { getAllOrganizations } from "../models/organization.js";

// define 
const showOrganizationsPage = async (req, res) => {
    const organization = await getAllOrganizations();
    // console.log(organization);
      
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organization });
};

// export 
export { showOrganizationsPage };