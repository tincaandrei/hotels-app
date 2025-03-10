import DashboardNav from "../components/dashboardNav";
import ConnectNav from "../components/connectNav";

const DashboardSeller = () => {
    return(
        <>
        <div className="container-fluid bg-secondary p5">
           <ConnectNav/>

        </div>
        <div className="container-fluid p-4">
            <DashboardNav/>
        </div>
        <div className="container">
            <p>Show all hotels user have posted and a button to add new </p>
        </div>
        </>
    );
}

export default DashboardSeller;