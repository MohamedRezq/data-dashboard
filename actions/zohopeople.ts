import httpServices from "@/services/httpServices";
import { App_Config } from "@/app_config";
//--------------------------------------------------------------//
export const zohopeopleAuth = async (code: string | null) => {
  try {
    await httpServices.post(
      `${App_Config.API_BASE_URL}/api/zohopeople/exchange-code`,
      {
        code: code,
        organizationId: localStorage.getItem("organizationId"),
        applicationId: 3, // 1-->quickbooks , 2-->zohobooks, 3-->zohopeople, 4-->freshbooks,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.close();
    return;
  } catch (error: any | null) {
    if (error?.response?.status !== 500)
      console.log(error.response.data.message);
    return error.response.data.message;
  }
};
//--------------------------------------------------------------//
//--------------------------------------------------------------//
export const zohopeopleSyncData = async (organizationId: number) => {
  try {
    await httpServices.post(
      `${App_Config.API_BASE_URL}/api/zohopeople/validate-tokens`,
      {
        organizationId: organizationId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await httpServices.post(
      `${App_Config.API_BASE_URL}/api/zohopeople/sync-data`,
      {
        organizationId: organizationId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response)
    return response;
  } catch (error: any | null) {
    return error.response;
  }
};