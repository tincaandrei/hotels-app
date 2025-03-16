import DashboardNav from "../components/dashboardNav";
import ConnectNav from "../components/connectNav";
import createConnectAccount from "../actions/stripe";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { toast } from "react-toastify";

const DashboardSeller = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res); 
      console.log("dasdiasdas");
      window.location.href = (res.data);
    } catch (err) {
      console.log(err);
      toast.error("Stripe connect failed, try again.");
      setLoading(false);
    }
  };

  const connected = () => {
    return (
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
    );
  };

  const notConnected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <HomeOutlined className="h1" />
            <h4>Setup payouts to post hotel rooms</h4>
            <p className="lead">
              Mern partners with stripe to transfer earnings to your bank
              account
            </p>
            <button
              disabled={loading}
              onClick={handleClick}
              className="btn btn-primary mb-3"
            >
              {loading ? "Processing..." : " Setup payouts"}
            </button>
            <p className="text-muted">
              <small>
                You will be redirected to Stripe to complete the onboarding
                process.
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container-fluid bg-secondary p5">
        <ConnectNav />
      </div>
      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}
    </>
  );
};

export default DashboardSeller;
