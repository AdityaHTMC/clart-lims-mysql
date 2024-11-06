/* eslint-disable no-unused-vars */
import { Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./screen/auth/Login";
import DashboardContainer from "./screen/Home";
import CategoryPage from "./screen/category";
import SubCategoryPage from "./screen/sub-category";
import SalesOrders from "./screen/Orders";
import SalesTransaction from "./screen/transaction";
import CreateCoupons from "./screen/create-coupon";
import CreatePage from "./screen/create-pages";
import CreateMenu from "./screen/create-menu";
import CreateUser from "./screen/create-user";
import CreateVendors from "./screen/create-vendor";
import Profile from "./screen/Profile";
import AddProduct from "./screen/AddUnitList";
import ListCoupons from "./screen/coupon-list";
import ListPages from "./screen/pages-list";
import MenuList from "./screen/menu-list";

import CommonLayout from "./component/common/common-layout";
import { useAuthContext } from "./helper/AuthProvider";
import ProductEdit from "./screen/ProductEdit";
import BannerList from "./screen/BannerList";
import BrandList from "./screen/BrandList";
import VarityList from "./screen/VarityList";
import PackSize from "./screen/PackSize";
import FaqList from "./screen/FaqList";
import UnitSize from "./screen/UnitSize";
import BagType from "./screen/BagType";
import CmsList from "./screen/CmsList";
import CurrencyList from "./screen/CurrencyList";
import Location from "./screen/Location";
import Categories from "./screen/Categories";
import SmsSettings from "./screen/SmsSettings";
import SubscribeEmail from "./screen/SubscribeEmail";
import SubCategoryList from "./screen/SubCategoryList";
import CityList from "./screen/CityList";
import UserList from "./screen/UserList";
import OrderList from "./screen/OrderList";
import OrderDetails from "./screen/OrderDetails";
import AddCoupon from "./screen/AddCoupon";
import PromoCodeList from "./screen/PromoCodeList";
import VendorList from "./screen/VendorList";
import EventList from "./screen/EventList";
import AddEvent from "./screen/AddEvent";
import FeaturedSection from "./screen/FeaturedSection";
import EditFeatured from "./screen/EditFeatured";
import NotFound from "./screen/NotFound";
import DeliveryBoyList from "./screen/DeliveryBoyList";
import AddDeliveryBoy from "./screen/AddDeliveryBoy";
import EditDeliveryBoy from "./screen/EditDeliveryBoy";
import StoreSetting from "./screen/StoreSetting";
import PermissionManagement from "./screen/permission_management";
import RoleManagement from "./screen/RoleManagement";
import UserManagement from "./screen/UserManagement";
import UnitList from "./screen/UnitList";
import AddUnitList from "./screen/AddUnitList";
import CollectionList from "./screen/CollectionCenter.jsx/CollectionList";
import LabList from "./screen/LabCenter/LabList";
import AddLab from "./screen/LabCenter/AddLab";
import AddCollectionList from "./screen/CollectionCenter.jsx/AddCollectionList";
import PhlebotomistList from "./screen/Phlebotomist/PhlebotomistList";
import AddPhlebotomist from "./screen/Phlebotomist/AddPhlebotomist";
import BreadList from "./Master/BreedMaster/BreadList";
import AddBread from "./Master/BreedMaster/AddBread";
import CustomerList from "./screen/Customers/CustomerList";
import AddCustomer from "./screen/Customers/AddCustomer";
import TestCategory from "./Master/TestCategory/TestCategory";
import TestList from "./Master/TestMaster/TestList";
import AddTestList from "./Master/TestMaster/AddTestList";
import ProfessionalList from "./Master/Professional/ProfessionalList";
import TestPackageList from "./Master/TestPackage/TestPackageList";
import AddTestPackage from "./Master/TestPackage/AddTestPackage";
import TaskList from "./screen/TaskManagement/TaskList";
import AddTask from "./screen/TaskManagement/AddTask";
import TestParameter from "./Master/TestParameter/TestParameter";
import AddTestParameter from "./Master/TestParameter/AddTestParameter";
import UnitMasterList from "./Master/UnitList/UnitMasterList";
import SpeciesList from "./Master/SpeciesMaster/SpeciesList";
import OrderStatusList from "./Master/OrderStatus/OrderStatusList";
import DistrictList from "./LocationManagement/DistrictList";
import StateList from "./LocationManagement/StateList";
import ItemGroup from "./StockManagement/ItemGroup";
import EditTestPackage from "./Master/TestPackage/EditTestPackage";
import TestOrderList from "./OrderMenu/TestOrderList";
import PackageOrder from "./OrderMenu/PackageOrder";
import CreateOrder from "./OrderMenu/CreateOrder";
import BarcodeList from "./Barcode/BarcodeList";
import TimeSlotsList from "./Master/TimeSlots/TimeSlotsList";
import ItemManagement from "./StockManagement/ItemManagement";
import VendorManagement from "./StockManagement/VendorManagement";
import PurchaseList from "./StockManagement/PurchaseList";
import StockReport from "./StockManagement/StockReport";
import StockHistory from "./StockManagement/StockHistory";
import StockLQA from "./StockManagement/StockLQA";
import AddPet from "./screen/Customers/AddPet";

function App() {
  const { initialLoading } = useAuthContext();

  if (initialLoading) {
    return null;
  }

  return (
    <Fragment>
      <Routes>
        <Route element={<CommonLayout />}>
          <Route path="/dashboard" element={<DashboardContainer />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/product/sub-category" element={<SubCategoryPage />} />
          <Route path="/unit-list" element={<UnitList />} />
          <Route path="/product-edit/:id" element={<ProductEdit />} />
          <Route path="/banner-management" element={<BannerList />} />
          <Route path="/brand-master" element={<BrandList />} />
          <Route path="/variety-master" element={<VarityList />} />
          <Route path="/pack-size" element={<PackSize />} />
          <Route path="/unit-master" element={<UnitSize />} />
          <Route path="/bag-type" element={<BagType />} />
          <Route path="/cms-management" element={<CmsList />} />
          <Route path="/currency" element={<CurrencyList />} />
          <Route path="/country" element={<Location />} />
          <Route path="/faq-management" element={<FaqList />} />
          <Route path="/sms-settings" element={<SmsSettings />} />
          <Route path="/subscribed-email" element={<SubscribeEmail />} />
          <Route path="/subcategory-List/:id" element={<SubCategoryList />} />
          
          <Route path="/city-list/:id" element={<CityList />} />
          <Route path="/customer" element={<UserList />} />
          <Route path="/lab-list" element={<LabList />} />
          <Route path="/add-lab" element={<AddLab />} />
          <Route path="/collection-center-list" element={<CollectionList />} />
          <Route path="/add-connection" element={<AddCollectionList />} />
          
          <Route path="/phlebotomist-list" element={<PhlebotomistList />} />


          <Route path="/add-phlebotomist" element={<AddPhlebotomist />} />

          <Route path="/customers-list" element={<CustomerList />} />

          <Route path="/add-customer" element={<AddCustomer />} />

          {/* master */}

          <Route path="/breed-management" element={<BreadList />} />
          <Route path="/add-breed" element={<AddBread />} />
          <Route path="/test-list" element={<TestList />} />
          <Route path="/professional-fees" element={<ProfessionalList />} />

          <Route path="/test-packages" element={<TestPackageList />} />
          <Route path="/add-test-packages" element={<AddTestPackage />} />
          <Route path="/testpackage-edit/:id" element={<EditTestPackage />} />
          <Route path="/test-parameters" element={<TestParameter />} />
          <Route path="/test-parameter-units" element={<UnitMasterList />} />

          <Route path="/species-management" element={<SpeciesList />} />
          <Route path="/order-status" element={<OrderStatusList />} />
          <Route path="/add-test-parameters" element={<AddTestParameter />} />

          <Route path="/district-management" element={<DistrictList />} />

          <Route path="/state-management" element={<StateList />} />
          <Route path="/timeslots-management" element={<TimeSlotsList />} />

          {/* stock start */}
          <Route path="/item-groups" element={<ItemGroup />} />
          <Route path="/item-management" element={<ItemManagement />} />
          <Route path="/vendor-management" element={<VendorManagement/>} />
          <Route path="/purchase-to-stock" element={<PurchaseList/>} />
          <Route path="/stock-reports" element={<StockReport/>} />
          <Route path="/stock-history/:id" element={<StockHistory/>} />
          <Route path="/low-quantity-stocks" element={<StockLQA/>} />
          {/* stock end */}

          {/* order start */}
          <Route path="/test-order" element={<TestOrderList />} />
          <Route path="/package-orders" element={<PackageOrder />} />
          <Route path="/add-order" element={<CreateOrder />} />
          {/* order end */}
          
          <Route path="/add-pet/:id" element={<AddPet />} />

          <Route path="/barcode-management" element={<BarcodeList />} />

          <Route path="/task-management" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/test-categories" element={<TestCategory />} />
          <Route path="/add-test" element={<AddTestList />} />
          <Route path="/all-orders" element={<OrderList status="" />} />
          <Route
            path="/pending-orders"
            element={<OrderList status="Pending" />}
          />
          <Route
            path="/cancelled-orders"
            element={<OrderList status="Cancelled" />}
          />
          <Route
            path="/confirmed-orders"
            element={<OrderList status="Confirmed" />}
          />
          <Route
            path="/processing-orders"
            element={<OrderList status="Processing" />}
          />
          <Route
            path="/on-the-way-orders"
            element={<OrderList status="On The Way" />}
          />
          <Route
            path="/delivered-orders"
            element={<OrderList status="Delivered" />}
          />
          <Route
            path="/pickup-orders"
            element={<OrderList status="Pickup" />}
          />
          <Route
            path="/completed-orders"
            element={<OrderList status="Completed" />}
          />

          <Route path="/orders-details/:id" element={<OrderDetails />} />
          <Route path="/addcoupons" element={<AddCoupon />} />
          <Route path="/promo-code" element={<PromoCodeList />} />

          <Route path="/fulfillment-center" element={<VendorList />} />
          <Route path="/news-events" element={<EventList />} />

          <Route path="/featured-section" element={<FeaturedSection />} />

          <Route path="/edit-section/:id" element={<EditFeatured />} />

          <Route path="/addEvent" element={<AddEvent />} />

          <Route path="/delivery-boys" element={<DeliveryBoyList />} />

          <Route path="/add-delivery-boys" element={<AddDeliveryBoy />} />

          <Route path="/editDelivery/:id" element={<EditDeliveryBoy />} />
          <Route path="/store-settings" element={<StoreSetting />} />

          <Route path="/permission-management" element={<PermissionManagement />} />

          

          <Route path="/role-management" element={<RoleManagement />} />

          <Route path="/user-management" element={<UserManagement />} />

          <Route path="/sales/orders" element={<SalesOrders />} />
          <Route path="/sales/transactions" element={<SalesTransaction />} />
          <Route path="/create-coupons" element={<CreateCoupons />} />
          <Route path="/coupons-list" element={<ListCoupons />} />
          <Route path="/create-pages" element={<CreatePage />} />
          <Route path="/pages-list" element={<ListPages />} />
          <Route path="/create-menus" element={<CreateMenu />} />
          <Route path="/menu-list" element={<MenuList />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/create-vendor" element={<CreateVendors />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-products" element={<AddUnitList />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
