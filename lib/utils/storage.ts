import { storage } from '@/lib/config/firebase-admin';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Upload image to Firebase Storage
export async function uploadImage(
  file: File,
  path: string
): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// Delete image from Firebase Storage
export async function deleteImage(fileUrl: string): Promise<void> {
  try {
    // Extract path from URL
    const path = decodeURIComponent(fileUrl.split('/o/')[1].split('?')[0]);
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

// Generate unique filename
export function generateFilename(userId: string, originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  return `projects/${userId}/${timestamp}-${random}.${extension}`;
}
