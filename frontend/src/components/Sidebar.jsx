import { Link } from "react-router-dom";


function Sidebar(){

    return (

        <aside>


            <h2>
                StreamForge
            </h2>


            <nav>


                <ul>


                    <li>
                        <Link to="/dashboard">
                            Dashboard
                        </Link>
                    </li>


                    <li>
                        <Link to="/customers">
                            Customers
                        </Link>
                    </li>


                    <li>
                        <Link to="/products">
                            Products
                        </Link>
                    </li>


                    <li>
                        <Link to="/orders">
                            Orders
                        </Link>
                    </li>


                    <li>
                        <Link to="/inventory">
                            Inventory
                        </Link>
                    </li>


                </ul>


            </nav>


        </aside>

    );

}


export default Sidebar;