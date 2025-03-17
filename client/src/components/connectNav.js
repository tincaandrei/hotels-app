import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Badge } from "antd";
import { getAccountBalance, payoutSetting } from "../actions/stripe";
import moment from "moment";
import { currencyFormatter } from "../actions/stripe";
import {SettingOutlined} from '@ant-design/icons'
import {toast} from 'react-toastify'
const { Meta } = Card;

const { Ribbon } = Badge;

const ConnectNav = () => {
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      // console.log(res)
      setBalance(res.data);
    });
  }, []);

  const handlePayoutSettings = async ()=>{
    setLoading(true)
    try{
      const res = await payoutSetting(auth.token)
      // console.log('RES FOR SETTIGNS PAYOUT',res.data.url)
      window.location.href = res.data.url
      setLoading(false);
    }catch(err){
      console.log(err)
      setLoading(false)
      toast("Unable to acces settings. Try again!")
    }
  }
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
        auth.user.stripe_seller.charges_enabled && (
          <>
            <Ribbon text="Available" color="gray">
              <Card className="bg-light pt-1">
                {/* we need to loop trouhg the pending array and show just the amount and currencu */}
                {balance &&
                  balance.pending &&
                  balance.pending.map((bp, i) => (
                    <span key={i} className="lead">
                      {currencyFormatter(bp)}
                    </span>
                  ))}
              </Card>
            </Ribbon>

            <Ribbon text="Payouts" color="silver">
              <Card
                onClick={handlePayoutSettings}
                className="bg-light pointer"
              >
                <SettingOutlined className="h5 pt-2">

                </SettingOutlined>
              </Card>
            </Ribbon>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
