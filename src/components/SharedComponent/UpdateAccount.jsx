import { Button, DatePicker, Modal, Popconfirm, Select } from "antd";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import schemaRegister from "../../yup/schema/schemaRegister";
import { yupResolver } from "@hookform/resolvers/yup";

export default function UpdateAccount({ account }) {
  const [open, setOpen] = useState(false);
  const { city } = useSelector((state) => state.buildingReducer);

  const disabledDate = (current) => {
    return current && current > dayjs().subtract(18, "year");
  };
  const cityOptions = city?.map((city) => ({
    value: city.id,
    label: city.cityName,
  }));

  const genderOptions = [
    {
      value: "1",
      label: "Nam",
    },
    {
      value: "2",
      label: "Nữ",
    },
    {
      value: "3",
      label: "Khác",
    },
  ];

  const updateForm = useForm({
    // resolver: yupResolver(schemaRegister),
    defaultValues: {
      id: account ? account.id : "",
      name: account ? account.name : "",
      avatarUrl: account ? account.avatarUrl : "",
      gender: account ? account.gender : "",
      dob: account ? account.dob : "",
      cityId: account ? account.cityId : "",
    },
  });

  const {
    register: registerChangeProfile,
    handleSubmit: submitChangeProfile,
    control,
    reset,
    formState: { errors },
  } = updateForm;

  // useEffect(() => {
  // setValue(
  //   "cityname",
  //   city?.find((city) => city.id === account.cityId)
  // );
  // }, [account.cityId, city, setValue]);

  const EditProfile = () => {
    setOpen(true);
  };

  const cancelChangeProfile = () => {
    reset();
    setOpen(false);
  };

  const changeProfile = (data) => {
    const { id, ...params } = data;
    console.log("Form data:", data.id, params);
    setOpen(false);
  };

  useEffect(() => {
    // When projectDetail is available (i.e., fetched), update form default values
    if (account) {
      updateForm.reset({
        id: account.id,
        name: account.name,
        avatarUrl: account.avatarUrl,
        gender: account.gender,
        dob: account.dob,
        cityId: account.cityId,
        // Set other fields as necessary
      });
      console.log(account);
    }
  }, [account, updateForm.reset]);
  return (
    <div>
      <Button
        style={{ marginTop: "5%", backgroundColor: "#1ac5ff" }}
        type="primary"
        onClick={EditProfile}
      >
        Sửa thông tin cá nhân
      </Button>
      <Modal
        className="mt-32"
        visible={open}
        title="Chỉnh sửa thông tin cá nhân"
        onCancel={cancelChangeProfile}
        footer={null}
        okText="Lưu"
        cancelText="Hủy"
        confirmLoading={updateForm.formState.isSubmitting}
      >
        <form onSubmit={submitChangeProfile(changeProfile)}>
          <div className="m-2">Tên người dùng</div>
          <input
            className="px-2 py-1"
            placeholder="Tên người dùng"
            {...registerChangeProfile("name", { required: true })}
          />
          <div className="m-2">Avatar URL</div>
          <input
            className="px-2 py-1 w-full"
            placeholder="URL ảnh đại diện"
            {...registerChangeProfile("avatarUrl", { required: true })}
          />
          <div className="mb-2">
            <p className="mb-2">Giới Tính</p>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ width: 150 }}
                  onChange={(value) => field.onChange(value)}
                  options={genderOptions}
                />
              )}
            />
          </div>
          <div className="mb-2">
            <p className="mb-2">Tỉnh/Thành</p>
            <Controller
              name="cityId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ width: 150 }}
                  onChange={(value) => field.onChange(value)}
                  options={cityOptions}
                />
              )}
            />
          </div>

          <div className="mb-2">
            <div className="w-1/2">
              <div className="text-left text-sm  text-red-500">
                {/* {errors.dob?.message} */}
              </div>
              <p className="mb-2">Ngày sinh</p>

              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    style={{ width: 300 }}
                    disabledDate={disabledDate}
                    placeholder="Chọn sinh nhật"
                    onChange={(date, dateString) => field.onChange(dateString)}
                    value={
                      field.value ? dayjs(field.value) : dayjs("1970-01-01")
                    }
                  />
                )}
              />
            </div>
          </div>
          <Popconfirm
            title="Bạn có chắc là muốn thay đổi profile của mình chứ??"
            onConfirm={submitChangeProfile(changeProfile)}
            onCancel={cancelChangeProfile}
            okText="Có"
            cancelText="Không"
            okButtonProps={{
              style: { backgroundColor: "#1ac5ff " },
            }}
            cancelButtonProps={{
              style: {
                color: "#1ac5ff ",
              },
            }}
          >
            <div className="flex justify-end w-full">
              <Button
                type="submit"
                className="px-2 py-1 ml-2 mt-1 tracking-wide bg-white text-sky-400 hover:bg-sky-400 border-slate-300 hover:text-white"
              >
                Thay đổi profile
              </Button>
            </div>
          </Popconfirm>
        </form>
      </Modal>
    </div>
  );
}
