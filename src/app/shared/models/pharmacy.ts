export interface Pharmacy {
  id: number;
  name: string;
  address: string;
  coords: string;
  storeHours: string;
  contactNumber: string;
  email: string;
  password: string;
  user: {
    id: number,
    accountNo: string,
    name: string,
    email: string,
    password: string,
    userType: string,
    accountVerified: boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}
};
