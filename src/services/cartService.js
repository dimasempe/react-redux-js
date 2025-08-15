import { globalStore } from "@/store/store";
import { axiosBaseURL } from "@/lib/axios";

export const fetchCart = async (userId) => {
  try {
    const cartResponse = await axiosBaseURL.get("/carts", {
      params: {
        userId,
        _embed: "product",
      },
    });
    // console.log(cartResponse.data);
    globalStore.dispatch({
      type: "cart/get",
      payload: cartResponse.data,
    });
  } catch (error) {
    console.log(error);
  }
};
