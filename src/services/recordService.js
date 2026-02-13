import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

const COLLECTION_NAME = 'wellness_records';

export const recordService = {
  // Add new wellness record
  addRecord: async (userId, formData, photoDataUrl) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        userId,
        ...formData,
        photoDataUrl: photoDataUrl || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding record:', error);
      throw error;
    }
  },

  // Get all records for a user
  getUserRecords: async (userId) => {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('userId', '==', userId)
      );
      const snapshot = await getDocs(q);
      const records = [];
      snapshot.forEach((doc) => {
        records.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return records;
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
    }
  },

  // Get single record
  getRecord: async (recordId) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, recordId);
      const snapshot = await getDocs(query(collection(db, COLLECTION_NAME), where('__name__', '==', recordId)));
      if (snapshot.empty) return null;
      const data = snapshot.docs[0].data();
      return {
        id: recordId,
        ...data,
      };
    } catch (error) {
      console.error('Error fetching record:', error);
      throw error;
    }
  },

  // Update record
  updateRecord: async (recordId, updates) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, recordId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating record:', error);
      throw error;
    }
  },

  // Delete record
  deleteRecord: async (recordId) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, recordId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting record:', error);
      throw error;
    }
  },

  // Search records
  searchRecords: async (userId, searchTerm) => {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('userId', '==', userId)
      );
      const snapshot = await getDocs(q);
      const results = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (
          data.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.email?.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results.push({
            id: doc.id,
            ...data,
          });
        }
      });
      return results;
    } catch (error) {
      console.error('Error searching records:', error);
      throw error;
    }
  },
};
