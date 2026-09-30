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
    const categoryDetails = await getAllProjectsForCategory(category_id);

    console.log("Category is:", categoryDetails);
    res.render('category.ejs', { category: categoryDetails[0], title: 'Category Details' });
    
}
// export 
export { showCategoriesPage, showCategoryDetailsPage };
