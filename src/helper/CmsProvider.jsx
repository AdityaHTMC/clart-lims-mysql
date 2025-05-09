/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from './AuthProvider';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const CMsProvider = ({ children }) => {

    const base_url = import.meta.env.VITE_API_URL
    const [menuList, setMenuList] = useState({ loading: true, data: [] })
    const [cmsList, setCmsList] = useState({ loading: true, data: [], total:'' })
    const [currencyList, setCurrencyList] = useState({ loading: true, data: [] })
    const { Authtoken } = useAuthContext()
    const AuthToken = localStorage.getItem('Authtoken')

    const getMenuList = async () => {
        try {
            const response = await axios.get(`${base_url}/menu/list`, { headers: { 'Authorization': Authtoken }});
            if (response.status === 200) {
                setMenuList({ data: response?.data?.data || [], loading: false })
            } else {
                toast.error(response?.data?.message)
                setMenuList({ ...menuList, loading: false })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            setMenuList({ ...menuList, loading: false })
        }
    }

    const getCmsList = async (dataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/cms/list`,
            {...dataToSend},
            { headers: { 'Authorization': Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setCmsList({ data: response?.data?.data || [], total:response.data.total, loading: false });
          } else {
            setCmsList({data: [],total:'', loading: false});
            toast.error(response?.data?.message)
          }
        } catch (error) {
            setCmsList({data: [], loading: false});
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };



      const addCms = async (formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/cms/add`,
            formDataToSend,  
            { 
              headers: { 
                Authorization: AuthToken,
              }
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message)
            getCmsList();  
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };


      const deleteCms = async (id) => {
        try {
          const response = await axios.delete(
            `${base_url}/cms/delete/${id}`,
            { 
              headers: { 
                Authorization: AuthToken 
              }
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message)
            getCmsList();  // Refresh the banner list after success
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error deleting CMS:", error);
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };

      const editcms = async (id, formData) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/cms/update/${id}`,
            formData,
            {
              headers: {
                Authorization: AuthToken,
              },
            }
          );
          const data = response.data;
          if (response.status === 200) {
            toast.success(response?.data?.message)
            getCmsList();  // Refresh the brand list after success
          } else {
            toast.error('Failed to update the CMS');
          }
        } catch (error) {
          console.error('Error updating CMS:', error);
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };

      const getCurrencyList = async (data) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/currency/details`,
            {},
            { headers: { 'Authorization': Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setCurrencyList({ data: response?.data?.data || [], loading: false });
          } else {
            setCurrencyList({...currencyList, loading: false});
             toast.error(response?.data?.message)
          }
        } catch (error) {
          setCurrencyList({...currencyList, loading: false});
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };



    const values = {
        getMenuList, menuList , getCmsList ,cmsList ,addCms,deleteCms,editcms,getCurrencyList,currencyList
    }
    return (
        <AppContext.Provider value={values} >
            {children}
        </AppContext.Provider>
    );
};

export const useCmsContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('error');
    }
    return context
};