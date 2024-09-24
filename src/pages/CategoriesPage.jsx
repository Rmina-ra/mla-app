import { useEffect, useState } from "react";
import homeIcon from "../assets/images/categories/home.svg";
import { Link } from "react-router-dom";
import LoadingRow from "../components/LoadingRow";
import axios from "axios";
import Error from "../components/Error";

function CategoriesPage(){

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() =>{
        async function fetchCategories(){
            try{
                setIsLoading(true);
                const response = await axios.get(`https://91b694f6823e2f4f.mokky.dev/category`);
                setCategories(response.data);
            }catch(e){
                setIsError(true);
                console.log(e);
            }finally{
                setIsLoading(false);
            }
        }
        fetchCategories();
        
    }, []);
    
    if (isError){
        return <Error/>;
    }

     return( 
        <section class="mobile-block">
            <div class="mobile-block_header is-secondary">
                РАЗДЕЛЫ
            </div>
            {isLoading ? (<LoadingRow/>) : (
                 <div class="container">
                    <div class="category-row">
                        <Link to="/" class="category-item">
                            <img src={homeIcon} alt="Home" class="category-item_img"/>
                            <span class="category-item_title">Новости</span>
                        </Link>
                        {categories.map((category) => (
                            <Link to={`/category/posts/${category.id}`} class="category-item">
                                <img src={category.imageUrl} alt={category.name} class="category-item_img"/>
                                <span class="category-item_title">{category.name}</span>
                             </Link>
                        ))}
                    </div>
                </div> 
            ) }
                 
        </section>
    );
}

export default CategoriesPage;