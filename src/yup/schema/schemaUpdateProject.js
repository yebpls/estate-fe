import yup from "../yubGlobal";

const schemaUpdateProject = yup.object().shape({
  projectName: yup.string().required("Bắt buộc phải có tên dự án"),
  image: yup.string().required("Bắt buộc phải có hình ảnh"),
  startDate: yup.string().required("Ngày bắt đầu không được bỏ trống"),

  endDate: yup.string().required("Ngày kết thúc không được bỏ trống"),
});

export default schemaUpdateProject;
