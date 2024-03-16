import yup from "../yubGlobal";
const schemaUpdateAccount = yup.object().shape({
  name: yup.string().required("Tên bắt buộc nhập "),
  avatarUrl: yup.string().required("Bắt buộc phải có ảnh "),
  phoneNumber: yup
    .string()
    .required("Số điện thoại bắt buộc nhập")
    .min(10, "Số điện thoại phải có ít nhất 10 ký tự")
    .max(10, "Số điện thoại tối đa 10 ký tự"),
  cityId: yup.string().required("Thành phố bắt buộc nhập "),
  dob: yup.string().required("Ngày sinh bắt buộc chọn "),

  gender: yup.string().required("Giới tính bắt buộc chọn "),
});

export default schemaUpdateAccount;
