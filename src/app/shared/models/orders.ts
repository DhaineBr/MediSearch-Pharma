  export interface Order{
    id: number,
    type: 'orders' | 'customer' | 'admin',
    cartContent: {
      medicineId: number,
      snapshotPrice: number
    }[],
    totalAmount: number,
    isReservation: boolean,
    userId: number,
    pharmacyId: number,
    medicineRatingId: number,
    isFulfilled: boolean,
    createdAt: Date,
    updatedAt: Date,
    name: String,
    user: {
      id: number;
      accountNo: string;
      name: string;
      email: string;
      password: string;
      userType: 'customer' | 'admin';
      accountVerified: boolean;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    };
    pharmacyRating: number | null,
    orderMedicines: {
          id: number;
          itemNumber: String;
          name: String;
          nameSlug: String;
          category: String;
          price: number;
          quantity: number;
          pharmacyId: number;
          expirationDate: Date;
          reservationDate: null;
          createdAt: Date;
          updatedAt: Date;
          deletedAt: Date;
          medicineId: number;
          snapshotPrice: number;
      }[],

  }
