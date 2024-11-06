/* eslint-disable no-unused-vars */
import axios from 'axios';
import  { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

    const base_url = import.meta.env.VITE_API_URL

    const [user, setUser] = useState(null);
    const [Authtoken, setAuthtoken] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [permissionList, setPermissionList] = useState({total_page: 1, current_page: 1, loading: true, data: []})
    const [allPermission, setAllPermission] = useState([]);
    const [rolesList, setRolesList] = useState({total_page: 1, current_page: 1, loading: true, data: []})
    const [allRoles, setAllRoles] = useState([]);
    const [subAdminList, setSubAdminList] = useState({total_page: 1, current_page: 1, loading: true, data: []})
    const [allMenuList, setallMenuList] = useState({loading: true,data: []});
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const tk = localStorage.getItem('Authtoken')
        if(tk){
            setAuthtoken(tk)
        }else{
            setAuthtoken(null)
            setInitialLoading(false)
            navigate('/login')
        }
    }, [])


    const admin_login = async (data) => {
        try {
            const response = await axios.post(`${base_url}/admin/login`, data);
            if(response.status === 200) {
                localStorage.setItem('Authtoken', response?.data?.token)
                setAuthtoken(response?.data?.token || null)
                toast.success('Logged in successfully');
                navigate('/dashboard', {replace: true})
            }else {
                toast.error(response?.data?.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
        }
    }

    const validate_admin = async () => {
        try {
            const response = await axios.post(`${base_url}/admin/validate`, {}, {
                headers: {
                    'Authorization': `${Authtoken}`
                }
            });
            if(response.status === 200) {
                setUser(response?.data?.user || null)
                if(location.pathname === '/login'){
                    navigate('/dashboard', {replace: true})
                }
            }else {
                navigate('/login', {replace: true})
                setAuthtoken(null)
                toast.error(response?.data?.message)
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            navigate('/login', {replace: true})
            setAuthtoken(null)
            toast.error('Server error');
        } finally {
            setInitialLoading(false)
        }
    }


    const getPermissionList = async (body) => {
        try {
            setPermissionList({...permissionList, loading: true})
            const {data} = await axios.post(`${base_url}/permissions/list`, body || {}, {
                headers: {
                    'Authorization': Authtoken,
                }
            })
            if(data?.status === 200){
                setPermissionList({ loading: false, data: data.data, total_page: data.pages, current_page: data.page})
            }else{
                setPermissionList({...permissionList, loading: false})
                console.error(data.message)
            }
        } catch (error) {
            setPermissionList({...permissionList, loading: false})
            toast.error(error.response?.data?.message || 'Server error');
        }
    }


    const getAllPermission = async () => {
        try {
            const {data} = await axios.get(`${base_url}/permissions/getAll`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setAllPermission(data.data)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
        }
    }

    const CreatePermission = async (formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/permission/add`,
            formDataToSend,
            {
              headers: {
               'Authorization': Authtoken,
               'Content-Type': 'application/json',
              },
            }
          );
          if (response.status === 200) {
            toast.success("permission added successfully");
            
          } else {
            toast.error("Failed to add permission");
          }
        } catch (error) {
          console.error("Error adding permission:", error);
          toast.error("An error occurred while adding the permission");
        }
      };
    



    const update_permission = async (id, body) => {
        try {
            const {data} = await axios.put(`${base_url}/permissions/update/${id}`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            return error?.response?.data || null
        }
    }



    const getRolesList = async (body) => {
        try {
            const {data} = await axios.post(`${base_url}/role/list`, body || {}, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.status === 200){
                setRolesList({ loading: false, data: data.data, total_page: data.pages, current_page: data.page})
            }else{
                setRolesList({...rolesList, loading: false})
                console.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            setRolesList({...rolesList, loading: false})
        }
    }

    const create_role = async (body) => {
        try {
            const {data} = await axios.post(`${base_url}/role/add`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            return error?.response?.data || null
        }
    }

    const update_role = async (id, body) => {
        try {
            const {data} = await axios.put(`${base_url}/role/update/${id}`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            return error?.response?.data || null
        }
    }

    const role_detail = async (id) => {
        try {
            const {data} = await axios.get(`${base_url}/admin/role/detail/${id}`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            return data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            return error?.response?.data || null
        }
    }

    // Roles list all
    const getAllRoles = async () => {
        try {
            const {data} = await axios.get(`${base_url}/role/getAll`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setAllRoles(data.data)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
        }
    }

    const getSubAdminList = async (body) => {
        try {
            const {data} = await axios.post(`${base_url}/sub_admin/list`, body || {}, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setSubAdminList({ loading: false, data: data.data, total_page: data.pages, current_page: data.page})
            }else{
                setSubAdminList({...subAdminList, loading: false})
                console.error(data.message)
            }
        } catch (error) {
            setSubAdminList({...subAdminList, loading: false})
            toast.error(error.response?.data?.message || 'Server error');
        }
    }


    const getMenuList = async () => {
        try {
          const response = await axios.get(
            `${base_url}/all/menu/list`,
            { headers: { 'Authorization': Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setallMenuList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setallMenuList({ data: [], loading: false });
            toast.error("Failed to fetch menu list");
          }
        } catch (error) {
            setallMenuList({ data: [], loading: false });
          toast.error("Failed to fetch menu list");
        }
      };
    



    useEffect(() => {
        if((!initialLoading && !Authtoken)){
            navigate('/login')
        }
        if(initialLoading && !user && Authtoken){
            validate_admin()
        }       
    }, [initialLoading, user, Authtoken])

    const values = {
        Authtoken, user, admin_login, validate_admin, initialLoading,getPermissionList,permissionList,CreatePermission,update_permission,getAllPermission,allPermission, getRolesList, rolesList, getAllRoles, allRoles, create_role, update_role, role_detail,getSubAdminList,subAdminList,getMenuList,allMenuList,
    }
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('error');
    }
    return context
};
