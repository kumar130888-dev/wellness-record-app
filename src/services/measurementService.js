import { db } from '../firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';

const MEASUREMENTS_COLLECTION = 'weekly_measurements';

export const measurementService = {
  // Add a new measurement
  async addMeasurement(userId, measurementData) {
    try {
      const docRef = await addDoc(collection(db, MEASUREMENTS_COLLECTION), {
        userId,
        date: measurementData.date,
        weight: parseFloat(measurementData.weight),
        bodyAge: parseInt(measurementData.bodyAge),
        bodyFat: parseFloat(measurementData.bodyFat),
        vf: parseFloat(measurementData.vf), // Visceral Fat
        notes: measurementData.notes || '',
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding measurement:', error);
      throw error;
    }
  },

  // Get all measurements for a user (sorted by date, newest first)
  async getUserMeasurements(userId) {
    try {
      const q = query(
        collection(db, MEASUREMENTS_COLLECTION),
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const measurements = [];
      querySnapshot.forEach((doc) => {
        measurements.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return measurements;
    } catch (error) {
      console.error('Error fetching measurements:', error);
      throw error;
    }
  },

  // Delete a measurement
  async deleteMeasurement(measurementId) {
    try {
      await deleteDoc(doc(db, MEASUREMENTS_COLLECTION, measurementId));
    } catch (error) {
      console.error('Error deleting measurement:', error);
      throw error;
    }
  },

  // Get latest measurement
  async getLatestMeasurement(userId) {
    try {
      const q = query(
        collection(db, MEASUREMENTS_COLLECTION),
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return null;
      }
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
      };
    } catch (error) {
      console.error('Error fetching latest measurement:', error);
      return null;
    }
  },
};
