import React, {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import ProductList from "./ProductList"
import SortComponent from './SortComponent';
import ModalComponent from "../../shared/ModalComponent" 
import { getProducts, getProduct, setIsLoading } from "../../shared/slices/cartSlice";
import Header from '../../shared/Header';
import Loading from '../../shared/Loading'


export default function Home(props) {

    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products);
    const product = useSelector(state => state.cart.product);
    const isLoading = useSelector(state => state.cart.isLoading);
    const isFiltering = useSelector(state => state.cart.isFiltering);

    console.log("isLoading", isLoading)

    const [data, setData] = useState([])

    const [showModal, setShowModal] = useState(false)

    const [itemID, setItemID] = useState('')

    console.log("Item ID: ", product)

    useEffect(() => {
        if(itemID){
            let content = data.find(item => item.id == itemID)
            dispatch(getProduct(content))
        }
    }, [itemID])


    const handlePreview = (id) => {
        setShowModal(true)
        setItemID(id)
    }

    //Fetch Data
    const fetchData = useRef(()=>{})
    fetchData.current = () => {
        dispatch(setIsLoading(true))

        fetch('tempAPI.json')
            .then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    dispatch(setIsLoading(false))
                    dispatch(getProducts(data.body))
                  }, 1000);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchData.current()
    }, [])

    useEffect(() => {
        if(products){
            let list = products.slice().sort((a, b) => {
                let a1 = moment(new Date(a.date_added))
                let b1 = moment(new Date(b.date_added))
                return b1 - a1
            })
            setData(list)
        }
    }, [products])

    return ( 
        <div className="homepage">
                
                <Header/>
                <Container className="pt-4">
                    <Row>
                        <Col className="col-sm-4 col-12">
                            <h4 className="text-white font-weight-normal">Our Products:</h4>
                        </Col>
                        <Col  className="sort-section col-sm-8 col-12">
                            <SortComponent 
                                data={data} 
                                setData={setData} 
                            />
                        </Col>
                    </Row>
                </Container>
 
                <ProductList
                    data={data}
                    handlePreview={handlePreview}
                    setShowModal={setShowModal} 
                    isLoading={isLoading}
                    {...props}
                /> 

                {
                    (isLoading || isFiltering) && <Loading />            
                }
                
                <ModalComponent 
                    product={product}
                    show={showModal} 
                    setShowModal={setShowModal} 
                    {...props}
                />
        </div>
    )
}



