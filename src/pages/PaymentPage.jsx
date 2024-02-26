import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function PaymentPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-[10px]  w-[32%] h-[32%]  items-center flex flex-col space-y-1 ">
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
        <div className="font-bold pb-2 text-[20px]">
          Thanh toán thành công
          {/* {status === "success" ? "thành công" : "không thành công"}{" "} */}
        </div>
        <div className="flex ">
          <div className="">Mã số đơn hàng của bạn là</div>
          <div className="text-green-500 font-bold pl-1">{/* {id} */}</div>
        </div>
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
