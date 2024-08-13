import { Suspense, lazy } from "react";
import { Routes, Route ,Navigate} from "react-router-dom";

import CardRequestListing from "../Pages/card-request/CardRequestListing";
import ViewCardRequest from "../Pages/card-request/view/ViewCardRequest";

import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";

const UnAuthorizedAccess = lazy(
  () => import("../components/UnAuthorizedAccess")
);
const ValidateAuthToken = lazy(
  () => import("../components/ValidateAuthToken")
);
const NotFound = lazy(() => import("../components/PageNotFound"));
const Dashboard = lazy(() => import("../Pages/dashboard/Dashboard"));
const UserListing = lazy(() => import("../Pages/users-settings/users/Listing"));
const CreateUser = lazy(
  () => import("../Pages/users-settings/users/create/CreateUser")
);
const EditUser = lazy(
  () => import("../Pages/users-settings/users/edit/EditUser")
);
const ViewUser = lazy(
  () => import("../Pages/users-settings/users/View/ViewUser")
);
const RolesListing = lazy(
  () => import("../Pages/users-settings/roles/RolesListing")
);
const CorporateEmployeeListing = lazy(
  () => import("../Pages/employees/list/EmployeeListing")
);
const CorporateViewEmployee = lazy(
  () => import("../Pages/employees/view/ViewEmployee")
);

const Reports = lazy(
  () => import("../Pages/reports")
);


export const Layout = () => (
  <div className="relative z-[89] ">
    <Suspense fallback={<h1 className="lazy-loading"> Loading....</h1>}>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute module="dashboard">
              <Dashboard />
            </PrivateRoute>
          }
        />
        <>
          <Route
            path="/admin/user-settings/users"
            element={
              <PrivateRoute module="users">
                <UserListing />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/user-settings/users/create"
            element={
              <PrivateRoute module="users">
                <CreateUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/user-settings/users/view/:id"
            element={
              <PrivateRoute module="users">
                <ViewUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/user-settings/users/edit/:id"
            element={
              <PrivateRoute module="users">
                <EditUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/user-settings/roles"
            element={
              <PrivateRoute module="roles">
                <RolesListing />
              </PrivateRoute>
            }
          />
        </>
        <>
          <Route
            path="/admin/card-requests"
            element={
              <PrivateRoute module="card-requests">
                <CardRequestListing />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/card-requests/view/:id"
            element={
              <PrivateRoute module="card-requests">
                <ViewCardRequest />
              </PrivateRoute>
            }
          />
        </>

        <>
          <Route
            path="/admin/employees"
            element={
              <PrivateRoute module="employees">
                <CorporateEmployeeListing />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/employees/view/:id"
            element={
              <PrivateRoute module="employees">
                <CorporateViewEmployee />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <PrivateRoute module="reports">
                <Reports />
              </PrivateRoute>
            }
          />
        </>

        <Route path="*" element={<NotFound />} />

        <Route path="/login" element={<Login />} />

        <Route path="un-authorized" element={<UnAuthorizedAccess />} />
        <Route path="/auth/validate-sso-token" element={<ValidateAuthToken />} />
        <Route path="/auth/logout" element={<ValidateAuthToken />} />
      </Routes>
    </Suspense>
  </div>
);
