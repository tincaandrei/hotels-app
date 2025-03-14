import DashboardNav from "../components/dashboardNav";
import ConnectNav from "../components/connectNav";
import { Link } from "react-router-dom";


const DashboardSeller = () => {

    const connected = () =>{
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <h2>Your hotels</h2>
                </div>
                <div className="col-md-2">
                    <Link to="/hotels/new" className="btn btn-primary">
                        + Add New
                    </Link>
                </div>

            </div>
        </div>
    }

    const notConnected = () =>{
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-10">
                <h2>Connect with stripe</h2>
            </div>
           

        </div>
    </div>
    }


    return(
        <>
        <div className="container-fluid bg-secondary p5">
           <ConnectNav/>

        </div>
        <div className="container-fluid p-4">
            <DashboardNav/>
        </div>
        {notConnected()}
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <h2>Your hotels</h2>
                </div>
                <div className="col-md-2">
                    <Link to="/hotels/new" className="btn btn-primary">
                        + Add New
                    </Link>
                </div>

            </div>
        </div>
        </>
       
        
    );
}

export default DashboardSeller;