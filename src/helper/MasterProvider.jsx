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
  const [testCategory, settestCategory] = useState({loading: true,data: [],total: ""});
  const [testList, settestList] = useState({loading: true,data: [],total: ""});
  const [professionalList, setprofessionalList] = useState({loading: true,data: [],total: ""});
  const [testpackageList, settestpackageList] = useState({loading: true,data: [],total: ""});
  const [taskList, setTaskList] = useState({loading: true,data: [],total: ""});
  const [allbreed, setallbreed] = useState({loading: true,data: []});
  const [alltestCategory, setalltestCategory] = useState({loading: true,data: []});
  const [testParameter, setTestParameter] = useState({loading: true,data: []});
  const [unitMasterList, setUnitMasterList] = useState({loading: true,data: [],total: ""});
  const [speciesMasterList, setSpeciesMasterList] = useState({loading: true,data: [],total: ""});
  const [orderMasterList, setorderMasterList] = useState({loading: true,data: [],total: ""});
  const [districtList, setdistrictList] = useState({loading: true,data: [],total: ""});
  const [stateList, setstateList] = useState({loading: true,data: [],total: ""});
  const [alltest, setalltest] = useState({loading: true,data: []});
  const [allPPL, setallPPL] = useState({loading: true,data: []});
  const [allspecies, setallspecies] = useState({loading: true,data: []});
  const [allUnitList, setallUnitList] = useState({loading: true,data: []});
  const [allDistrictList, setallDistrictList] = useState({loading: true,data: []});
  const [allStateList, setallStateList] = useState({loading: true,data: []});
  const [allItemList, setallItemList] = useState({loading: true,data: []});
  const [tpdetails, setTpdetails] = useState({loading: true,data: []});
  const [timeList, settimeList] = useState({loading: true,data: []});
  const [timeListdata, setTimeListdata] = useState({loading: true,data: [],total: ""});
  const [allphelboList, setPhelboList] = useState({loading: true,data: [],total: ""});
  const [designationMasterList, setdesignationMasterList] = useState({loading: true,data: [],total: ""});
  const [emailSettingsList, setEmailSettingsList] = useState({loading: true,data: [],total: ""});
  const [petList, setPetList] = useState({loading: true,data: [],total: ""});
  const [petDetails, setPetDetails] = useState({loading: true,data: []});
  const [orderDetails, setOrderDetails] = useState({ loading: true, data: [] }) 
  const [testDetails, setTestDetails] = useState({ loading: true, data: [] }) 
  const [sahcList, setsahcList] = useState({loading: true,data: [],total: ""});
  const [allsahcList, setallsahcList] = useState({loading: true,data: []});
  const [docList, setdocList] = useState({loading: true,data: [],total: ""});
  const [zoneList, setzoneList] = useState({loading: true,data: [],total: ""});
  const [zoneprice, setzonePrice] = useState({loading: true,data: []});
  const [sahcDoc, setSahcDoc] = useState({loading: true,data: []});
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
        toast.success("Breed added successfully");
        navigate("/breed-management");
      } else {
        toast.error("Failed to add Breed");
      }
    } catch (error) {
      console.error("Error adding Breed:", error);
      toast.error("An error occurred while adding the Breed");
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
        toast.error(response?.data?.message)
      }
    } catch (error) {
      setbreedLists({ data: [], total: "", loading: false });
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      console.error("Error adding Breed:", error);
      toast.error(error.response?.data?.message || 'Server error');
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
        toast.error("Failed to fetch breed list");
      }
    } catch (error) {
        setallbreed({ data: [], total: "", loading: false });
      toast.error("Failed to fetch breed list");
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
        toast.success("customer added successfully");
        navigate("/customers-list");
      } else {
        toast.error("Failed to add customer");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      toast.error("An error occurred while adding the customer");
    }
  };

  const allCustomerList = async (dataToSend) => {
    try {
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
        toast.error("Failed to fetch customer list");
      }
    } catch (error) {
        setcustomerLists({ data: [], total: "", loading: false });
      toast.error("Failed to fetch customer list");
    }
  };


  const customerDelete = async (id) => { 
    try {
      const response = await axios.delete(
        `${base_url}/admin/customer/delete/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      
      if (response.status === 200) {
        toast.success('customer deleted successfully');
        allCustomerList(); 
      } else {
        toast.error('Failed to delete customer');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('An error occurred while deleting the customer');
    }
  }

  const gettestCategoryList = async (dataToSend) => {
    try {
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
        toast.error("Failed to fetch customer list");
      }
    } catch (error) {
      settestCategory({ data: [], total: "", loading: false });
      toast.error("Failed to fetch customer list");
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
        toast.success("Test category added successfully");
        gettestCategoryList()
      } else {
        toast.error("Failed to add Test category");
      }
    } catch (error) {
      console.error("Error adding Test category:", error);
      toast.error("An error occurred while adding the Test category");
    }
  };


  const gettestTestList = async (dataToSend) => {
    try {
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
        toast.error("Failed to fetch test list");
      }
    } catch (error) {
      settestList({ data: [], total: "", loading: false });
      toast.error("Failed to fetch test list");
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
        toast.error("server errors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
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
        toast.error("server errors");
      }
    } catch (error) {
      console.error("Error edit Test category:", error);
      toast.error(error.response?.data?.message || "Server error");
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
        toast.error("server errors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
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
        toast.error("server errors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  const getAllTestCategory = async (data) => {
    try {
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
        toast.error("Failed to fetch test category list");
      }
    } catch (error) {
      setalltestCategory({ data: [], total: "", loading: false });
      toast.error("Failed to fetch test category list");
    }
  };


 

  const getProfessionalList = async (dataToSend) => {
    try {
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
        toast.error(response?.data?.message)
      }
    } catch (error) {
      setprofessionalList({ data: [], total: "", loading: false });
      toast.error(error.response?.data?.message || 'Server error');
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
        toast.success("Test category added successfully");
        getProfessionalList()
      } else {
        toast.error("Failed to add Test category");
      }
    } catch (error) {
      console.error("Error adding Test category:", error);
      toast.error("An error occurred while adding the Test category");
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
      toast.error(error.response?.data?.message || "Server error");
    }
  };


  const getAllTest = async (data) => {
    try {
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
        toast.error("Failed to fetch test list");
      }
    } catch (error) {
      setalltest({ data: [], total: "", loading: false });
      toast.error("Failed to fetch test list");
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
        toast.success("Test package added successfully");
       navigate('/test-packages')
      } else {
        toast.error("Failed to add Test category");
      }
    } catch (error) {
      console.error("Error adding Test package:", error);
      toast.error("An error occurred while adding the Test package");
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
        toast.error("server errors");
      }
    } catch (error) {
      console.error("Error adding Test package:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  const getAllTestPackage = async (dataToSend) => {
    try {
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
        toast.error(response?.data?.message)
      }
    } catch (error) {
      settestpackageList({ data: [], total: "", loading: false });
      toast.error(error.response?.data?.message || 'Server error');
    }
  };

  const tpDelete = async (id) => { 
    try {
      const response = await axios.delete(
        `${base_url}/admin/test-package/delete/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      
      if (response.status === 200) {
        toast.success('Test package deleted successfully');
        getAllTestPackage(); 
      } else {
        toast.error('Failed to delete Test package');
      }
    } catch (error) {
      console.error('Error deleting Test package:', error);
      toast.error('An error occurred while deleting the Test package');
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
        toast.error("Failed to fetch test list");
      }
    } catch (error) {
      setTpdetails({ data: [], total: "", loading: false });
      toast.error("Failed to fetch test list");
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
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Task management added successfully");
       navigate('/task-management')
      } else {
        toast.error("Failed to add Task management");
      }
    } catch (error) {
      console.error("Error adding Test package:", error);
      toast.error("An error occurred while adding the Task management");
    }
  };


  const getTaskList = async (dataToSend) => {
    try {
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
        toast.error(response?.data?.message)
      }
    } catch (error) {
      setTaskList({ data: [], total: "", loading: false });
      toast.error(error.response?.data?.message || 'Server error');
    }
  };


  const getTPList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test-parameter/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setTestParameter({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setTestParameter({ data: [], total: "", loading: false });
        toast.error("Failed to fetch test parameter list");
      }
    } catch (error) {
      setTestParameter({ data: [], total: "", loading: false });
      toast.error("Failed to fetch test parameter list");
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
      toast.error(error.response?.data?.message || 'Server error');
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


  const addTestParameter = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test-parameter/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
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
        toast.error("Failed to fetch unit list");
      }
    } catch (error) {
      setallUnitList({ data: [], loading: false });
      toast.error("Failed to fetch unit list");
    }
  };

  const getunitMasterList = async (dataToSend) => {
    try {
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
        toast.error(response?.data?.message)
      }
    } catch (error) {
      setUnitMasterList({ data: [], loading: false });
      toast.error(error.response?.data?.message || 'Server error');
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
        toast.error("Failed to fetch unit list");
      }
    } catch (error) {
      setSpeciesMasterList({ data: [], loading: false });
      toast.error("Failed to fetch unit list");
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
        toast.error("Failed to fetch unit list");
      }
    } catch (error) {
      setallspecies({ data: [], loading: false });
      toast.error("Failed to fetch unit list");
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
        toast.success("Species unit added successfully");
        getSpeciesMasterList()
      } else {
        toast.error("Failed to add Species unit");
      }
    } catch (error) {
      console.error("Error adding Species unit:", error);
      toast.error("An error occurred while adding the Species unit");
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
      toast.error(error.response?.data?.message || "Server error");
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
      toast.error(error.response?.data?.message || 'Server error');
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
        toast.error("Failed to fetch unit list");
      }
    } catch (error) {
      setorderMasterList({ data: [], loading: false });
      toast.error("Failed to fetch unit list");
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
        toast.error("server errors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
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
      toast.error(error.response?.data?.message || 'Server error');
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
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Order Status added successfully");
        getOrderMasterList()
      } else {
        toast.error("Failed to add Order Status");
      }
    } catch (error) {
      console.error("Error adding Order Status:", error);
      toast.error("An error occurred while adding the Order Status");
    }
  };


  const getdistrictList = async (dataTosend) => {
    try {
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
    }
  }


  const getAllTimeList = async (booking_date ) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/time-slot/getAll`,{
          booking_date :booking_date 
        },
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
      toast.error(error.response?.data?.message || 'Server error');
    }
  };

  const getTimeList = async (dataToSend) => {
    try {
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      // toast.error(error.response?.data?.message || 'Server error');
    }
  };



  const getDesignationMasterList = async (dataToSend) => {
    try {
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
            'Content-Type': 'application/json' ,
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || "Server error");
      setOrderDetails({ data: [], loading: false });
    }
  };

  const getTestDetails = async (id) => {
    try {
      const response = await axios.get(
        `${base_url}/admin/test/details/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setTestDetails({ data: response?.data?.data || [], loading: false });
      } else {
        toast.error(response?.data?.message);
        setTestDetails({ data: [], loading: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      setTestDetails({ data: [], loading: false });
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || "Server error");
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
    }
  };


  const getsahcList = async () => {
    try {
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
      toast.error(error.response?.data?.message || "Server error");
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
      toast.error(error.response?.data?.message || "Server error");
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || "Server error");
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || "Server error");
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || "Server error");
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
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  const editDocList = async (id,dataToSend) => {
    try {
     
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
      toast.error(error.response?.data?.message || "Server error");
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
      toast.error(error.response?.data?.message || "Server error");
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
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
      toast.error(error.response?.data?.message || 'Server error');
    }
  };


  const getSahcwiseDoc = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/doctor/getAll`,{sahc_id:dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      if (response.status === 200) {
        setSahcDoc({ data: response?.data?.data || [],   loading: false });
      } else {
        toast.error(response?.data?.message);
        setSahcDoc({ data: [],  loading: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      setSahcDoc({ data: [], loading: false });
    }
  };




  const values = {
    addBreed , breedLists , getBreedList , allBreedList,allbreed,addCustomer,allCustomerList,customerLists,testCategory, gettestCategoryList,addtestCategory,gettestTestList,testList,addTest,getAllTestCategory,alltestCategory,getProfessionalList,professionalList,addProfessional,getAllTest, alltest,addtestPackage,getAllTestPackage , testpackageList , addtask ,getTaskList , taskList,getTPList , testParameter,getPPL,allPPL,addTestParameter,getDDunitList,allUnitList,getunitMasterList, unitMasterList,addUnitMasterList,getSpeciesMasterList,speciesMasterList,addSpeciesMasterList,getOrderMasterList,orderMasterList,addOrderMasterList,getAllSpeciesList,allspecies,getdistrictList,districtList,getStateList,stateList,getAlldistrictList,allDistrictList,getAllStateList,allStateList,customerDelete , TestPackageDetail , tpdetails,editTestPackage ,tpDelete,getAllTimeList,addTimeMaster,editTimeMaster,timeDelete,timeList,getAllPhelboList,allphelboList,getAllItemList, allItemList,editBreed,deleteBreed,getDesignationMasterList, designationMasterList,addDesignation,DeleteDesignation,editDesignation,editSpeciesMasterList,DeleteSpecies,getEmailSettingsList,editEmailSettingsList,emailSettingsList,getCustomerPetList,petList,addPet,editPetList,deleteTest,orderDetails,getOrderDetails,deletePetList,deleteTestcate,editTestCategory, editParameterUnitMasterList, DeleteParameterUnits, DeleteProfessionalFees,editProfessionalFees,deleteTPList,getTestDetails,testDetails,editTest,editOrderStatus,DeleteOrderStatus,getTimeList,timeListdata,addState,addDistrict,editDistrict,DistrictDelete,editState,StateDelete,getsahcList,sahcList,addSahc,getDocList,docList,addDocMaster,getallSahcList,allsahcList,getZoneList,zoneList,addZoneMaster,getZonePrice,zoneprice,editZonePincodeList,editDocList,editSahcList,DeleteSahcFees,DeleteDoc,DeleteZoneFees,getSahcwiseDoc,sahcDoc
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
