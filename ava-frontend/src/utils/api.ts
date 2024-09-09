import axios from "axios";

export const SendMsgApiCall = async (msg: string) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/chat", {
      message: msg,
    });
    console.log({ response });
    return response.data.response;
  } catch (error) {
    console.error({ error });
    return error;
  }
};
