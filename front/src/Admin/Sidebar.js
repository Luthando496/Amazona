import React ,{Fragment } from 'react'
import {Link} from 'react-router-dom'

const Sidebar = () => {
    return (
        <Fragment>
     
            <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components">
                    <li>
                        <a to="/dashbord"><i className="fas fa-tachometer-alt"></i> Dashboard</a>
                    </li>
            
                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fab fa-product-hunt"></i> Products</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                            <Link to="/admin/products"><i className="fas fa-clipboard-list"></i> All</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/new-product"><i className="fas fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Users</Link>
                    </li>
            
                </ul>
                </nav>
            </div>
            
        </Fragment>
    )
}

export default Sidebar
