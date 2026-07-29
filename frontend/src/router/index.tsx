import {
    Routes,
    Route,
    Outlet
} from "react-router-dom";


import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Overview";


function Layout() {

    return (

        <DashboardLayout>

            <Outlet />

        </DashboardLayout>

    );

}



function Router() {

    return (

        <Routes>

            <Route
                element={<Layout />}
            >

                <Route
                    path="/"
                    element={<Dashboard />}
                />

            </Route>


        </Routes>

    );

}


export default Router;