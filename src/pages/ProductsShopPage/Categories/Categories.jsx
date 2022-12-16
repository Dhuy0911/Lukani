import { message, notification } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import appAxios from "../../../service/axios";

const Categiores = () => {
  const [categories, setCategories] = useState([]);
  const allItemCategory = {
    id: null,
    name: 'All'
}

  const getCategories = async () => {
    try {
      const categoriesData = await appAxios.get('/categories')

      setCategories(categoriesData.data)
      categories.unshift(allItemCategory)
    } catch (e) {
      notification.error({
        title: 'error',
        message: 'Something went wrong'
      })
    }
  }

  useEffect(() => {
    getCategories();
  }, [])
  return <div className='categories'>
    <div className="categories-wrapper">
      <div className="container">
        <div className="row">
          <div className="categories__list">
            <h3>CATEGORY</h3><hr />
            <ul>
              <li>
                <Link to={'/shop'} >All Products</Link>
              </li>
            </ul>
            {
              categories.map((categoriesItem) => {
                return <ul key={categoriesItem.id}>
                  <li>
                    <Link defaultValue={categoriesItem.name} onClick={{

                    }} to={`/shop?category=:${categoriesItem.categories}`}>
                      {categoriesItem.categories}
                    </Link>
                  </li>
                </ul>
              })
            }

          </div>
        </div>
      </div>
    </div>

  </div>

    ;

}
export default Categiores