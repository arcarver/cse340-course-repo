// import 
import { getAllCategories } from "../models/categories";

// define 
const showCategoriesPage = async (req, res) => {
  const category = await getAllCategories();
  // console.log(category);

    const title = 'Service Project Categories';
    res.render('categories', { title, category });
};

// export 
export { showCategoriesPage };
