type MockCoupon = {
  discountValue: number;
  discountType: "PERCENTAGE" | "FIXED";
  isActive: boolean;
  expiryDate: Date;
  minOrderValue: number;
};

export async function validateCoupon(code: string, orderValue: number) {
  // Mock coupon logic
  const mockCoupons: Record<string, MockCoupon> = {
    "WELCOME10": { discountValue: 10, discountType: "PERCENTAGE", isActive: true, expiryDate: new Date("2030-01-01"), minOrderValue: 0 },
    "SAVE20": { discountValue: 20, discountType: "PERCENTAGE", isActive: true, expiryDate: new Date("2030-01-01"), minOrderValue: 50 },
  };

  const coupon = mockCoupons[code.toUpperCase()];

  if (!coupon) {
    throw new Error("Invalid coupon code");
  }

  let discountAmount = 0;
  if (coupon.discountType === "PERCENTAGE") {
    discountAmount = (orderValue * Number(coupon.discountValue)) / 100;
  } else {
    discountAmount = Number(coupon.discountValue);
  }

  return {
    id: "mock-coupon-id",
    discountAmount,
    newTotal: orderValue - discountAmount,
  };
}