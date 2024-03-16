import yup from "../yubGlobal";
const schemaMeetingDate = yup.object().shape({
  meetingDate: yup.string().required("Bắt buộc chọn ngày gặp mặt "),
});

export default schemaMeetingDate;
