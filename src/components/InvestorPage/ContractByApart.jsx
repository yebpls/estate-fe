import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContractByApartment,
  getContractByAppointment,
} from "../../store/slices/contractSlice";
import { useParams } from "react-router-dom";
import { getApartmentById } from "../../store/slices/apartmentSlice";

export default function ContractByApart() {
  const { apartmentId } = useParams();
  const { apartmentDetail } = useSelector((state) => state.apartmentReducer);
  const { contractForInvestor } = useSelector((state) => state.contractReducer);
  const { buildings } = useSelector((state) => state.buildingReducer);
  const building = buildings?.find(
    (building) => building.id === apartmentDetail?.buildingId
  );
  const price = apartmentDetail?.price.toLocaleString("de-DE");
  const textPrice = apartmentDetail?.price / 1000000000;
  const signDate = contractForInvestor?.signDate
    ? new Date(contractForInvestor.signDate)
        .toISOString()
        .split("T")[0]
        .split("-")
    : [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApartmentById(apartmentId));
    dispatch(getContractByApartment(apartmentId));
    console.log("contract:", contractForInvestor);
    console.log(building, apartmentDetail);
  }, []);
  return (
    <div className="w-full">
      <div className=" mt-5 text-xl font-semibold text-red-600 ml-5">
        Hợp đồng
      </div>
      <p className="text-center text-lg font-semibold text-slate-700">
        Cộng hòa-Xã hội-Chủ Nghĩa Việt Nam
      </p>
      <p className="text-center text-md font-medium text-slate-700 underline">
        Độc lập-Tự do-Hạnh phúc
      </p>
      <p className="text-center my-1 mt-5 text-lg font-semibold">
        Hợp đồng mua bán nhà
      </p>

      <div
        className="pl-4 mt-3 text-base overflow-y-auto pr-4"
        style={{ height: "400px" }}
      >
        <p className="p-1 font-semibold">Đại diện bên bán(Đại lý)</p>
        <p className="p-1">
          Đại diện bên bán(Đại lý): {contractForInvestor?.agencyName} <br />
          Là người đại diện bán căn hộ số {
            apartmentDetail?.apartmentNumber
          } tòa {building?.buildingName} của dự án{" "}
          {apartmentDetail?.projectName} được bàn giao bởi công ty "nhà đẹp"{" "}
          <br />
          Sau đây gọi là bên A
        </p>
        <p className="p-1 font-semibold">Đại diện bên mua nhà(Khách)</p>
        <p className="p-1">
          Ông/bà: {contractForInvestor?.customerName} <br />
          Sau đây gọi là bên B
        </p>
        <p className="p-1 text-slate-500">
          Sau khi trao đổi, thỏa thuận, hai bên cùng nhau ký kết hợp đồng mua
          bán nhà này với nội dung như sau:
        </p>
        <p className="p-1 font-semibold">
          Điều 1: NỘI DUNG HỢP ĐỒNG ( ĐỐI TƯỢNG MUA BÁN)
        </p>
        <p>
          1.1. Bên A đồng ý bán cho bên B căn chung cư số{" "}
          {apartmentDetail?.apartmentNumber} tòa {building?.buildingName} thuộc
          dự án {apartmentDetail?.projectName} tại {apartmentDetail?.address}{" "}
          <br />
          1.2. Đặc điểm căn nhà mua bán :<br />
          - Cấp nhà ở: Căn hộ chung cư.
          <br />- Tổng diện tích sàn nhà ở {apartmentDetail?.area}m2.
          <br />
          - Trang thiết bị chủ yếu gắn liền với nhà ở.
          <br />
          - Giấy tờ về nhà ở kèm theo gồm:
          <br />
          * Giấy chứng nhận quyền sở hữu nhà và QSD đất do UBND cung cấp
          <br />
          1.3. Thời điểm giao giấy tờ sở hữu nhà : ngay sau khi hai bên ký hợp
          đồng công chứng và bên B thanh toán tiền mua nhà đợt 1.
          <br />
          1.4. Thời điểm giao nhà : ngày {signDate[2]}/{signDate[1]}/
          {signDate[0]} Khi giao nhà, hai bên sẽ lập “Biên bản bàn giao nhà“.
          <br />
          1.5. Trong vòng 10 ngày sau khi ký hợp đồng này, hai bên sẽ ra Phòng
          công chứng để công chứng hợp đồng theo thủ tục do pháp luật qui định.
          Mọi nội dung đã thỏa thuận trong hợp đồng này sẽ giữ nguyên như trong
          hợp đồng có công chứng. Bản hợp đồng có công chứng sẽ được xem là bản
          chính thức và thay thế hợp đồng này.
        </p>
        <p className="p-1 font-semibold">Điều 2: GIÁ BÁN NHÀ & THUẾ</p>
        <p>
          2.1. Giá bán nhà: {price}đ ({textPrice} tỷ đồng), đã bao gồm các loại
          thuế, lệ phí. <br />
          2.2. Thuế : Bên A có nghĩa vụ đóng các khoản thuế liên quan đến việc
          mua bán nhà theo qui định của pháp luật.
        </p>
        <p className="p-1 font-semibold">Điều 3: QUYỀN VÀ NGHĨA VỤ CỦA BÊN A</p>
        <p>
          3.1. Hỗ trợ, phối hợp và tạo điều kiện thuận lợi để hai bên cùng tiến
          hành các thủ tục hành chính pháp lý cần thiết khi thực hiện việc
          chuyển giao quyền sở hữu nhà theo qui định của pháp luật. <br />
          3.2. Bàn giao nhà và các tiện ích khác (thiết bị) cho Bên B đúng thời
          hạn. Cung cấp cho bên B tất cả các chi tiết liên quan đến nhà bán (hồ
          sơ công trình phụ, hệ thống điện, nước, phòng cháy chữa cháy, camera
          quan sát…) <br />
          3.3. Bảo quản căn nhà đã bán trong thời gian chưa bàn giao nhà cho bên
          mua. <br />
          3.4. Cam kết căn nhà thuộc quyền sở hữu hợp pháp của mình, không bị
          tranh chấp và không bị ràng buộc bởi nghĩa vụ pháp lý với bất kỳ bên
          thư ba nào khác tại thời điểm mua bán. <br />
          3.5. Có quyền không giao nhà nếu bên B không thực hiện nghĩa vụ thanh
          toán đúng thời hạn đã thỏa thuận. <br />
          3.6. Yêu cầu bên B thanh toán tiền mua nhà đúng theo thời gian đã thỏa
          thuận. <br />
          3.7. Các quyền và nghĩa vụ khác của bên bán nhà ( ngoài những điều nêu
          trên) theo qui định tại Bộ luật dân sự và Luật nhà ở. <br />
        </p>

        <p className="p-1 font-semibold">Điều 4: QUYỀN VÀ NGHĨA VỤ CỦA BÊN B</p>
        <p>
          4.1. Nhận giấy tờ sở hữu nhà và nhận bàn giao nhà đúng hạn và phù hợp
          với tình trạng được nêu tại hợp đồng mua bán nhà. <br />
          4.2. Yêu cầu bên bán hỗ trợ, tạo điều kiện thuận lợi trong việc hoàn
          tất thủ tục chuyển giao quyền sở hữu nhà theo qui định của pháp luật.{" "}
          <br />
          4.3. Trả tiền mua nhà theo đúng thỏa thuận. Nếu chậm thanh toán thì
          phải chịu trả thêm tiền lãi như đã thỏa thuận. <br />
          4.4. Các quyền và nghĩa vụ khác của bên mua nhà (ngoài những điều nêu
          trên) theo qui định tại Bộ luật dân sự và luật Nhà ở.
        </p>
        <p className="p-1 font-semibold">Điều 5 : CÁC THỎA THUẬN KHÁC</p>
        <p>
          Hai bên cùng cam kết : <br />
          - Đã kê khai đúng sự thật và chịu trách nhiệm về tính chính xác của
          những thông tin đã ghi trong hợp đồng này.
          <br />
          - Kể từ ngày ký hợp đồng này, không bên nào được sử dụng bản chính
          giấy tờ nhà để thực hiện việc thế chấp, bảo lãnh, mua bán, tặng cho,
          trao đổi, kê khai làm vốn doanh nghiệp hoặc các giao dịch khác dưới
          bất kỳ hình thức nào cho đến khi hoàn tất thủ tục chuyển giao quyền sở
          hữu.
          <br />
          - Nếu bên A bàn giao nhà chậm thì phải chịu phạt : 1 triệu đồng/ngày –
          cho mỗi ngày chậm giao.
          <br />
          - Hai bên thống nhất mọi sự liên lạc liên quan đến quá trình thực hiện
          hợp đồng này đều được thực hiện qua email hoặc bằng văn bản có chữ ký
          của người đại diện của hai bên. Mọi hình thức thông tin liên lạc khác
          đều không có giá trị - trong trường hợp có tranh chấp.
          <br />
        </p>

        <p className="p-1 font-semibold">Điều 6: ĐIỀU KHOẢN CHUNG</p>
        <p>
          Hai bên cam kết thực hiện nghiêm túc các điều khoản trong hợp đồng
          này. Những tranh chấp phát sinh liên quan đến hợp đồng này đều sẽ được
          giải quyết dựa trên sự hợp tác, cùng có lợi.
          <br />
          Nếu không tự giải quyết được, hai bên đồng ý sẽ đưa ra giải quyết tại
          Tòa án có thẩm quyền. Bên thua kiện phải chịu toàn bộ các chi phí liên
          quan, kể cả chi phí thuê luật sư, cho bên thắng kiện.
          <br />
          Hợp đồng này có hiệu lực kể từ ngày ký và được công chứng, được lập
          thành 05 (năm) bản, có giá trị như nhau, mỗi bên giữ 02 (hai) bản và
          lưu một (01) bản tại Phòng Công chứng.
          <br />
        </p>
      </div>
    </div>
  );
}
