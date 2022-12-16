import '../ProductsList/ProductsList'
import Products from '../ProductsList/Products'
import Loading from '../../../components/Loading/Loading';


const ProductsList = (props) => {
    const { loading, products,search } = props;

    return <>
        {
           products.map((product) => {
                return <>
                    <Products search={search} product={product} key={product.id} />
                </>
            })
        }
    </>

}
export default ProductsList