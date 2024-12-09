/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from './AuthProvider';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const DashboardProvider = ({ children }) => {

    const base_url = import.meta.env.VITE_API_URL
    const [cmsList, setCmsList] = useState({ loading: true, data: [] })
    const [dashboardOrderList, setDashboardOrderList] = useState({ loading: true, data: [] })
    const [dashboardOrderCount, setDashboardOrderCount] = useState({ loading: true, data: [] })
    const [orderStatus, setOrderStatus] = useState({ loading: true, data: [], total:'' });
    const [testOrderCount, setTestOrderCount] = useState({ loading: true, data: [] });
    const [packageOrderCount, setPackageOrderCount] = useState({ loading: true, data: [] });
    const [orderCount, setOrderCount] = useState({ loading: true, data: [] });
    const [barcode, setbarcode] = useState({ loading: true, data: [], total:"" });
    const [b2breportList, setB2breportList] = useState({ loading: true, data: [], total:'' });
    const [csvb2b, setCsvb2b] = useState('');
    const { Authtoken } = useAuthContext()
    const AuthToken = localStorage.getItem('Authtoken')

 

    const getCmsList = async (data) => {
        try {
          const response = await axios.post(
            `${base_url}/cms/list`,
            {},
            { headers: { 'Authorization': Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setCmsList({ data: response?.data?.data || [], loading: false });
          } else {
            setCmsList({...cmsList, loading: false});
            toast.error("Failed to fetch Bag Type list");
          }
        } catch (error) {
            setCmsList({...cmsList, loading: false});
          toast.error(error.response?.data?.message || 'Server error');
        }
      };



      const getDashboardOrderList = async (data) => {
        try {
          const response = await axios.post(
            `${base_url}/latest/orders/list`,
            {},
            { headers: { 'Authorization': Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setDashboardOrderList({ data: response?.data?.data || [], loading: false });
          } else {
            setDashboardOrderList({data:[], loading: false});
            toast.error("Failed to fetch Bag Type list");
          }
        } catch (error) {
            setDashboardOrderList({data:[], loading: false});
          toast.error(error.response?.data?.message || 'Server error');
        }
      };


      
      const getDashboardOrderCount = async (data) => {
        try {
          const response = await axios.get(
            `${base_url}/admin/dashboard/order/count`,
            { headers: { 'Authorization': Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setDashboardOrderCount({ data: response?.data?.data || [], loading: false });
          } else {
            setDashboardOrderCount({data:[], loading: false});
            toast.error("server errors");
          }
        } catch (error) {
          setDashboardOrderCount({data:[], loading: false});
          toast.error(error.response?.data?.message || 'Server error');
        }
      };


  const getAllOrderStatus = async () => {
        try {
            const response = await axios.get(
                `${base_url}/admin/dashboard/order/count`,
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

    const getTestOrderCount = async () => {
      try {
          const response = await axios.get(
              `${base_url}/admin/test/orders/count`,
              { headers: { Authorization: Authtoken } }
          );
          if (response.status === 200) {
            setTestOrderCount({
                  data: response?.data?.data || [],
                  loading: false,
              });
          } else {
            setTestOrderCount({ data: [], loading: false });
          }
      } catch (error) {
        setTestOrderCount({ data: [], loading: false });
          // toast.error("Failed to test list");
      }
  };

  const getPackageOrderCount = async () => {
    try {
        const response = await axios.get(
            `${base_url}/admin/test-package/orders/count`,
            { headers: { Authorization: Authtoken } }
        );
        if (response.status === 200) {
          setPackageOrderCount({
                data: response?.data?.data || [],
                loading: false,
            });
        } else {
          setPackageOrderCount({ data: [], loading: false });
        }
    } catch (error) {
      setPackageOrderCount({ data: [], loading: false });
        // toast.error("Failed to test list");
    }
};


    const getbarcode = async (dataToSend) => {
      try {
          const response = await axios.post(
              `${base_url}/admin/barcode/list`,{...dataToSend},
              { headers: { Authorization: Authtoken } }
          );
          if (response.status === 200) {
            setbarcode({
                  data: response?.data?.data || [],
                  total: response.data.total,
                  loading: false,
              });
          } else {
            setbarcode({ data: [], loading: false });
          }
      } catch (error) {
          setbarcode({ data: [], loading: false });
          toast.error("Failed to fetch barcode list");
      }
  };


  const generateBarcode = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/barcode/bulk-create`,
        formDataToSend ,
        {
          headers: {
            Authorization: AuthToken,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getbarcode()
      } else {
        toast.error("server errors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };


  const Barcodeprint = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/barcode/bulk-print`,
        dataToSend ,
        {
          headers: {
            Authorization: AuthToken,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        // getbarcode()
      } else {
        toast.error("server errors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };


  const getDashboardCount = async (dataToSend) => {
    try {
        const response = await axios.get(
            `${base_url}/admin/dashboard/count`,
            { headers: { Authorization: Authtoken } }
        );
        if (response.status === 200) {
          setOrderCount({
                data: response?.data?.data || [],
                loading: false,
            });
        } else {
          setOrderCount({ data: [], loading: false });
        }
    } catch (error) {
        setOrderStatus({ data: [], loading: false });
        toast.error("Failed to fetch  count");
    }
};


const getB2bReport = async () => {
  try {
      const response = await axios.post(
          `${base_url}/admin/b2b-user/data`,{},
          { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        setB2breportList({
              data: response?.data?.data || [],
              total: response.data.total,
              loading: false,
          });
      } else {
        setB2breportList({ data: [],total:'', loading: false });
      }
  } catch (error) {
    setB2breportList({ data: [],total:'', loading: false });
    toast.error(error.response?.data?.message || 'Server error');
  }
};

const csvB2bReport = async () => {
  try {
      const response = await axios.post(
          `${base_url}/b2b-user/convert-to-csv`,{},
          { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        console.log(response,'csv response')
        setCsvb2b(response.data.fileUrl );
      } else {
        setCsvb2b('');
      }
  } catch (error) {
    setCsvb2b('');
    toast.error(error.response?.data?.message || 'Server error');
  }
};


    const values = {
       getCmsList ,cmsList ,getDashboardOrderList,dashboardOrderList,getDashboardOrderCount,dashboardOrderCount,getAllOrderStatus , orderStatus,getbarcode,barcode,getDashboardCount,orderCount,generateBarcode,Barcodeprint,getTestOrderCount,testOrderCount,getPackageOrderCount,packageOrderCount,getB2bReport,b2breportList,csvB2bReport,csvb2b
    }
    return (
        <AppContext.Provider value={values} >
            {children}
        </AppContext.Provider>
    );
};

export const useDashboardContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('error');
    }
    return context
};