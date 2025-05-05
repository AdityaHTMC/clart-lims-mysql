/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const OrderProvider = ({ children }) => {
   const navigate = useNavigate()
    const base_url = import.meta.env.VITE_API_URL
    const { Authtoken } = useAuthContext()

    const [allTest, setAllTest] = useState({ loading: true, data: [] });
    const [orderStatus, setOrderStatus] = useState({ loading: true, data: [] });
    const [allCustomer, setAllCustomer] = useState({ loading: true, data: [] });
    const [test_package, setTestPackage] = useState({ loading: true, data: [] });
    const [professionalFees, setProfessionalFees] = useState({ loading: true, data: [],total: "" });
    const [allOrder, setAllOrder] = useState({ loading: true, data: [] ,total: ""})
    const [allOrderlist, setAllOrderlist] = useState({ loading: true, data: [] ,total: ""})
    const [packageOrder, setPackageOrder] = useState({ loading: true, data: [] ,total: ""})
    const [pendingOrder, setPendingOrder] = useState({ loading: true, data: [] ,total: ""})
    const [orderDetail, setOrderDetail] = useState({ loading: true, data: null })

    const getAllTest = async (q) => {
        try {
            const body = q ? {species_category: q} : {}
            const response = await axios.post(
                `${base_url}/admin/all/tests`,
                body,
                { headers: { Authorization: Authtoken } }
            );
            if (response.status === 200) {
                setAllTest({
                    data: response?.data?.data || [],
                    loading: false,
                });
            } else {
                setAllTest({ data: [], loading: false });
            }
        } catch (error) {
            setAllTest({ data: [], loading: false });
            // toast.error("Failed to test list");
        }
    };

    const getOrderTestList = async (id) => {
        try {
            setOrderDetail({ loading: true, data: null })
            const { data } = await axios.get(`${base_url}/admin/order/tests/${id}`, { headers: { 'Authorization': Authtoken } })
            if (data.status === 200) {
                setOrderDetail({ loading: false, data: data.data })
            } else {
                toast.error('Failed to fetch order tests')
                setOrderDetail({ loading: false, data: null })
            }
        } catch (error) {
            setOrderDetail({ loading: false, data: null })
        }
    }

    const getCustomerDetail = async (data) => {
        try {
            setAllCustomer({ ...allCustomer, loading: true });
            const response = await axios.post(
                `${base_url}/all/customers/list`,
                data ,
                { headers: { Authorization: Authtoken } }
            );
            if (response.status === 200) {
                setAllCustomer({
                    data: response?.data?.data || [],
                    loading: false,
                });
            } else {
                setAllCustomer({ data: [], loading: false });
            }
        } catch (error) {
            setAllCustomer({ data: [], loading: false });
            // toast.error("Failed to test list");
        }
    };

    const getTestPackageList = async (query) => {
        try {
            setTestPackage({ ...test_package, loading: true });
            const body = query ? {species_category: query} : {}
            const response = await axios.post(
                `${base_url}/admin/test-packages/getAll`, body, 
                { headers: { Authorization: Authtoken } }
            );
            if (response.status === 200) {
                setTestPackage({
                    data: response?.data?.data || [],
                    loading: false,
                });
            } else {
                setTestPackage({ data: [], loading: false });
            }
        } catch (error) {
            setTestPackage({ data: [], loading: false });
            // toast.error("Failed to test list");
        }
    };

    const getProfessionalFees = async () => {
        try {
            setProfessionalFees({ ...professionalFees, loading: true });
            const response = await axios.post(
                `${base_url}/admin/professional-fee/getAll`,{},
                { headers: { Authorization: Authtoken } }
            );
            if (response.status === 200) {
                setProfessionalFees({
                    data: response?.data?.data || [],
                    loading: false,
                });
            } else {
                setProfessionalFees({ data: [], loading: false });
            }
        } catch (error) {
            setProfessionalFees({ data: [], loading: false });
            // toast.error("Failed to test list");
        }
    };

    // const createNewOrder = async (bodyData) => {
    //     try {
    //         const { data } = await axios.post(`${base_url}/org/order/add`, bodyData, {headers: {'Authorization': Authtoken}})
    //         return data
    //     } catch (error) {
    //         return error?.response?.data || null
    //     }
    // }

    const createNewOrder = async (bodyData) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/order/place`,
            bodyData,
            {
              headers: {
                Authorization: Authtoken,
                'Content-Type': 'multipart/form',
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            navigate('/test-order')
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };


      const getAllOrderList = async (dataToSend) => {
        try {
            setAllOrderlist({ loading: true, data: [] ,total: ""})
            const response = await axios.post(
                `${base_url}/admin/all/orders/list`,
                {...dataToSend} ,
                { headers: { Authorization: Authtoken } }
            );
            if (response.status === 200) {
                setAllOrderlist({
                    data: response?.data?.data || [],
                    loading: false,
                    total: response.data.total,
                });
            } else {
                setAllOrderlist({ loading: false, data: [] });
            }
        } catch (error) {
            setAllOrderlist({ loading: false, data: [] });
            // toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    
    const getTestOrderList = async (dataToSend) => {
        try {
            setAllOrder({ loading: true, data: [] ,total: ""})
            const response = await axios.post(
                `${base_url}/admin/test/orders/list`,
                {...dataToSend} ,
                { headers: { Authorization: Authtoken } }
            );
            if (response.status === 200) {
                setAllOrder({
                    data: response?.data?.data || [],
                    loading: false,
                    total: response.data.total,
                });
            } else {
                setAllOrder({ loading: false, data: [] });
            }
        } catch (error) {
            setAllOrder({ loading: false, data: [] });
            // toast.error(error.response?.data?.message || "Something went wrong");
        }
    };


    const getPendingOrderList = async (dataToSend) => {
        try {
            setPendingOrder({ loading: true, data: [] ,total: ""})
            const response = await axios.post(
                `${base_url}/admin/pending/orders/list`,
                {...dataToSend} ,
                { headers: { Authorization: Authtoken } }
            );
            if (response.status === 200) {
                setPendingOrder({
                    data: response?.data?.data || [],
                    loading: false,
                    total: response.data.total,
                });
            } else {
                setPendingOrder({ loading: false, data: [] });
            }
        } catch (error) {
            setPendingOrder({ loading: false, data: [] });
            // toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const getpackageOrderList = async (dataToSend) => {
        try {
            setPackageOrder({ loading: true, data: [] ,total: ""})
            const response = await axios.post(
                `${base_url}/admin/test-package/orders/list`,
                {...dataToSend} ,
                { headers: { Authorization: Authtoken } }
            );
            if (response.status === 200) {
                setPackageOrder({
                    data: response?.data?.data || [],
                    loading: false,
                    total: response.data.total,
                });
            } else {
                setPackageOrder({ loading: false, data: [] });
            }
        } catch (error) {
            setPackageOrder({ loading: false, data: [] });
            // toast.error("Failed to test list");
        }
    };


    const getAllOrderStatus = async () => {
        try {
            const response = await axios.get(
                `${base_url}/org/order/status/list`,
                { headers: { Authorization: Authtoken } }
            );
            if (response.status === 200) {
                setOrderStatus({
                    data: response?.data?.data || [],
                    loading: false,
                });
            } else {
                setOrderStatus({ data: [], loading: false });
            }
        } catch (error) {
            setOrderStatus({ data: [], loading: false });
            // toast.error("Failed to test list");
        }
    };

    const values = {
        getAllTest, allTest, getCustomerDetail, allCustomer, getTestPackageList, test_package, professionalFees, getProfessionalFees, createNewOrder, getTestOrderList, allOrder, getAllOrderStatus, orderStatus ,getpackageOrderList,packageOrder,getAllOrderList,allOrderlist,getPendingOrderList,pendingOrder, getOrderTestList, orderDetail
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};

export const useOrderContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('error');
    }
    return context
};