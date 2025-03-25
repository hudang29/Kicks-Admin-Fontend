import {useEffect, useState} from "react";
import CouponAPI from "../api/CouponAPI";
import {stopLoadingWithDelay} from "../utils/Util";

function CouponVM() {

    const [loading, setLoading] = useState(true);
    const [coupon, setCoupon] = useState({
        name: "",
        description: "",
        discountRate: 0,
        startDate: "",
        endDate: "",
        usageLimit: "",
    });
    const [allCoupon, setAllCoupon] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await CouponAPI.getAllCoupons();
                setAllCoupon(data);
            } catch (error) {
                console.error("Error fetching all coupon", error);
                setAllCoupon([]);
            } finally {
                stopLoadingWithDelay(setLoading);
            }
        }
        fetchData();
    }, [])

    const handleCreate = async () => {
      const Confirm = window.confirm("Are you sure?");
      if (!Confirm) return;
      try {
          const response = await CouponAPI.createCoupon(coupon);
          setAllCoupon( prevState => ([...prevState, response]) );
          alert("Successfully created coupon!");
      } catch (error) {
          console.error("Error creating Coupon", error);
          alert(error.message);
      }
    }


    return {allCoupon, loading, coupon, setCoupon,
        handleCreate};
}

export default CouponVM;