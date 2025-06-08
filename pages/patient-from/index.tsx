import { useState, FormEvent } from "react";
import Head from "next/head";
import { PatientData } from "@/shared/types";
import socket from "@/utils/socket";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import SuccessDialog from "@/src/components/SuccessDialog";

const PatientSubmissionPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other" | "">("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [preferredLanguage, setPreferredLanguage] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [emergencyContactName, setEmergencyContactName] = useState<string>("");
  const [emergencyContactRelationship, setEmergencyContactRelationship] =
    useState<string>("");
  const [religion, setReligion] = useState<string>("");

  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";
    if (!gender) newErrors.gender = "Gender is required.";
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required.";
    } else if (!/^\d{10,15}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format.";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!preferredLanguage.trim())
      newErrors.preferredLanguage = "Preferred Language is required.";
    if (!nationality.trim()) newErrors.nationality = "Nationality is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClearForm = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setDateOfBirth("");
    setGender("");
    setPhoneNumber("");
    setEmail("");
    setAddress("");
    setPreferredLanguage("");
    setNationality("");
    setEmergencyContactName("");
    setEmergencyContactRelationship("");
    setReligion("");
    setMessage("");
    setErrors({});
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setErrors({});

    if (!validateForm()) {
      setMessage("Please correct the errors in the form.");
      return;
    }

    setIsLoading(true);

    const patientData: Omit<PatientData, "id" | "timestamp"> = {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phoneNumber,
      email,
      address,
      preferredLanguage,
      nationality,
      // Optional fields
      ...(middleName && { middleName }),
      ...(emergencyContactName && { emergencyContactName }),
      ...(emergencyContactRelationship && { emergencyContactRelationship }),
      ...(religion && { religion }),
    };

    //1.5 seconds delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Send data WebSocket
    socket.emit("submitPatientData", patientData);

    setIsLoading(false);
    setShowSuccessDialog(true);

    setMessage("Patient data submitted successfully!");
    handleClearForm(); // Clear the form fields
  };

  const inputClasses =
    "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const errorClasses = "text-red-500 text-xs mt-1";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Head>
        <title>Patient Data Submission</title>
      </Head>
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6">
          Patient Registration Form
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        >
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className={labelClasses}>
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClasses}
            />
            {errors.firstName && (
              <p className={errorClasses}>{errors.firstName}</p>
            )}
          </div>

          {/* Middle Name (Optional) */}
          <div>
            <label htmlFor="middleName" className={labelClasses}>
              Middle Name (Optional)
            </label>
            <input
              type="text"
              id="middleName"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className={labelClasses}>
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClasses}
            />
            {errors.lastName && (
              <p className={errorClasses}>{errors.lastName}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className={labelClasses}>
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className={inputClasses}
            />
            {errors.dateOfBirth && (
              <p className={errorClasses}>{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className={labelClasses}>
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) =>
                setGender(e.target.value as "Male" | "Female" | "Other" | "")
              }
              className={inputClasses}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className={errorClasses}>{errors.gender}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className={labelClasses}>
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={inputClasses}
              placeholder="e.g., 0812345678"
            />
            {errors.phoneNumber && (
              <p className={errorClasses}>{errors.phoneNumber}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              placeholder="e.g., patient@example.com"
            />
            {errors.email && <p className={errorClasses}>{errors.email}</p>}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label htmlFor="address" className={labelClasses}>
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className={inputClasses}
            ></textarea>
            {errors.address && <p className={errorClasses}>{errors.address}</p>}
          </div>

          {/* Preferred Language */}
          <div>
            <label htmlFor="preferredLanguage" className={labelClasses}>
              Preferred Language <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="preferredLanguage"
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              className={inputClasses}
            />
            {errors.preferredLanguage && (
              <p className={errorClasses}>{errors.preferredLanguage}</p>
            )}
          </div>

          {/* Nationality */}
          <div>
            <label htmlFor="nationality" className={labelClasses}>
              Nationality <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className={inputClasses}
            />
            {errors.nationality && (
              <p className={errorClasses}>{errors.nationality}</p>
            )}
          </div>

          {/* Emergency Contact Name (Optional) */}
          <div>
            <label htmlFor="emergencyContactName" className={labelClasses}>
              Emergency Contact Name (Optional)
            </label>
            <input
              type="text"
              id="emergencyContactName"
              value={emergencyContactName}
              onChange={(e) => setEmergencyContactName(e.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Emergency Contact Relationship (Optional) */}
          <div>
            <label
              htmlFor="emergencyContactRelationship"
              className={labelClasses}
            >
              Emergency Contact Relationship (Optional)
            </label>
            <input
              type="text"
              id="emergencyContactRelationship"
              value={emergencyContactRelationship}
              onChange={(e) => setEmergencyContactRelationship(e.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Religion (Optional) */}
          <div>
            <label htmlFor="religion" className={labelClasses}>
              Religion (Optional)
            </label>
            <input
              type="text"
              id="religion"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Patient Data"}
            </button>
          </div>
        </form>
        {message && !showSuccessDialog && (
          <p
            className={`mt-4 text-center ${
              Object.keys(errors).length > 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
        {/* Show spinner when isLoading is true */}
        {isLoading && <LoadingSpinner />}
        <SuccessDialog
          isOpen={showSuccessDialog}
          onClose={handleCloseSuccessDialog}
          message="Your patient data has been successfully recorded."
        />
      </div>
    </div>
  );
};

export default PatientSubmissionPage;
