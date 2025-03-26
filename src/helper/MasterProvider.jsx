/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppContext = createContext();

export const MasterProvider = ({ children }) => {
  const navigate = useNavigate();
  const [unitLists, setUnitLists] = useState({loading: true,data: [],total: ""});
  const [breedLists, setbreedLists] = useState({loading: true,data: [],total: ""});
  const [customerLists, setcustomerLists] = useState({loading: true,data: [],total: ""});
  const [crmListsdata, setcrmLists] = useState({loading: true,data: [],total: ""});
  const [crmCSvdata, setcrmCSV] = useState({loading: true,data: [],total: ""});
  const [testCategory, settestCategory] = useState({loading: true,data: [],total: ""});
  const [testList, settestList] = useState({loading: true,data: [],total: ""});
  const [professionalList, setprofessionalList] = useState({loading: true,data: [],total: ""});
  const [testpackageList, settestpackageList] = useState({loading: true,data: [],total: ""});
  const [taskList, setTaskList] = useState({loading: true,data: [],total: ""});
  const [allbreed, setallbreed] = useState({loading: true,data: []});
  const [alltestCategory, setalltestCategory] = useState({loading: true,data: []});
  const [testParameter, setTestParameter] = useState({loading: true,data: [], total: ""});
  const [unitMasterList, setUnitMasterList] = useState({loading: true,data: [],total: ""});
  const [speciesMasterList, setSpeciesMasterList] = useState({loading: true,data: [],total: ""});
  const [orderMasterList, setorderMasterList] = useState({loading: true,data: [],total: ""});
  const [districtList, setdistrictList] = useState({loading: true,data: [],total: ""});
  const [stateList, setstateList] = useState({loading: true,data: [],total: ""});
  const [alltest, setalltest] = useState({loading: true,data: []});
  const [allPPL, setallPPL] = useState({loading: true,data: []});
  const [allTestParaGr, setTestParaGr] = useState({loading: true,data: []});
  const [allspecies, setallspecies] = useState({loading: true,data: []});
  const [allUnitList, setallUnitList] = useState({loading: true,data: []});
  const [allDistrictList, setallDistrictList] = useState({loading: true,data: []});
  const [allStateList, setallStateList] = useState({loading: true,data: []});
  const [allItemList, setallItemList] = useState({loading: true,data: []});
  const [tpdetails, setTpdetails] = useState({loading: true,data: []});
  const [timeList, settimeList] = useState({loading: true,data: []});
  const [timeListdata, setTimeListdata] = useState({loading: true,data: [],total: ""});
  const [allphelboList, setPhelboList] = useState({loading: true,data: [],total: ""});
  const [orderphelboList, setorderPhelboList] = useState({loading: true,data: [],total: ""});
  const [designationMasterList, setdesignationMasterList] = useState({loading: true,data: [],total: ""});
  const [emailSettingsList, setEmailSettingsList] = useState({loading: true,data: [],total: ""});
  const [petList, setPetList] = useState({loading: true,data: [],total: ""});
  const [petDetails, setPetDetails] = useState({loading: true,data: []});
  const [orderDetails, setOrderDetails] = useState({ loading: true, data: [] }) 
  const [testDetails, setTestDetails] = useState({ loading: true, data: {} }) 
  const [sahcList, setsahcList] = useState({loading: true,data: [],total: ""});
  const [allsahcList, setallsahcList] = useState({loading: true,data: []});
  const [docList, setdocList] = useState({loading: true,data: [],total: ""});
  const [transationList, setTransationList] = useState({loading: true,data: [],total: ""});
  const [bankList, setBankList] = useState({loading: true,data: [],total: ""});
  const [cihList, setCihList] = useState({loading: true,data: [],total: ""});
  const [auditTrailsList, setAuditTrailsList] = useState({loading: true,data: [],total: ""});
  const [reportTemplateList, setReportTemplateList] = useState({loading: true,data: [],total: ""});
  const [dailyReportList, setDailyReportList] = useState({loading: true,data: [],total: ""});
  const [containerList, setContainerList] = useState({loading: true,data: [],total: ""});
  const [parameterGrList, setparameterGrList] = useState({loading: true,data: [],total: ""});
  const [allparameterGrList, setAllparameterGrList] = useState({loading: true,data: []});
  const [allContainerList, setallContainerList] = useState({loading: true,data: []});
  const [zoneList, setzoneList] = useState({loading: true,data: [],total: ""});
  const [zoneprice, setzonePrice] = useState({loading: true,data: []});
  const [sahcDoc, setSahcDoc] = useState({loading: true,data: []});
  const [roleList, setRoleList] = useState({loading: true,data: [],total: ""});
  const [permissionList, setPermissionList] = useState({loading: true,data: [],total: ""});
  const [userMagList, setUserMagList] = useState({loading: true,data: [],total: ""});
  const [dropdownRoleList, setdropdownRoleList] = useState({loading: true,data: []});
  const [dropdownMenuList, setdropdownMenuList] = useState({loading: true,data: []});
  const [csvAuditData, setCsvAuditData] = useState('');
  const AuthToken = localStorage.getItem("Authtoken");
  // console.log(AuthToken)
  const base_url = import.meta.env.VITE_API_URL;

  const getunitList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/unit/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setUnitLists({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setUnitLists({ data: [], total: "", loading: false });
        toast.error("Failed to fetch product list");
      }
    } catch (error) {
      setUnitLists({ data: [], total: "", loading: false });
      toast.error("Failed to fetch product list");
    }
  };

  const addUnit = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/unit/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            "Content-Type": "multipart/form-data", // Set correct content type for FormData
          },
        }
      );
      if (response.status === 200) {
        toast.success("Unit added successfully");
        navigate("/unit-list");
      } else {
        toast.error("Failed to add Unit");
      }
    } catch (error) {
      console.error("Error adding Unit:", error);
      toast.error("An error occurred while adding the Unit");
    }
  };

  const addBreed = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/breed/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        navigate("/breed-management");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error adding Breed:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getBreedList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/breed/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setbreedLists({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setbreedLists({ data: [], total: "", loading: false });
        // toast.error(response?.data?.message)
      }
    } catch (error) {
      setbreedLists({ data: [], total: "", loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editBreed = async (id,formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/breed/edit/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getBreedList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error adding Breed:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deleteBreed = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/breed/delete/${id}`,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getBreedList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const allBreedList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/all/breeds`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setallbreed({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setallbreed({ data: [], total: "", loading: false });
        // toast.error("Failed to fetch breed list");
      }
    } catch (error) {
        setallbreed({ data: [], total: "", loading: false });
      // toast.error("Failed to fetch breed list");
    }
  };

  const addCustomer = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/customer/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            "Content-Type": "multipart/form-data", // Set correct content type for FormData
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        navigate("/customers-list");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const allCustomerList = async (dataToSend) => {
    try {
      setcustomerLists({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/customers/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setcustomerLists({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setcustomerLists({ data: [], total: "", loading: false });
       
      }
    } catch (error) {
        setcustomerLists({ data: [], total: "", loading: false });
     
    }
  };


  const crmList = async (dataToSend) => {
    try {
      setcrmLists({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/crm/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setcrmLists({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setcrmLists({ data: [], total: "", loading: false });
       
      }
    } catch (error) {
      setcrmLists({ data: [], total: "", loading: false });
     
    }
  };

  const crmCSV = async (dataToSend) => {
    try {
      setcrmCSV({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/crm/csv/export `,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        return response.data
      } else {
  
        return null
      }
    } catch (error) {
      return null
    }
  };


  const customerDelete = async (id) => { 
    try {
      const response = await axios.delete(
        `${base_url}/admin/customer/delete/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      
      if (response.status === 200) {
        toast.success(response?.data?.message)
        allCustomerList(); 
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const gettestCategoryList = async (dataToSend) => {
    try {
      settestCategory({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/test-categories/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        settestCategory({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        settestCategory({ data: [], total: "", loading: false });
        
      }
    } catch (error) {
      settestCategory({ data: [], total: "", loading: false });
      
    }
  };


  const addtestCategory = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test-category/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        gettestCategoryList()
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding Test category:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const gettestTestList = async (dataToSend) => {
    try {
      settestList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/test/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        settestList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        settestList({ data: [], total: "", loading: false });
       
      }
    } catch (error) {
      settestList({ data: [], total: "", loading: false });
      
    }
  };

  const deleteTestcate = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/test-category/delete/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        toast.success(response.data.message);
        gettestCategoryList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const editTestCategory = async (id,formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test-category/edit/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        gettestCategoryList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const deleteTest = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/test/delete/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        toast.success(response.data.message);
        gettestTestList();
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const addTest = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/test-list");
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getAllTestCategory = async (data) => {
    try {
      setalltestCategory({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/all/test-categories`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setalltestCategory({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setalltestCategory({ data: [], total: "", loading: false });
        
      }
    } catch (error) {
      setalltestCategory({ data: [], total: "", loading: false });
      
    }
  };


 

  const getProfessionalList = async (dataToSend) => {
    try {
      setprofessionalList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/professional-fee/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setprofessionalList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setprofessionalList({ data: [], total: "", loading: false });
        // toast.error(response?.data?.message)
      }
    } catch (error) {
      setprofessionalList({ data: [], total: "", loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const addProfessional = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/professional-fee/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getProfessionalList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const editProfessionalFees = async (id,formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/professional-fee/edit/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getProfessionalList()
      } else {
        toast.error("server errors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getAllTest = async (data) => {
    try {
      setalltest({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/all/tests`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setalltest({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setalltest({ data: [], total: "", loading: false });
        // toast.error(response.data?.message || "Something went wrong");
      }
    } catch (error) {
      setalltest({ data: [], total: "", loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const addtestPackage = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/package/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
       navigate('/test-packages')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding Test package:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editTestPackage = async (formDataToSend,id) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test-package/update/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
       navigate('/test-packages')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding Test package:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getAllTestPackage = async (dataToSend) => {
    try {
      settestpackageList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/test-package/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        settestpackageList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        settestpackageList({ data: [], total: "", loading: false });
        // toast.error(response?.data?.message)
      }
    } catch (error) {
      settestpackageList({ data: [], total: "", loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const tpDelete = async (id) => { 
    try {
      const response = await axios.delete(
        `${base_url}/admin/test-package/delete/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      
      if (response.status === 200) {
        toast.success(response.data?.message);
        getAllTestPackage(); 
      } else {
        toast.error(response.data?.message);
      }
    } catch (error) {
      console.error('Error deleting Test package:', error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const TestPackageDetail = async (id) => {
    try {
      
      const response = await axios.get(
        `${base_url}/admin/test-package/details/${id}`,
        
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setTpdetails({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setTpdetails({ data: [], total: "", loading: false });
        // toast.error(response?.data?.message);
      }
    } catch (error) {
      setTpdetails({ data: [], total: "", loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



  const addtask = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/task/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
       navigate('/task-management')
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error adding Test package:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getTaskList = async (dataToSend) => {
    try {
      setTaskList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/task/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setTaskList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setTaskList({ data: [], total: "", loading: false });
        // toast.error(response?.data?.message)
      }
    } catch (error) {
      setTaskList({ data: [], total: "", loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getTPList = async (dataToSend) => {
    try {
      setTestParameter({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/test-parameter/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setTestParameter({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setTestParameter({ data: [], total: "", loading: false });
        // toast.error(response?.data?.message);
      }
    } catch (error) {
      setTestParameter({ data: [], total: "", loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  
  const deleteTPList = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/test-parameter/delete/${id}`,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getTPList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



  const getPPL = async (testId) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test/parent/parameter/list`,
        {test_id: testId},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setallPPL({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setallPPL({ data: [], total: "", loading: false });
        // toast.error("Failed to fetch test parameter list");
      }
    } catch (error) {
      setallPPL({ data: [], total: "", loading: false });
      // toast.error("Failed to fetch test parameter list");
    }
  };

  const getTestParaGr = async (testId) => {
    try {
      setTestParaGr({ loading: true , data: []});
      const response = await axios.post(
        `${base_url}/test/parameter-group/getAll`,
        {test_id: testId},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setTestParaGr({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setTestParaGr({ data: [], total: "", loading: false });
      }
    } catch (error) {
      setTestParaGr({ data: [], total: "", loading: false });
      
    }
  };


  const addTestParameter = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test-parameter/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Test Parameter added successfully");
       navigate('/test-parameters')
      } else {
        toast.error("Failed to add Test Parameter");
      }
    } catch (error) {
      console.error("Error adding Test package:", error);
      toast.error("An error occurred while adding the Test Parameter");
    }
  };

  const getDDunitList = async (testId) => {
    try {
      const response = await axios.get(
        `${base_url}/test/parameter/unit/list`,
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setallUnitList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setallUnitList({ data: [], loading: false });

      }
    } catch (error) {
      setallUnitList({ data: [], loading: false });

    }
  };

  const getunitMasterList = async (dataToSend) => {
    try {
      setUnitMasterList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/test/parameter/units/list`,{...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setUnitMasterList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setUnitMasterList({ data: [], total:'', loading: false });
        // toast.error(response?.data?.message)
      }
    } catch (error) {
      setUnitMasterList({ data: [], loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const addUnitMasterList = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/test/parameter/unit/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Test Parameter unit added successfully");
        getunitMasterList()
      } else {
        toast.error("Failed to add Test Parameter unit");
      }
    } catch (error) {
      console.error("Error adding Test parameter unit:", error);
      toast.error("An error occurred while adding the Test Parameter unit");
    }
  };


  const getSpeciesMasterList = async (dataToSend) => {
    try {
      setSpeciesMasterList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/species/list`,{...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setSpeciesMasterList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setSpeciesMasterList({ data: [], loading: false });

      }
    } catch (error) {
      setSpeciesMasterList({ data: [], loading: false });

    }
  };

  const getAllSpeciesList = async () => {
    try {
      const response = await axios.post(
        `${base_url}/species/list `,{},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setallspecies({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setallspecies({ data: [], loading: false });

      }
    } catch (error) {
      setallspecies({ data: [], loading: false });

    }
  };

  const addSpeciesMasterList = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/species/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getSpeciesMasterList()
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.success(error.response?.data?.message);
    }
  };


  const editSpeciesMasterList = async (id,dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/species/edit/${id}`,
        dataToSend,
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getSpeciesMasterList()
      } else {
        toast.error("server errors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const DeleteSpecies = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/species/delete/${id}`,
        
        {
          headers: {
            Authorization: AuthToken,
            // 'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getSpeciesMasterList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getOrderMasterList = async (testId) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/order/status/list`,{},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setorderMasterList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setorderMasterList({ data: [], loading: false });

      }
    } catch (error) {
      setorderMasterList({ data: [], loading: false });

    }
  };


  const editOrderStatus = async (id,dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/order/status/edit/${id}`,
        dataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getOrderMasterList()
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const DeleteOrderStatus = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/order/status/delete/${id}`,
        
        {
          headers: {
            Authorization: AuthToken,
            // 'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getOrderMasterList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const addOrderMasterList = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/order/status/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getOrderMasterList()
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };


  const getdistrictList = async (dataTosend) => {
    try {
      setdistrictList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/district/list`,{...dataTosend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setdistrictList({
          data: response?.data?.data || [],
          total: response?.data?.total,
          loading: false,
        });
      } else {
        setdistrictList({ data: [],total:'', loading: false });
        toast.error("Failed to fetch district list");
      }
    } catch (error) {
      setdistrictList({ data: [], loading: false });
      toast.error("Failed to fetch district list");
    }
  };

  const getStateList = async () => {
    try {
      const response = await axios.post(
        `${base_url}/admin/states/list`,{},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setstateList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setstateList({ data: [], loading: false });
        toast.error("Failed to fetch district list");
      }
    } catch (error) {
      setstateList({ data: [], loading: false });
      toast.error("Failed to fetch district list");
    }
  };


  const getAlldistrictList = async (stateId) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/state/district/list`,{
          state_id : stateId
        },
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setallDistrictList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setallDistrictList({ data: [], loading: false });
        toast.error("Failed to fetch district list");
      }
    } catch (error) {
      setallDistrictList({ data: [], loading: false });
      toast.error("Failed to fetch district list");
    }
  };


  const getAllStateList = async () => {
    try {
      const response = await axios.get(
        `${base_url}/admin/state/list`,
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setallStateList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setallStateList({ data: [], loading: false });
        toast.error("Failed to fetch state list");
      }
    } catch (error) {
      setallStateList({ data: [], loading: false });
      toast.error("Failed to fetch state list");
    }
  };


  const addState = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/state/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getStateList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const addDistrict = async (formDataToSend) => {
    try {
      const { state_id} = formDataToSend
      const response = await axios.post(
        `${base_url}/admin/district/add`,
        {...formDataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getdistrictList(state_id)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editDistrict = async (formDataToSend) => {
    try {
      const { state_id ,district_id} = formDataToSend
      const response = await axios.post(
        `${base_url}/admin/district/edit/${district_id}`,
        {...formDataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getdistrictList(state_id)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editState = async (id,formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/state/edit/${id}`,
        {...formDataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getStateList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const DistrictDelete = async (dataToDelete) => { 
    try {
      const { district_id,state_id } = dataToDelete;
      const response = await axios.delete(
        `${base_url}/admin/district/delete/${district_id}`,
        { headers: { Authorization: AuthToken } }
      );
      
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getdistrictList(state_id); 
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const StateDelete = async (id) => { 
    try {
      const response = await axios.delete(
        `${base_url}/admin/state/delete/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getStateList(); 
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }


  const getAllTimeList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/time-slot/getAll`,{...dataToSend },
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        settimeList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        settimeList({ data: [], loading: false });
        toast.error(response?.data?.message)
      }
    } catch (error) {
      settimeList({ data: [], loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getTimeList = async (dataToSend) => {
    try {
      setTimeListdata({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/time-slots/list`,{...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setTimeListdata({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setTimeListdata({ data: [], loading: false });
        toast.error(response?.data?.message)
      }
    } catch (error) {
      setTimeListdata({ data: [], loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



  const addTimeMaster = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/time-slot/create`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getTimeList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const editTimeMaster = async (id,dataToSend) => {
    try {
      const response = await axios.put(
        `${base_url}/admin/time-slot/update/${id}`,
        {...dataToSend},
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getTimeList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const timeDelete = async (id) => { 
    try {
      const response = await axios.delete(
        `${base_url}/admin/time-slot/delete/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getTimeList(); 
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }


  const getAllPhelboList = async () => {
    try {
      const response = await axios.post(
        `${base_url}/admin/phlebotomists/list`,{},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setPhelboList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setPhelboList({ data: [], loading: false });
        toast.error(response?.data?.message)
      }
    } catch (error) {
      setPhelboList({ data: [], loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getOrderPhelboList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/phlebotomists/getAll`,{...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setorderPhelboList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setorderPhelboList({ data: [], loading: false });
        toast.error(response?.data?.message)
      }
    } catch (error) {
      setorderPhelboList({ data: [], loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getAllItemList = async () => {
    try {
      const response = await axios.post(
        `${base_url}/admin/all/items/list`,{},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setallItemList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setallItemList({ data: [], loading: false });
        // toast.error(response?.data?.message)
      }
    } catch (error) {
      setallItemList({ data: [], loading: false });
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



  const getDesignationMasterList = async (dataToSend) => {
    try {
      setdesignationMasterList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/designation/list`,{...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setdesignationMasterList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setdesignationMasterList({ data: [], loading: false });
        toast.error(response?.data?.message)
      }
    } catch (error) {
      setdesignationMasterList({ data: [], loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const addDesignation = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/designation/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getDesignationMasterList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const DeleteDesignation = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/designation/delete/${id}`,
        
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getDesignationMasterList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editDesignation = async (id,formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/designation/edit/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getDesignationMasterList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getEmailSettingsList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/email-setting/list`,{...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setEmailSettingsList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setEmailSettingsList({ data: [], loading: false });
        toast.error(response?.data?.message)
      }
    } catch (error) {
      setEmailSettingsList({ data: [], loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const editEmailSettingsList = async (id,formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/email-setting/edit/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getEmailSettingsList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getCustomerPetList = async (id,dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/customer/pets/list/${id}`,{...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setPetList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setPetList({ data: [], loading: false });
        toast.error(response?.data?.message)
      }
    } catch (error) {
      setPetList({ data: [], loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const addPet = async (id,dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/customer/pet/add/${id}`,
        dataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        navigate(`/pet-list/${id}`)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



  const getpetDetails = async (id,dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/pet/details/${id}`,{...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setPetDetails({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setPetDetails({ data: [], loading: false });
        toast.error(response?.data?.message)
      }
    } catch (error) {
      setPetDetails({ data: [], loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const editPetList = async (id,formDataToSend,customerId) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/customer/pet/edit/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getCustomerPetList(customerId)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const deletePetList = async (petid,id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/customer/pet/delete/${petid}`,

        {
          headers: {
            Authorization: AuthToken,
            
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getCustomerPetList(id)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getOrderDetails = async (id) => {
    try {
      const response = await axios.get(
        `${base_url}/admin/order/details/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setOrderDetails({ data: response?.data?.data || [], loading: false });
      } else {
        toast.error(response?.data?.message);
        setOrderDetails({ data: [], loading: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setOrderDetails({ data: [], loading: false });
    }
  };

  const getTestDetails = async (id) => {
    try {
      setTestDetails({ data: {} , loading: true });
      const response = await axios.get(
        `${base_url}/admin/test/details/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setTestDetails({ data: response?.data?.data || {}, loading: false });
      } else {
        toast.error(response?.data?.message);
        setTestDetails({ data: {}, loading: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setTestDetails({ data: {}, loading: false });
    }
  };


  const editTest = async (id,formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test/edit/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        navigate('/test-list')
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editParameterUnitMasterList = async (id,dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test/parameter/unit/edit/${id}`,
        dataToSend,
        {
          headers: {
            Authorization: AuthToken,
            // 'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getunitMasterList()
      } else {
        toast.error("server errors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const DeleteParameterUnits = async (id) => {
    try {
      // console.log('id: ' + id);
      const response = await axios.delete(
        `${base_url}/admin/test/parameter/unit/delete/${id}`,
        
        {
          headers: {
            Authorization: AuthToken,
            // 'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getunitMasterList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const DeleteProfessionalFees = async (id) => {
    try {
      console.log('id: ' + id);
      const response = await axios.delete(
        `${base_url}/admin/professional-fee/delete/${id}`,
        
        {
          headers: {
            Authorization: AuthToken,
            // 'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getProfessionalList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getsahcList = async () => {
    try {
      setsahcList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/sahc-master/list `,{},
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setsahcList({ data: response?.data?.data || [], total: response.data.total , loading: false });
      } else {
        toast.error(response?.data?.message);
        setsahcList({ data: [], total:'', loading: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setsahcList({ data: [], loading: false });
    }
  };

  const getallSahcList = async () => {
    try {
      const response = await axios.get(
        `${base_url}/admin/sahc-master/getAll`,
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setallsahcList({ data: response?.data?.data || [],   loading: false });
      } else {
        toast.error(response?.data?.message);
        setallsahcList({ data: [],  loading: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setallsahcList({ data: [], loading: false });
    }
  };



  const addSahc = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/sahc-master/add `,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getsahcList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



  const getDocList = async () => {
    try {
      const response = await axios.post(
        `${base_url}/admin/doctor/list`,{},
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setdocList({ data: response?.data?.data || [], total: response.data.total , loading: false });
      } else {
        toast.error(response?.data?.message);
        setdocList({ data: [], total:'', loading: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setdocList({ data: [], loading: false });
    }
  };


  const addDocMaster = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/doctor/add`,
        {...formDataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getDocList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getZoneList = async () => {
    try {
      const response = await axios.post(
        `${base_url}/admin/zone-master/list`,{},
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setzoneList({ data: response?.data?.data || [], total: response.data.total , loading: false });
      } else {
        toast.error(response?.data?.message);
        setzoneList({ data: [], total:'', loading: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setzoneList({ data: [], loading: false });
    }
  };


  const addZoneMaster = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/zone-master/add`,
        {...formDataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getZoneList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getZonePrice = async (pincode) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/customer/zone`,{pincode:pincode},
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setzonePrice({ data: response?.data?.data || [] , loading: false });
      } else {
        toast.error(response?.data?.message);
        setzonePrice({ data: [], loading: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setzonePrice({ data: [], loading: false });
    }
  };

  const editZonePincodeList = async (dataToSend) => {
    try {
      const {id} = dataToSend
      const response = await axios.put(
        `${base_url}/admin/zone-master/update/${id}`,
        dataToSend,
        {
          headers: {
            Authorization: AuthToken,
            // 'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getZoneList()
      } else {
        toast.error("server errors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editDocList = async (dataToSend) => {
    try {
      const {id} = dataToSend
      const response = await axios.put(
        `${base_url}/admin/doctor/update/${id}`,
        dataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getDocList()
      } else {
        toast.error("server errors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editSahcList = async (id,dataToSend) => {
    try {
     
      const response = await axios.put(
        `${base_url}/admin/sahc-master/update/${id}`,
        dataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getsahcList()
      } else {
        toast.error("server errors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const DeleteSahcFees = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/sahc-master/delete/${id}`,
        {
          headers: {
            Authorization: AuthToken,
            // 'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getsahcList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const DeleteDoc = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/doctor/delete/${id}`,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getDocList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const DeleteZoneFees = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/zone-master/delete/${id}`,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getZoneList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getSahcwiseDoc = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/doctor/getAll`,{colleciton_center_id:dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setSahcDoc({ data: response?.data?.data || [],   loading: false });
      } else {
        toast.error(response?.data?.message);
        setSahcDoc({ data: [],  loading: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setSahcDoc({ data: [], loading: false });
    }
  };


  const getTransationList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/transactions/list`,{...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setTransationList({ data: response?.data?.data || [], total: response.data.total , loading: false });
      } else {
        toast.error(response?.data?.message);
        setTransationList({ data: [], total:'', loading: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setTransationList({ data: [], loading: false });
    }
  };


  const getBankMasterList = async (dataToSend) => {
    try {
      setBankList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/bank/list`,{...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setBankList({ data: response?.data?.data || [], total: response.data.total , loading: false });
      } else {
        toast.error(response?.data?.message);
        setBankList({ data: [], total:'', loading: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setBankList({ data: [], loading: false });
    }
  };


  const addBankMaster = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/bank/add`,
        {...formDataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getBankMasterList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const editBankList = async (id,dataToSend) => {
    try {
     
      const response = await axios.post(
        `${base_url}/admin/bank/edit/${id}`,
        {...dataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getBankMasterList()
      } else {
        toast.error("server errors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const DeleteBank = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/bank/delete/${id}`,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getBankMasterList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getCashinHandList = async (dataToSend) => {
    try {
      setCihList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/phlebotomist/cash-in-hand/list`,{...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setCihList({ data: response?.data?.data || [], total: response.data.total , loading: false });
      } else {
        toast.error(response?.data?.message);
        setCihList({ data: [], total:'', loading: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setCihList({ data: [], loading: false });
    }
  };


  const getAuditTrailList = async (dataToSend) => {
    try {
      setAuditTrailsList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/audit-trails/list`,{...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setAuditTrailsList({ data: response?.data?.data || [], total: response.data.total , loading: false });
      } else {
        toast.error(response?.data?.message);
        setAuditTrailsList({ data: [], total:'', loading: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setAuditTrailsList({ data: [], loading: false });
    }
  };


  const getReportTemplateList = async () => {
    try {
      setReportTemplateList({ data: [], loading: true });
      const response = await axios.get(
        `${base_url}/admin/report-template/list`,
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setReportTemplateList({ data: response?.data?.data || [], total: response.data.total , loading: false });
      } else {
        toast.error(response?.data?.message);
        setReportTemplateList({ data: [], total:'', loading: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setReportTemplateList({ data: [], loading: false });
    }
  };


  const getConatinerList = async () => {
    try {
      setContainerList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/container/list`, {},
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setContainerList({ data: response?.data?.data || [], total: response.data.total , loading: false });
      } else {
       
        setContainerList({ data: [], total:'', loading: false });
      }
    } catch (error) {
   
      setContainerList({ data: [], loading: false });
    }
  };


  const addContainerMaster = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/container/add`,
        {...formDataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getConatinerList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editContainerList = async (id,dataToSend) => {
    try {
     
      const response = await axios.put(
        `${base_url}/admin/container/edit/${id}`,
        {...dataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getConatinerList()
      } else {
        toast.error("server errors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const DeleteContainer = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/container/delete/${id}`,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getConatinerList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getAllConatinerList = async () => {
    try {
      setallContainerList({ data: [], loading: true });
      const response = await axios.get(
        `${base_url}/admin/container/getAll`, 
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setallContainerList({ data: response?.data?.data || [] , loading: false });
      } else {
       
        setallContainerList({ data: [], loading: false });
      }
    } catch (error) {
   
      setallContainerList({ data: [], loading: false });
    }
  };


  const getcsvAudit = async (userType) => {
    try {
        const response = await axios.post(
            `${base_url}/admin/audit-trails/convert-to-csv`,{user_type:userType},
            { headers: { Authorization: AuthToken } }
        );
        if (response.status === 200) {
          setCsvAuditData(response.data.fileUrl );
          return response.data.fileUrl
        } else {
          setCsvAuditData('');
        }
    } catch (error) {
      setCsvAuditData('');
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getParameterGrList = async () => {
    try {
      setparameterGrList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/parameter-group/list`, {},
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setparameterGrList({ data: response?.data?.data || [], total: response.data.total , loading: false });
      } else {
        setparameterGrList({ data: [], total:'', loading: false });
      }
    } catch (error) {
      setparameterGrList({ data: [], loading: false });
    }
  };




  const addParameterGrMaster = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/parameter-group/add`,
        {...formDataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getParameterGrList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editParameterGrList = async (id,dataToSend) => {
    try {
      const response = await axios.put(
        `${base_url}/admin/parameter-group/update/${id}`,
        {...dataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getParameterGrList()
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const DeleteParameterGr = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/parameter-group/delete/${id}`,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getParameterGrList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getAllParameterGrList = async () => {
    try {
      setAllparameterGrList({ data: [], loading: true });
      const response = await axios.get(
        `${base_url}/admin/parameter-group/getAll`, 
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setAllparameterGrList({ data: response?.data?.data || [], loading: false });
      } else {
        setAllparameterGrList({ data: [], loading: false });
      }
    } catch (error) {
      setAllparameterGrList({ data: [], loading: false });
    }
  };


  const getRoleList = async () => {
    try {
      setRoleList({ data: [], loading: true });
      const response = await axios.get(
        `${base_url}/all/admin/roles/list`, 
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setRoleList({ data: response?.data?.data || [], total: response.data.total , loading: false });
      } else {
        setRoleList({ data: [], total:'', loading: false });
      }
    } catch (error) {
      setRoleList({ data: [], loading: false });
    }
  };


  const addRole = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/role/add`,
        {...formDataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getRoleList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const editRoleList = async (id,dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/role/update/${id}`,
        {...dataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getRoleList()
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong"); 
    }
  };


  const getDropDownRoleList = async () => {
    try {
      setdropdownRoleList({ data: [], loading: true });
      const response = await axios.get(
        `${base_url}/admin/role/list`, 
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setdropdownRoleList({ data: response?.data?.data || [], loading: false });
      } else {
        setdropdownRoleList({ data: [], loading: false });
      }
    } catch (error) {
      setdropdownRoleList({ data: [], loading: false });
    }
  };


  const getDropDownMenuList = async () => {
    try {
      setdropdownMenuList({ data: [], loading: true });
      const response = await axios.get(
        `${base_url}/menu/list`, 
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setdropdownMenuList({ data: response?.data?.data || [], loading: false });
      } else {
        setdropdownMenuList({ data: [], loading: false });
      }
    } catch (error) {
      setdropdownMenuList({ data: [], loading: false });
    }
  };


  const getpermissionList = async (dataToSend) => {
    try {
      setPermissionList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/permission/list`, {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setPermissionList({ data: response?.data?.data || [], total: response.data.total , loading: false });
      } else {
        setPermissionList({ data: [], total:'', loading: false });
      }
    } catch (error) {
      setPermissionList({ data: [], loading: false });
    }
  };


  const addPermission  = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/permission/add`,
        {...formDataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getpermissionList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



  const editpermissionList = async (id,dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/permission/edit/${id}`,
        {...dataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getpermissionList()
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong"); 
    }
  };


  const Deletepermission = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/permission/delete/${id}`,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getpermissionList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


 


  const getUserMagList = async (dataToSend) => {
    try {
      setUserMagList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/sub-admin/list`, {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setUserMagList({ data: response?.data?.data || [], total: response.data.total , loading: false });
      } else {
        setUserMagList({ data: [], total:'', loading: false });
      }
    } catch (error) {
      setUserMagList({ data: [], loading: false });
    }
  };

  const addUserManagement  = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/sub-admin/add`,
        {...formDataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getUserMagList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editUserMagList = async (id,dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/sub-admin/update/${id}`,
        {...dataToSend},
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getUserMagList()
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong"); 
    }
  };

  const DeleteUserMag = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/sub-admin/delete/${id}`,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getUserMagList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getDailyReportList = async (dataToSend) => {
    try {
      setDailyReportList({ data: [], loading: true, total: '' });
      const response = await axios.post(
        `${base_url}/daily/report/list`, {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setDailyReportList({ data: response?.data?.data || [], total: response.data.total , loading: false });
      } else {
        setDailyReportList({ data: [], total:'', loading: false });
      }
    } catch (error) {
      setDailyReportList({ data: [], loading: false, total: '' });
    }
  };

  const uploadDailyReport = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/upload/daily/report`, dataToSend,
        { headers: { Authorization: AuthToken,  "Content-Type": "multipart/form-data"  } }
      );
      return response?.data
    } catch (error) {
      return null;
    }
  };

 

  const values = {
    addBreed , breedLists , getBreedList , allBreedList,allbreed,addCustomer,allCustomerList,customerLists,testCategory, gettestCategoryList,addtestCategory,gettestTestList,testList,addTest,getAllTestCategory,alltestCategory,getProfessionalList,professionalList,addProfessional,getAllTest, alltest,addtestPackage,getAllTestPackage , testpackageList , addtask ,getTaskList , taskList,getTPList , testParameter,getPPL,allPPL,addTestParameter,getDDunitList,allUnitList,getunitMasterList, unitMasterList,addUnitMasterList,getSpeciesMasterList,speciesMasterList,addSpeciesMasterList,getOrderMasterList,orderMasterList,addOrderMasterList,getAllSpeciesList,allspecies,getdistrictList,districtList,getStateList,stateList,getAlldistrictList,allDistrictList,getAllStateList,allStateList,customerDelete , TestPackageDetail , tpdetails,editTestPackage ,tpDelete,getAllTimeList,addTimeMaster,editTimeMaster,timeDelete,timeList,getAllPhelboList,allphelboList,getAllItemList, allItemList,editBreed,deleteBreed,getDesignationMasterList, designationMasterList,addDesignation,DeleteDesignation,editDesignation,editSpeciesMasterList,DeleteSpecies,getEmailSettingsList,editEmailSettingsList,emailSettingsList,getCustomerPetList,petList,addPet,editPetList,deleteTest,orderDetails,getOrderDetails,deletePetList,deleteTestcate,editTestCategory, editParameterUnitMasterList, DeleteParameterUnits, DeleteProfessionalFees,editProfessionalFees,deleteTPList,getTestDetails,testDetails,editTest,editOrderStatus,DeleteOrderStatus,getTimeList,timeListdata,addState,addDistrict,editDistrict,DistrictDelete,editState,StateDelete,getsahcList,sahcList,addSahc,getDocList,docList,addDocMaster,getallSahcList,allsahcList,getZoneList,zoneList,addZoneMaster,getZonePrice,zoneprice,editZonePincodeList,editDocList,editSahcList,DeleteSahcFees,DeleteDoc,DeleteZoneFees,getSahcwiseDoc,sahcDoc,getTransationList,transationList,getOrderPhelboList,orderphelboList, getBankMasterList, bankList,addBankMaster,editBankList,DeleteBank,getCashinHandList,cihList,getAuditTrailList,auditTrailsList,getReportTemplateList,reportTemplateList,getConatinerList,containerList,addContainerMaster,editContainerList,DeleteContainer,getAllConatinerList,allContainerList, getcsvAudit, csvAuditData,getParameterGrList,parameterGrList,addParameterGrMaster,editParameterGrList,DeleteParameterGr,getAllParameterGrList,allparameterGrList,getTestParaGr,allTestParaGr,getRoleList,roleList,addRole,editRoleList,getDropDownRoleList,dropdownRoleList,getDropDownMenuList,dropdownMenuList,getpermissionList,permissionList,addPermission,editpermissionList,Deletepermission,getUserMagList,userMagList,addUserManagement,editUserMagList,DeleteUserMag,crmList,crmListsdata,crmCSV, dailyReportList, getDailyReportList, uploadDailyReport
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useMasterContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
