import yup from "../yubGlobal";
const schemaRegister = yup.object().shape({
  email: yup.string().email().required("Email bắt buộc nhập "),
  name: yup.string().required("Tên bắt buộc nhập "),
  phoneNumber: yup
    .string()
    .phoneNumber()
    .required("Số điện thoại bắt buộc nhập")
    .min(10, "Số điện thoại phải có ít nhất 10 ký tự")
    .max(10, "Số điện thoại tối đa 10 ký tự"),
  password: yup
    .string()
    .required("Password bắt buộc nhập")
    .min(6, "Password phải có ít nhất 6 ký tự")
    .max(32, "Password tối đa 32 ký tự")
    .password(),
  confirmPassword: yup
    .string()
    .required("Password bắt buộc nhập")
    .min(6, "Password phải có ít nhất 6 ký tự")
    .max(32, "Password tối đa 32 ký tự")
    .password()
    .oneOf([yup.ref("password")], "Password không trùng"),
  cityId: yup.string().required("Thành phố bắt buộc nhập "),
  dob: yup.string().required("Ngày sinh bắt buộc chọn "),
  meetingDate: yup.string().required("Bắt buộc chọn ngày gặp mặt"),
  gender: yup.string().required("Giới tính bắt buộc chọn "),
  role: yup.string().required("Vai trò bắt buộc chọn "),
});

export default schemaRegister;
