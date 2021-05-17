import * as fbAdmin from 'firebase-admin';

export const removeDoctorBookingInfo = async (doctorId: string) => {
  const removals: Promise<any>[] = [];
  await fbAdmin
    .database()
    .ref('/doctor-booking-info')
    .orderByChild('doctorId')
    .equalTo(doctorId)
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((child) =>{
        removals.push(child.ref.remove())
      });
    });

  await Promise.all(removals);
};
