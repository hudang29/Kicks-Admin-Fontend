class DiscountModel {
    constructor (id, discountRate, startDate, endDate) {
        this.id = id;
        this.discountRate = discountRate;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    static fromJson(json) {
        return new DiscountModel(
            json.id,
            json.discountRate,
            json.startDate,
            json.endDate,
        );
    }
}
export default DiscountModel;