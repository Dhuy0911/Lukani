
import '../ProductsShopPage/ProductsShopPage.css';
import { Space, Table, Tag, Breadcrumb, Button } from 'antd';
import CartInfomation from './CartInfomation';
import ProductInCart from '../../components/Cart/ProductInCart';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addToCartFetchProduct } from '../../store/actions/cartAction';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import ListProductInCart from '../../components/Cart/ListProductInCart';
import CartTable from './CartTable';
import { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import EmtyCart from './EmtyCart';


const CartPage = (props) => {
    const { cart, setCart } = useContext(CartContext);
    let totalProduct = 0;
    let totalPrice = 0;
    cart.forEach((cartItem) => {
        totalProduct += cartItem.quantity;
        totalPrice = totalPrice + cartItem.quantity * Number(cartItem.price);
    });

    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleUpdateQuantity = (product, quantity) => {
        const newCart = [...cart];
        const productIndex = newCart.findIndex(productElement => {
            return productElement.id === product.id
        })
        console.log()


        if (productIndex !== -1) {
            if (newCart[productIndex].quantity === 1 && quantity === -1) {
                if (window.confirm('Delete this product')) {
                    newCart.splice(productIndex, 1)
                    setCart(newCart)
                    return;
                }
            }
            newCart[productIndex].quantity += quantity
            setCart(newCart)

        }

    }
    const handleRemoveProduct = (product) => {

        const newCart = [...cart];
        const productIndex = newCart.findIndex(productElement => {
            return productElement.id === product.id
        })
        if (window.confirm('Delete this product')) {
            newCart.splice(productIndex, 1)
            setCart(newCart)
            return;
        }
    }

    // const columns = [
    //     {
    //         title: "Image",
    //         dataIndex: "image",
    //         key: "image",
    //         render: (url) => {
    //             return <img src={url} style={{ width: "150px" }} />;
    //         },

    //     },
    //     {
    //         title: "Product Name",
    //         dataIndex: "name",
    //         key: "name",

    //     },
    //     {

    //         title: "Price",
    //         dataIndex: "price",
    //         key: "price",
    //     },
    //     {
    //         title: "Quantity",
    //         dataIndex: "quantity",
    //         key: "quantity",
    //         render: (quantity) => {
    //             return <>
    //                 <Button onClick={() => handleUpdateQuantity(quantity, -1)}>-</Button>
    //                 <p>{quantity}</p>
    //                 <Button onClick={() => handleUpdateQuantity(quantity, 1)}>+</Button>
    //             </>
    //         }

    //     },
    //     {
    //         title: "Actions",
    //         dataIndex: "id",
    //         key: "id",
    //         render: (id) => {
    //             return (
    //                 <>
    //                     <Button
    //                         // onClick={() => {
    //                         //     handleRemoveProduct(id)

    //                         // }
    //                         // }
    //                         type="primary"
    //                         danger
    //                         style={{
    //                             marginLeft: "7px"
    //                         }}>
    //                         x
    //                     </Button>
    //                 </>
    //             );
    //         },
    //     },
    // ];

    return <>

        <div className="breadCrumb">
            <Breadcrumb style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '20px',

            }}>
                <Breadcrumb.Item>
                    <a href="/"> Home</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Your Cart
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>


        {
            cart.length > 0 ? (<div className="container">
                <div className="row">
                    <div className='cart__wrapper d-flex justify-content-between'>
                        <div className='col-lg-12 col-md-6 col-12'>
                            <div className='table-responsive table-content mb-45 '>
                                <table>
                                    <thead style={{
                                        background: "#e1e1e1"
                                    }}>
                                        <tr className='fs-4 text-center'>
                                            <th scope="col">Image</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {
                                            cart.map((cartItem) => {
                                                return <tr key={cartItem.id}>
                                                    {/* <ProductInCart handleRemoveProduct={handleRemoveProduct} updateQuantity={handleUpdateQuantity} cartItem={cartItem} /> */}
                                                    <td><img src={cartItem.image} alt="" style={{ width: '15rem' }} /></td>
                                                    <td><p>{cartItem.name}</p></td>
                                                    <td><span>{cartItem.price}</span></td>
                                                    <td className='product-quantity'>
                                                        <div className='pro-qty d-flex'>
                                                            <Button onClick={() => handleUpdateQuantity(cartItem, -1)} className="minusItem btnCart"><i className="fa-solid fa-minus"></i></Button>
                                                            {cartItem.quantity}
                                                            <Button onClick={() => handleUpdateQuantity(cartItem, 1)} className="plusItem btnCart"><i className="fa-solid fa-plus"></i></Button>
                                                        </div>

                                                    </td>
                                                    <td><span style={{
                                                        cursor: 'pointer',
                                                        fontWeight: 700,
                                                    }} onClick={() => { handleRemoveProduct(cartItem) }} >
                                                        <button class="btn">
                                                            <span class="icon-wrapper">
                                                                <svg class="icon" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    </span></td>

                                                </tr>
                                            })
                                        }


                                    </tbody>
                                </table>

                            </div>


                        </div>

                        <div className='col-lg-5 col-12'>
                            <div className='cartCalculation'>
                                <CartInfomation totalProduct={totalProduct} totalPrice={totalPrice} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>) : <EmtyCart />
        }
        <div className="container">
            <div className="row">
                <div className='col-12' style={{
                    textAlign: 'center',
                    padding: '5rem',
                }}>
                    <button className='backToShopBtn' onClick={() => { navigate('/shop') }} style={{
                        margin: "1rem",
                        fontSize: '1.5rem'
                    }}>Continue Shopping</button><br />

                </div>

            </div>
        </div>

        {/* <CartTable data={cart} columns={columns} /> */}


        <Footer />


    </>

}


export default (CartPage);