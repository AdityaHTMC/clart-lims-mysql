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
  const [timeList, settimeList] = useState({loading: true,data: [],total: ""});
  const [allphelboList, setPhelboList] = useState({loading: true,data: [],total: ""});
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
            "Content-Type": "multipart/form-data", // Set correct content type for FormData
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

  const getBreedList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/breed/list`,
        {},
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
        toast.error("Failed to fetch product list");
      }
    } catch (error) {
      setbreedLists({ data: [], total: "", loading: false });
      toast.error("Failed to fetch product list");
    }
  };


  const allBreedList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/all/breeds`,
        {},
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


  const addTest = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test/add`,
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
        navigate("/test-list");
      } else {
        toast.error("Failed to add Test category");
      }
    } catch (error) {
      console.error("Error adding Test category:", error);
      toast.error("An error occurred while adding the Test category");
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

  const getProfessionalList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/professional-fee/list`,
        {},
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
        toast.error("Failed to fetch test category list");
      }
    } catch (error) {
      setprofessionalList({ data: [], total: "", loading: false });
      toast.error("Failed to fetch test category list");
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
            'Content-Type': 'application/json' ,
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
        `${base_url}/admin/test-package/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
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
            'Content-Type': 'application/json' ,
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

  const getAllTestPackage = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test-package/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        settestpackageList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        settestpackageList({ data: [], total: "", loading: false });
        toast.error("Failed to fetch test list");
      }
    } catch (error) {
      settestpackageList({ data: [], total: "", loading: false });
      toast.error("Failed to fetch test list");
    }
  };

  const tpDelete = async (id) => { 
    try {
      const response = await axios.get(
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


  const getTaskList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/task/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setTaskList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setTaskList({ data: [], total: "", loading: false });
        toast.error("Failed to fetch test list");
      }
    } catch (error) {
      setTaskList({ data: [], total: "", loading: false });
      toast.error("Failed to fetch test list");
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

  const getPPL = async (testId) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test/parent/parameter/list`,
        {testId: testId},
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
        toast.error("Failed to fetch test parameter list");
      }
    } catch (error) {
      setallPPL({ data: [], total: "", loading: false });
      toast.error("Failed to fetch test parameter list");
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

  const getunitMasterList = async (testId) => {
    try {
      const response = await axios.post(
        `${base_url}/test/parameter/units/list`,{},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setUnitMasterList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setUnitMasterList({ data: [], loading: false });
        toast.error("Failed to fetch unit list");
      }
    } catch (error) {
      setUnitMasterList({ data: [], loading: false });
      toast.error("Failed to fetch unit list");
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
       navigate('/test-parameter-units')
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


  const getdistrictList = async () => {
    try {
      const response = await axios.post(
        `${base_url}/admin/district/list`,{},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setdistrictList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setdistrictList({ data: [], loading: false });
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


  const getAllTimeList = async () => {
    try {
      const response = await axios.get(
        `${base_url}/admin/time-slot/getAll`,
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        settimeList({
          data: response?.data?.data || [],
          total: response.data.total,
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
        getAllTimeList()
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
      const response = await axios.post(
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
        getAllTimeList()
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
        getAllTimeList(); 
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
        toast.error(response?.data?.message)
      }
    } catch (error) {
      setallItemList({ data: [], loading: false });
      toast.error(error.response?.data?.message || 'Server error');
    }
  };



  const values = {
    addBreed , breedLists , getBreedList , allBreedList,allbreed,addCustomer,allCustomerList,customerLists,testCategory, gettestCategoryList,addtestCategory,gettestTestList,testList,addTest,getAllTestCategory,alltestCategory,getProfessionalList,professionalList,addProfessional,getAllTest, alltest,addtestPackage,getAllTestPackage , testpackageList , addtask ,getTaskList , taskList,getTPList , testParameter,getPPL,allPPL,addTestParameter,getDDunitList,allUnitList,getunitMasterList, unitMasterList,addUnitMasterList,getSpeciesMasterList,speciesMasterList,addSpeciesMasterList,getOrderMasterList,orderMasterList,addOrderMasterList,getAllSpeciesList,allspecies,getdistrictList,districtList,getStateList,stateList,getAlldistrictList,allDistrictList,getAllStateList,allStateList,customerDelete , TestPackageDetail , tpdetails,editTestPackage ,tpDelete,getAllTimeList,addTimeMaster,editTimeMaster,timeDelete,timeList,getAllPhelboList,allphelboList,getAllItemList, allItemList
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
