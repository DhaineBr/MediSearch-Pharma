export interface orders{
  id: number,
  type: 'orders' | 'customer' | 'admin',
  cartContent: [],
  totalAmount: number,
  isReservation: boolean,
  userId: number,
  pharmacyId: number,
  medicineRatingId: number,
  createdAt: Date,
  updatedAt: Date
}
