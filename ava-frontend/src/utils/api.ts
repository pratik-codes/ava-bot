import axios from "axios";

export const SendMsgApiCall = async (msg: string) => {
  try {
    const response = await axios.post(
      "https://ava-bot-cs5t.onrender.com/chat",
      {
        message: msg,
      },
    );
    return response.data.response;
  } catch (error) {
    return error;
  }
};
