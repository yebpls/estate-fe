
export default function ApartmentOverView({ apartment }) {

  return (
    <div>
      <p className="text-xl font-semibold text-center -mt-5 text-red-500">
        Đăng ký mua trực tiếp căn hộ thuộc dự án {apartment?.projectName} tại{" "}
        {apartment?.cityName}
      </p>
    </div>
  );
}
