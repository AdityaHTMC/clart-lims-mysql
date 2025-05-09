/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const CommonProvider = ({ children }) => {
  const navigate = useNavigate()
  const base_url = import.meta.env.VITE_API_URL
  const [menuList, setMenuList] = useState({ loading: true, data: [] })
  const [countryList, setCountryList] = useState({ loading: true, data: [] })
  const [stateList, setStateList] = useState({ loading: true, data: [] })
  const [cityList, setCityList] = useState({ loading: true, data: [] })
  const [smsData, setSmsData] = useState({ loading: true, data: [] })
  const [mailList, setMailList] = useState({ loading: true, data: [] })
  const [userList, setUserList] = useState({ loading: true, data: [] })
  const [orderList, setOrderList] = useState({ loading: true, data: [], total: [] })
  const [orderDetails, setOrderDetails] = useState({ loading: true, data: [] })
  const [promoCode, setPromoCode] = useState({ loading: true, data: [] })
  const [vendorList, setVendorList] = useState({ loading: true, data: [] })
  const [orderStatusList, setOrderStatusList] = useState({ loading: true, data: [] })
  const [eventList, setEventList] = useState({ loading: true, data: [] })
  const [sectionList, setSectionList] = useState({ loading: true, data: [] })
  const [allProductList, setallProductList] = useState({ loading: true, data: [] })
  const [prouctDetails, setprouctDetails] = useState({ loading: true, data: [] })
  const [boyList, setBoyList] = useState({ loading: true, data: [], total: '' })
  const [boyDetails, setBoyDetails] = useState({ loading: true, data: [], total: '' })
  const [allDeliveryList, setallDeliveryList] = useState({ loading: true, data: [] })
  const [storeSetting, setStoreSetting] = useState({ loading: false, data: {} })
  const [eventDetails, setEventDetails] = useState({ loading: true, data: [], total: [] })
  const [newsletterlist, setnewsletters] = useState({ loading: true, data: [], total: [] })
  const [enquirylist, setenquirylist] = useState({ loading: true, data: [], total: [] })
  const [phlebotomistList, setPhlebotomistList] = useState({ loading: true, data: [], total: "" });
  const [speciesCategoryList, setSepciesCategoryList] = useState({loading: true,data: []});
  const { Authtoken } = useAuthContext()

  const getMenuList = async () => {
    try {
      const response = await axios.get(`${base_url}/menu/list`, { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setMenuList({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setMenuList({ ...menuList, loading: false })
      }
    } catch (error) {
      // toast.error(error.response?.data?.message || "Something went wrong");
      setMenuList({ ...menuList, loading: false })
    }
  }

  const getCountryList = async () => {
    try {
      const response = await axios.get(`${base_url}/country/getAll`, { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setCountryList({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setCountryList({ ...countryList, loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setCountryList({ ...countryList, loading: false })
    }
  }


  const getStateList = async (id) => {
    try {
      const response = await axios.get(`${base_url}/state/getAll/${id}`, { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setStateList({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setStateList({ data: [], loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setStateList({ data: [], loading: false })
    }
  }


  const getCityList = async (id) => {
    try {
      const response = await axios.get(`${base_url}/city/getAll/${id}`, { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setCityList({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setCityList({ data: [], loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setCityList({ data: [], loading: false })
    }
  }


  const getSmsSetting = async () => {
    try {
      const response = await axios.get(`${base_url}/admin/sms/settings/details`, { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setSmsData({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setSmsData({ ...smsData, loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setSmsData({ ...smsData, loading: false })
    }
  }

  const SmsUpdateSetting = async (formData) => {
    try {
      const response = await axios.post(`${base_url}/admin/sms/settings/update`, formData, { headers: { 'Authorization': Authtoken } });
      const data = response.data;
      if (response.status === 200) {
        toast.success('pack updated successfully');
        getSmsSetting();  // Refresh the brand list after success
      } else {
        toast.error('Failed to update the pack');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setSmsData({ ...smsData, loading: false })
    }
  }



  const getEmailSubscribeList = async () => {
    try {
      const response = await axios.post(`${base_url}/admin/subscribed-email/list`, {}, { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setMailList({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setMailList({ ...smsData, loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setMailList({ ...smsData, loading: false })
    }
  }


  const getUserList = async () => {
    try {
      const response = await axios.post(`${base_url}/admin/users/list`, {}, { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setUserList({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setUserList({ data: [], loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setUserList({ data: [], loading: false })
    }
  }

  const switchUser = async (id, newStatus) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/user/status/update/${id}`,
        { status: newStatus },
        { headers: { 'Authorization': Authtoken } }
      );
      const data = response.data;
      if (response.status === 200) {
        toast.success('status updated successfully');
        getUserList();  // Refresh the brand list after success
      } else {
        toast.error('Failed to update the status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('An error occurred while updating the status');
    }
  };



  const getOrderList = async (dataToSend) => {
    try {
      const response = await axios.post(`${base_url}/admin/order/list`, { ...dataToSend }, { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setOrderList({ data: response?.data?.data || [], total: response.data.total, loading: false })
      } else {
        toast.error(response?.data?.message)
        setOrderList({ data: [], loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setOrderList({ data: [], loading: false })
    }
  }

  const getOrderStatus = async () => {
    try {
      const response = await axios.get(`${base_url}/order/status/list`, { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setOrderStatusList({ data: response?.data?.data || [], total: response.data.total, loading: false })
      } else {
        toast.error(response?.data?.message)
        setOrderStatusList({ data: [], loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setOrderStatusList({ data: [], loading: false })
    }
  }




  const getOrderDetails = async (id) => {
    try {
      const response = await axios.get(`${base_url}/admin/order/details/${id}`, { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setOrderDetails({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setOrderDetails({ data: [], loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setOrderDetails({ data: [], loading: false })
    }
  }


  const OrderStatusUpdate = async (dataToSend) => {
    try {
      const { id } = dataToSend
      const response = await axios.post(`${base_url}/admin/order/status/update/${id}`, { ...dataToSend }, { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        toast.success('Order status updated successfully');
        getOrderDetails(id)
      } else {
        toast.error(response?.data?.message)

      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");

    }
  }




  const allDeliveryBoyList = async () => {
    try {
      const response = await axios.get(`${base_url}/all/delivery-boys/list`,
        { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setallDeliveryList({ data: response?.data?.data || [], loading: false })
      } else {
        // toast.error(response?.data?.message)
        setallDeliveryList({ data: [], total: '', loading: false })
      }
    } catch (error) {
      // toast.error(error.response?.data?.message || "Something went wrong");
      setallDeliveryList({ data: [], loading: false })
    }
  }



  const getPromoCodeList = async () => {
    try {
      const response = await axios.post(`${base_url}/admin/promo-code/list`, {}, { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setPromoCode({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setPromoCode({ data: [], loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setPromoCode({ data: [], loading: false })
    }
  }

  const addPromoCode = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/promo-code/add`,
        formDataToSend,
        {
          headers: {
            'Authorization': Authtoken,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        toast.success('Coupon added successfully');
        navigate('/promo-code')
      } else {
        toast.error("Failed to add Coupon");
      }
    } catch (error) {
      console.error("Error adding Coupon:", error);
      toast.error("An error occurred while adding the Coupon");
    }
  };


  const getVendorList = async () => {
    try {
      const response = await axios.post(`${base_url}/admin/fulfillment-center/list`, {}, { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setVendorList({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setVendorList({ data: [], loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setVendorList({ data: [], loading: false })
    }
  }

  const VendorEdit = async (id, dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/fulfillment-center/update/${id}`,
        { ...dataToSend },
        { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        toast.success("Vendor Edited successfully");
        getVendorList();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setVendorList({ data: [], loading: false });
    }
  };

  const vendorDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/fulfillment-center/delete/${id}`,
        { headers: { Authorization: Authtoken } }
      );

      if (response.status === 200) {
        toast.success('vendor deleted successfully');
        getVendorList();
      } else {
        toast.error('Failed to delete vendor');
      }
    } catch (error) {
      console.error('Error deleting vendor:', error);
      toast.error('An error occurred while deleting the vendor');
    }
  }


  const getEventList = async () => {
    try {
      const response = await axios.post(`${base_url}/admin/news-event/list`, {}, { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setEventList({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setEventList({ data: [], loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setEventList({ data: [], loading: false })
    }
  }


  const addEvent = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/news-event/add`,
        formDataToSend,
        {
          headers: {
            'Authorization': Authtoken,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.status === 200) {
        toast.success('Event added successfully');
        navigate('/news-events')
      } else {
        toast.error("Failed to add Event");
      }
    } catch (error) {
      console.error("Error adding Event:", error);
      toast.error("An error occurred while adding the Event");
    }
  };


  const eventDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/news-event/delete/${id}`,
        { headers: { 'Authorization': Authtoken } }
      );

      if (response.status === 200) {
        toast.success('Event deleted successfully');
        getEventList();
      } else {
        toast.error('Failed to delete Event');
      }
    } catch (error) {
      console.error('Error deleting Event:', error);
      toast.error('An error occurred while deleting the Event');
    }
  }

  const getFeturedSection = async () => {
    try {
      const response = await axios.post(`${base_url}/admin/section/list`, {},
        { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setSectionList({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setSectionList({ data: [], loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setSectionList({ data: [], loading: false })
    }
  }

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${base_url}/all/products/list`,
        { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setallProductList({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setallProductList({ data: [], loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setallProductList({ data: [], loading: false })
    }
  }


  const getprouctDetails = async (id) => {
    try {
      const response = await axios.get(`${base_url}/feature/section/details/${id}`,
        { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setprouctDetails({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setprouctDetails({ data: [], loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setprouctDetails({ data: [], loading: false })
    }
  }


  const editfeaturedSection = async (dataToSend) => {
    try {
      const { id } = dataToSend
      const response = await axios.post(`${base_url}/section/update/${id}`, { ...dataToSend },
        { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        toast.success('Featured Section updated successfully');
        navigate('/featured-section')
      } else {
        toast.error(response?.data?.message)

      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");

    }
  }


  const addDelivery = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/delivery-boy/add`,
        formDataToSend,
        {
          headers: {
            Authorization: Authtoken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Delivery boy added successfully");
        navigate("/event-news");
      } else {
        toast.error("Failed to add Delivery boy");
      }
    } catch (error) {
      console.error("Error adding Event:", error);
      toast.error("An error occurred while adding the Delivery boy");
    }
  };

  const getDeliveryBoyList = async () => {
    try {
      const response = await axios.post(`${base_url}/admin/delivery-boys/list`, {},
        { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setBoyList({ data: response?.data?.data || [], total: response.data.total, loading: false })
      } else {
        toast.error(response?.data?.message)
        setBoyList({ data: [], total: '', loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setBoyList({ data: [], loading: false })
    }
  }


  const DeliveryBoyDetail = async (id) => {
    try {

      const response = await axios.get(`${base_url}/admin/delivery-boy/details/${id}`,
        { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setBoyDetails({ data: response?.data?.data || [], total: response.data.total, loading: false })
      } else {
        toast.error(response?.data?.message)
        setBoyDetails({ data: [], total: '', loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setBoyDetails({ data: [], loading: false })
    }
  }


  const DeliveryBoyUpdate = async (id, formData) => {
    try {

      const response = await axios.post(`${base_url}/admin/delivery-boy/update/${id}`, formData,
        { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        toast.success(response?.data?.message)
        navigate('/delivery-boys')
      } else {
        toast.error(response?.data?.message)

      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");

    }
  }

  const switchDelivery = async (id, newStatus) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/delivery-boy/status/update/${id}`,
        { status: newStatus },
        { headers: { 'Authorization': Authtoken } }
      );
      const data = response.data;
      if (response.status === 200) {
        toast.success('status updated successfully');
        getDeliveryBoyList();
      } else {
        toast.error('Failed to update the status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('An error occurred while updating the status');
    }
  };


  const deliveryDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/delivery-boy/delete/${id}`,
        { headers: { 'Authorization': Authtoken } }
      );

      if (response.status === 200) {
        toast.success(response?.data?.message)
        getDeliveryBoyList();
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }


  const getSettingDetails = async (body) => {
    try {
      setStoreSetting({ ...storeSetting, loading: true })
      const { data } = await axios.get(`${base_url}/admin/store/setting/details`,
        { headers: { 'Authorization': Authtoken } })
      if (data.success) {
        setStoreSetting({ loading: false, data: data.data })
      } else {
        setStoreSetting({ ...storeSetting, loading: false })
        console.error(data.message)
      }
    } catch (error) {
      setStoreSetting({ ...storeSetting, loading: false })
    }
  }


  const edit_store_setting = async (body) => {
    try {
      const { data } = await axios.post(`${base_url}/store/setting/update`, body,
        { headers: { 'Authorization': Authtoken } });
      return data
    } catch (error) {
      return error?.response?.data || null
    }
  }


  const geteventDetail = async (id) => {
    try {

      const response = await axios.get(`${base_url}/admin/news-event/details/${id}`,
        { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setEventDetails({ data: response?.data?.data || [], total: response.data.total, loading: false })
      } else {
        toast.error(response?.data?.message)
        setEventDetails({ data: [], loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setEventDetails({ data: [], loading: false })
    }
  }


  const editEvent = async (id, dataToSend) => {
    try {
      const response = await axios.post(`${base_url}/admin/news-event/update/${id}`, dataToSend,
        { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        toast.success(response?.data?.message)
        navigate('/news-events')
      } else {
        toast.error(response?.data?.message)

      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");

    }
  }


  const updateOrderStatus = async (dataToSend) => {
    try {
      const { id } = dataToSend;
      const response = await axios.post(
        `${base_url}/admin/order/update`,
        { ...dataToSend },
        { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message)
        // getOrderDetails(id);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const updateOrderRefund = async (dataToSend) => {
    try {
      const { order_id } = dataToSend;
      const response = await axios.post(
        `${base_url}/admin/order/refund`,
        { ...dataToSend },
        { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message)
        getOrderDetails(order_id);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getallPhelboList = async () => {
    try {
      const response = await axios.post(`${base_url}/admin/phlebotomists/list`, {},
        { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setPhlebotomistList({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setPhlebotomistList({ data: [], total: '', loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setPhlebotomistList({ data: [], loading: false })
    }
  }



  const getNewLetterList = async (dataToSend) => {
    try {
      const response = await axios.post(`${base_url}/admin/newsletter/list`, { ...dataToSend },
        { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setnewsletters({ data: response?.data?.data || [], total: response.data.total, loading: false })
      } else {
        toast.error(response?.data?.message)
        setnewsletters({ data: [], loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setnewsletters({ data: [], loading: false })
    }
  }


  const getEnquiryList = async (dataToSend) => {
    try {
      const response = await axios.post(`${base_url}/admin/enquiry/list`, { ...dataToSend },
        { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setenquirylist({ data: response?.data?.data || [], total: response.data.total, loading: false })
      } else {
        toast.error(response?.data?.message)
        setenquirylist({ data: [], loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setenquirylist({ data: [], loading: false })
    }
  }

  const updateItemStatus = async (dataToSend) => {
    try {
      const { item_id } = dataToSend;
      const response = await axios.put(
        `${base_url}/order/item/status/update/${item_id}`,
        { ...dataToSend },
        { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getSpeciesCategoryList = async () => {
    try {
      setSepciesCategoryList({ data: [], loading: true });
      const response = await axios.get(
        `${base_url}/admin/species-category/getAll`,
        { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        setSepciesCategoryList({ data: response?.data?.data || [], loading: false });
      } else {
        setSepciesCategoryList({ data: [], loading: false });
      }
    } catch (error) {
      setSepciesCategoryList({ data: [], loading: false });
    }
  };


  const addSpeciesCategory = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/species-category/create`,
        { ...formDataToSend },
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getSpeciesCategoryList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



  const editSpeciesCategory = async (id, dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/species-category/update/${id}`,
        { ...dataToSend },
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getSpeciesCategoryList()
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const deleteSpeciesCategory = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/species-category/delete/${id}`,
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getSpeciesCategoryList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const values = {
    getMenuList, menuList, countryList, getCountryList, getStateList, stateList, getCityList, cityList,
    getSmsSetting, smsData, SmsUpdateSetting, getEmailSubscribeList, mailList, getUserList, userList, switchUser, getOrderList, orderList, getOrderDetails, orderDetails, promoCode, getPromoCodeList, addPromoCode, getVendorList, vendorList, VendorEdit, vendorDelete, getOrderStatus, orderStatusList, OrderStatusUpdate, addEvent, getEventList, eventList, eventDelete, getFeturedSection, sectionList, getAllProducts, allProductList, getprouctDetails, prouctDetails, editfeaturedSection, addDelivery, getDeliveryBoyList, boyList, DeliveryBoyDetail, boyDetails, DeliveryBoyUpdate, switchDelivery, deliveryDelete, allDeliveryBoyList, allDeliveryList, getSettingDetails, storeSetting, edit_store_setting, geteventDetail, editEvent, eventDetails, updateOrderStatus, getallPhelboList, phlebotomistList, getNewLetterList, newsletterlist, getEnquiryList, enquirylist, updateItemStatus, updateOrderRefund, getSpeciesCategoryList , addSpeciesCategory, editSpeciesCategory, deleteSpeciesCategory, speciesCategoryList
  }
  return (
    <AppContext.Provider value={values} >
      {children}
    </AppContext.Provider>
  );
};

export const useCommonContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('error');
  }
  return context
};