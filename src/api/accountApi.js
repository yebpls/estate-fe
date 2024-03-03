import axiosClient from "./axiosClient";

const accountApi = {
  login(params) {
    const url = "/login";
    return axiosClient.post(url, params);
  },
  register(params) {
    const url = "/api/account/register";
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
  getAgencyByApartment(id) {
    const url = `/api/agency/apartment/${id}`;
    return axiosClient.get(url);
  },
  getAllAccount() {
    const url = `/api/account`;
    return axiosClient.get(url);
  },
  changeAccoutStatus(id) {
    const url = `/api/account/${id}/status`;
    return axiosClient.put(url);
  },

  createPayment(amount) {
    const url = `/api/payment/create_payment/${amount}`;
    return axiosClient.post(url);
  },

  payment(accId, amount) {
    const url = `/api/payment/set-payment/${accId}/${amount}`;
    return axiosClient.post(url);
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
