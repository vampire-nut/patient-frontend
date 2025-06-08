export interface PatientData {
  id: string;
  firstName: string;
  middleName?: string; // Optional
  lastName: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: 'Male' | 'Female' | 'Other' | ''; // Added empty string for initial state
  phoneNumber: string;
  email: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContactName?: string; // Optional
  emergencyContactRelationship?: string; // Optional
  religion?: string; // Optional
  timestamp: string; 
}
export interface StaffMessage {
  type: 'patientUpdate' | 'patientAdded';
  payload: PatientData;
}