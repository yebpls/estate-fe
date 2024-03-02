import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { payment } from "../store/slices/accountSlice";

function PaymentPage() {
  const location = useLocation();
  const { id, loading } = useSelector((state) => state.accountReducer);
  const queryParams = new URLSearchParams(location.search);
  const amountString = queryParams.get("vnp_Amount");
  const amount = parseFloat(amountString) / 100;
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(typeof amount);
    dispatch(payment({ id: id, amount: amount }));
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-[10px]  w-[32%] h-[32%]  items-center flex flex-col space-y-1 ">
        {loading ? (
          <div>
            <Spin />
          </div>
        ) : (
          <>
            <div>
              <div className="py-5">
                {/* {status === "success" ? ( */}
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{ color: "#23d747", fontSize: "60px" }}
                />
                {/* ) : (
            <FontAwesomeIcon
              icon={faX}
              style={{ color: "red", fontSize: "60px" }}
            />
          )} */}
              </div>
            </div>
            <div className="font-bold pb-2 text-[20px]">
              Thanh toán thành công
              {/* {status === "success" ? "thành công" : "không thành công"}{" "} */}
            </div>
          </>
        )}

        <div className="py-4">
          <Link
            to={"/"}
            className="bg-blue-600 text-white font-bold rounded-[5px] py-2 px-6"
          >
            Trở về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
