import {API_BASE_URL} from "../config/config";
import {fetchData, sendData} from "../utils/DataAPI";

const CouponEndpoints = {
    SHOW: `${API_BASE_URL}/staff/api/coupons/all`,
    CREATE: `${API_BASE_URL}/staff/api/coupons/add`,
    UPDATE: `${API_BASE_URL}/staff/api/coupons/update/`
};

class CouponAPI {
    async getAllCoupons() {
        return fetchData(CouponEndpoints.SHOW, "Error fetching coupons.");
    }

    async createCoupon(coupon) {
        return sendData(CouponEndpoints.CREATE, coupon, "Error creating coupon", "POST");
    }
}
export default new CouponAPI();