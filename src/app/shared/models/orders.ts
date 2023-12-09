export interface Order{
  id: number,
  type: 'orders' | 'customer' | 'admin',
  cartContent: [],
  totalAmount: number,
  isReservation: boolean,
  userId: number,
  pharmacyId: number,
  medicineRatingId: number,
  createdAt: Date,
  updatedAt: Date,
  name: String,
  user: {
    id: number;
    accountNo: string;
    name: string;
    email: string;
    password: string;
    userType: 'customer' | 'admin'; // Adjust as needed
    accountVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
  pharmacyRating: number | null; // Assuming it can be null
}
