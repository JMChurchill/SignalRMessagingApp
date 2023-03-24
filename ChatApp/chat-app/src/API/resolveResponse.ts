type ResolvedRequest = {
  data: any;
  error: null | CustomErrorType;
};
type CustomErrorType = {
  message: null | string;
  status: null | string;
  code: null | string;
};
const resolveResponse = async (promise: Promise<any>) => {
  const resolved: ResolvedRequest = {
    data: null,
    error: null,
  };
  try {
    resolved.data = await promise;
  } catch (error: any) {
    const customError = {
      message: null,
      status: null,
      code: null,
    };
    if (error?.response?.data) {
      if (error.response.data.title) {
        customError.message = error.response.data.title;
      } else if (error.response.data.detail) {
        customError.message = error.response.data.detail;
      } else {
        customError.message = error?.response?.data;
      }
    } else {
      customError.message = error?.message;
    }
    if (error?.response?.status) {
      customError.status = error?.response?.status;
    }
    customError.code = error?.code;

    resolved.error = customError;
  }
  return resolved;
};

export default resolveResponse;
