/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "./AuthProvider";

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const StockProvider = ({ children }) => {
  const base_url = import.meta.env.VITE_API_URL;
  const [cmsList, setCmsList] = useState({ loading: true, data: [] });
  const [itemgroup, setitemgroup] = useState({loading: true,data: [],total: "",});
  const [imList, setIMList] = useState({ loading: true, data: [], total: "" });
  const [imAllList, setIMAllList] = useState({loading: true,data: [],total: "",});
  const [vendorList, setVendorList] = useState({loading: true,data: [],total: "",});
  const [purchaseList, setPurchaseList] = useState({loading: true,data: [],total: "",});
  const [srList, setSrList] = useState({loading: true,data: [],total: "",});
  const [stockreport, setStockreport] = useState({loading: true,data: [],total: "",});
  const [stockhistory, setStockhistory] = useState({loading: true,data: [],total: "",});
  const [allvendorList, setallvendorList] = useState({ loading: true, data: [] });
  const [stocklqa, setStocklqa] = useState({loading: true,data: [],total: "",});
  const { Authtoken } = useAuthContext();
  const AuthToken = localStorage.getItem("Authtoken");

  const getCmsList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/cms/list`,
        {},
        { headers: { Authorization: Authtoken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setCmsList({ data: response?.data?.data || [], loading: false });
      } else {
        setCmsList({ ...cmsList, loading: false });
        // toast.error("Failed to fetch Bag Type list");
      }
    } catch (error) {
      setCmsList({ ...cmsList, loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const addCms = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/cms/add`,
        formDataToSend, // Pass FormData directly without spreading
        {
          headers: {
            Authorization: AuthToken,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("CMS added successfully");
        getCmsList(); // Refresh the banner list after success
      } else {
        toast.error("Failed to add CMS ");
      }
    } catch (error) {
      console.error("Error adding CMS:", error);
      toast.error("An error occurred while adding the CMS ");
    }
  };

  const getItemGrList = async () => {
    try {
      const response = await axios.post(
        `${base_url}/admin/item-group/list `,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setitemgroup({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setitemgroup({ data: [], loading: false });
        // toast.error(response.data.message);
      }
    } catch (error) {
      setitemgroup({ data: [], loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const addItemGr = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/item-group/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getItemGrList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const editItemGr = async (id, formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/item-group/edit/${id}`,
        { ...formDataToSend },
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getItemGrList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const deleteitemGr = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/item-group/delete/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        toast.success(response.data.message);
        getItemGrList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getIMList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/item/list `,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setIMList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setIMList({ data: [], loading: false });
        // toast.error(response.data.message);
      }
    } catch (error) {
      setIMList({ data: [], loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const addIM = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/item/add`,
        { ...formDataToSend },
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getIMList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editIM = async (id, formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/item/update/${id}`,
        { ...formDataToSend },
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getIMList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getallIMList = async () => {
    try {
      const response = await axios.post(
        `${base_url}/admin/item/list `,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setIMAllList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setIMAllList({ data: [], loading: false });
        // toast.error(response.data.message);
      }
    } catch (error) {
      setIMAllList({ data: [], loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deleteIMList = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/item/delete/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        toast.success(response.data.message);
        getIMList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setIMAllList({ data: [], loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getvendorList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/vendors/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setVendorList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setVendorList({ data: [], loading: false });
        // toast.error(response.data.message);
      }
    } catch (error) {
      setVendorList({ data: [], loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const addVendor = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/vendor/add`,
        { ...formDataToSend },
        {
          headers: {
            Authorization: AuthToken,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getvendorList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editVendor = async (id, formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/vendor/update/${id}`,
        { ...formDataToSend },
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getvendorList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deletevendor = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/vendor/delete/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        toast.success(response.data.message);
        getvendorList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getPurchaseList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/purchase-to-stock/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setPurchaseList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setPurchaseList({ data: [], loading: false });
        // toast.error(response.data.message);
      }
    } catch (error) {
      setPurchaseList({ data: [], loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getStockreport = async () => {
    try {
      const response = await axios.post(
        `${base_url}/admin/stock-reports/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setStockreport({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setStockreport({ data: [], loading: false });
        // toast.error(response.data.message);
      }
    } catch (error) {
      setStockreport({ data: [], loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getallvendorlist = async () => {
    try {
      const response = await axios.post(
        `${base_url}/all/vendors/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setallvendorList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setallvendorList({ data: [], loading: false });
        // toast.error(response.data.message);
      }
    } catch (error) {
      setallvendorList({ data: [], loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const addPurchase = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/purchase-to-stock/add`,
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
        getPurchaseList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };




  const getStockReportList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/stock/records/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setSrList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setSrList({ data: [], loading: false });
        // toast.error(response.data.message);
      }
    } catch (error) {
      setSrList({ data: [], loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const addStockissue = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/stock-issue`,
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
        getStockReportList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getStockHistoryList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/item/stock/history/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setStockhistory({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setStockhistory({ data: [], loading: false });
        // toast.error(response.data.message);
      }
    } catch (error) {
      setStockhistory({ data: [], loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getStockLQAList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/low-quantity-stocks/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setStocklqa({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setStocklqa({ data: [], loading: false });
        // toast.error(response.data.message);
      }
    } catch (error) {
      setStocklqa({ data: [], loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const values = {getCmsList,cmsList,addCms,getItemGrList,itemgroup,addItemGr,getIMList, addIM,imList,imAllList,getallIMList,editIM,deleteIMList ,getvendorList , addVendor ,editVendor, deletevendor,vendorList,getPurchaseList, purchaseList, getStockreport , stockreport,getallvendorlist , allvendorList,addPurchase,addStockissue, getStockReportList ,srList,getStockHistoryList,stockhistory,getStockLQAList,stocklqa,editItemGr,deleteitemGr




  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useStockContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
