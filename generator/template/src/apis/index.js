import request from "@/utils/request";
export const getArea = data => request.post("/data/prescription/getArea", data);
