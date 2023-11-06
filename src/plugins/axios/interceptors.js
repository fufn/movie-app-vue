function returnData(res) {
  return res.data;
}

export default function (axios) {
  axios.interceptors.request.use();
  axios.interceptors.response.use(returnData);
}
