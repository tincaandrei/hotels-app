import DashboardNav from "../components/dashboardNav";
import ConnectNav from "../components/connectNav";

const Dashboard = () => {
    return(
        <>
        <div className="container-fluid bg-secondary p5">
           <ConnectNav/>
        </div>
        <div className="container-fluid p-4">
            <DashboardNav/>
        </div>
        <div className="container">
            <p>Show all bookinggs and a button </p>
        </div>
        </>
    );
}

export default Dashboard;