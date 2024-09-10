export interface RentalAdd {
    carId: number; // Yeni eklenen alan
    customerId: number; // Yeni eklenen alan
    rentDate: Date;
    returnDate: Date | null;
}
