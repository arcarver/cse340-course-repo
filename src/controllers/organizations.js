// import 
import { getAllOrganizations } from "../models/organizations";

// define 
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    // console.log(organization);
      
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
};

// export 
export { showOrganizationsPage };