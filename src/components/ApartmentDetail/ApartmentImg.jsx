import { Image, Modal } from "antd";
import React, { useState } from "react";

export default function ApartmentImg() {
  const [productImages, setProductImages] = useState([
    "https://mylisting365.co.uk/blog/wp-content/uploads/2014/09/realestateagentuk.jpg",
    "https://blog.hdestates.com/wp-content/uploads/2020/04/HD-Real-Estate-Photography-scaled.jpg",
    "https://mylisting365.co.uk/blog/wp-content/uploads/2014/09/realestateagentuk.jpg",
    "https://blog.hdestates.com/wp-content/uploads/2020/04/HD-Real-Estate-Photography-scaled.jpg",
  ]);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(
    "https://blog.hdestates.com/wp-content/uploads/2020/04/HD-Real-Estate-Photography-scaled.jpg"
  );

  return (
    <div>
      <div className="w-1/2">
        <div className="p-2">
          <Image
            width="100%"
            height="50vh"
            className="object-cover"
            src={selectedImageUrl}
          />
        </div>
        <div className="flex">
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
        </div>
      </div>
    </div>
  );
}