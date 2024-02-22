import axiosClient from "./axiosClient";

const accountApi = {
  login(params) {
    const url = "/login";
    return axiosClient.post(url, params);
  },
  test() {
    const url = "/test";
    return axiosClient.get(url);
  },
  getAccountDetail(id) {
    const url = `/api/account/${id}`;
    return axiosClient.get(url);
  },
  getInvestorId(id) {
    const url = `/api/investor/${id}`;
    return axiosClient.get(url);
  },
  getAgencyId(id) {
    const url = `/api/agency/${id}`;
    return axiosClient.get(url);
  },
  // loginWithGoogle(params) {
  //   const url = "/Authorization/google-login";
  //   return axiosClient.post(url, params);
  // },

  // registerUser(params) {
  //   const url = "/Authorization/register-user";
  //   return axiosClient.post(url, params);
  // },

  // registerInstructor(params) {
  //   const url = "/Authorization/register-instructor";
  //   return axiosClient.post(url, params);
  // },
  // changePassword(params) {
  //   const url = "/Authorization/change-password";
  //   return axiosClient.post(url, params);
  // },
};

export default accountApi;
