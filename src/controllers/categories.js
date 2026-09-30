// import 
import { getAllCategories } from "../models/categories.js";
import { getCategoryByID } from "../models/categories.js";

import { getAllProjectsForCategory } from "../models/categories.js";

// define 
const showCategoriesPage = async (req, res) => {
  const category = await getAllCategories();
  // console.log(category);

    const title = 'Service Project Categories';
    res.render('categories', { title, category });
};

const showCategoryDetailsPage = async (req, res) => {
    const { category_id } = req.params;
    const projectList = await getAllProjectsForCategory(category_id);
    const categoryName = projectList.length > 0 ? projectList[0].category_name : "Category";

    console.log("Category is:", projectList);
    res.render('category.ejs', {projects: projectList, category_name: categoryName, title: 'Category Details' });
    
}
// export 
export { showCategoriesPage, showCategoryDetailsPage };
