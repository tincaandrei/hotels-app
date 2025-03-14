import DashboardNav from "../components/dashboardNav";
import ConnectNav from "../components/connectNav";
import {Link} from 'react-router-dom'
const Dashboard = () => {
    return(
        <>
        <div className="container-fluid bg-secondary p5">
           <ConnectNav/>
        </div>
        <div className="container-fluid p-4">
            <DashboardNav/>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <h2>Your bookings</h2>
                </div>
                <div className="col-md-2">
                    <Link to="/" className="btn btn-primary">
                        Browse Hotels
                    </Link>
                </div>

            </div>
        </div>
        </>
    );
}

export default Dashboard;