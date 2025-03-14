import { useSelector } from "react-redux";
import { Card } from "antd";
import moment from 'moment'

const { Meta } = Card;

const ConnectNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={user.name[0]}
          title={user.name}
          description={`Joined ${moment(user.createdAt).fromNow()}`}  
        />
      </Card>
      {auth &&
        auth.user &&
        auth.user.stripe_seller && 
        auth.user.stripe_seller.charges_enabled &&(
         <>
        <div>
          Pending balance
        </div>

        <div>
          Payout settings
        </div>
      </>)}
    </div>
  );
};


export default ConnectNav;