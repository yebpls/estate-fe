import { Image, Modal } from "antd";
import React, { useEffect, useState } from "react";

export default function ApartmentImg({ apartment }) {
  // const [productImages, setProductImages] = useState([
  //   "https://mylisting365.co.uk/blog/wp-content/uploads/2014/09/realestateagentuk.jpg",
  //   "https://blog.hdestates.com/wp-content/uploads/2020/04/HD-Real-Estate-Photography-scaled.jpg",
  //   "https://mylisting365.co.uk/blog/wp-content/uploads/2014/09/realestateagentuk.jpg",
  //   "https://blog.hdestates.com/wp-content/uploads/2020/04/HD-Real-Estate-Photography-scaled.jpg",
  // ]);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  useEffect(() => {
    setSelectedImageUrl(apartment?.mainImage || "");
  }, [apartment?.mainImage]);

  return (
    <div>
      <div className=" pt-6">
        <p className="text-base text-slate-500 p-1">
          Căn hộ chung cư phòng {apartment?.apartmentNumber} tại tòa{" "}
          {apartment?.buildingName} thuộc dự án {apartment?.projectName}
        </p>
        <div className="p-2">
          <Image
            width="100%"
            height="50vh"
            className="object-cover rounded-sm"
            src={selectedImageUrl}
          />
          <p className="text-sm text-slate-500 p-1">
            Địa chỉ: {apartment?.address}
          </p>
        </div>
        {/* <div className="flex">
          {productImages &&
            productImages.map((item, index) => (
              <Image
                key={index}
                width="100%"
                height="100%"
                className="object-cover max-w-[150px] hover:brightness-110 hover:scale-110 duration-100 active:scale-105 active:brightness-100 mx-auto"
                src={item}
                preview={false}
                onClick={() => setSelectedImageUrl(item)}
                // alt={product.productName}
              />
            ))}
        </div> */}
      </div>
    </div>
  );
}
