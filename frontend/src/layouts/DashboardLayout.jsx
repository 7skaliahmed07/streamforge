import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";


function DashboardLayout({children}) {


    return (

        <div>


            <Navbar />


            <div>

                <Sidebar />


                <main>

                    {children}

                </main>


            </div>


        </div>

    );

}


export default DashboardLayout;