import { User } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, Timestamp, Query } from 'firebase/firestore';
import { db } from '@/lib/config/firebase-admin';
import { Project } from '@/lib/hooks/useProjects';

// Get all projects for a user
export async function getUserProjects(userId: string): Promise<Project[]> {
  try {
    const q = query(
      collection(db, 'projects'),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

// Get single project
export async function getProject(projectId: string): Promise<Project | null> {
  try {
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        id: docSnap.id,
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      } as Project;
    }
    return null;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
}

// Create new project
export async function createProject(
  userId: string,
  projectData: Omit<Project, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      userId,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

// Update project
export async function updateProjectData(
  projectId: string,
  updateData: Partial<Project>
): Promise<void> {
  try {
    const docRef = doc(db, 'projects', projectId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

// Delete project
export async function deleteProjectData(projectId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'projects', projectId));
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}

// Get featured projects
export async function getFeaturedProjects(limit: number = 6): Promise<Project[]> {
  try {
    const q = query(
      collection(db, 'projects'),
      where('featured', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs
      .slice(0, limit)
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Project[];
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    throw error;
  }
}

// Search projects by title or tech stack
export async function searchProjects(
  userId: string,
  searchTerm: string,
  techStack?: string[]
): Promise<Project[]> {
  try {
    const projects = await getUserProjects(userId);
    
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTech =
        !techStack || techStack.length === 0 ||
        techStack.some((tech) =>
          project.techStack.some((t) =>
            t.toLowerCase().includes(tech.toLowerCase())
          )
        );
      
      return matchesSearch && matchesTech;
    });
  } catch (error) {
    console.error('Error searching projects:', error);
    throw error;
  }
}
