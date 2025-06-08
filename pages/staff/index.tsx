import { useEffect, useState } from "react";

import Head from "next/head";
import { PatientData } from "@/shared/types";
import socket from "@/utils/socket";

const StaffViewPage: React.FC = () => {
  const [patients, setPatients] = useState<PatientData[]>([]);

  useEffect(() => {
    // Listen for initial patient data when connecting
    socket.on("initialPatients", (initialPatients: PatientData[]) => {
      // Sort patients by timestamp, newest first
      const sortedPatients = initialPatients.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setPatients(sortedPatients);
    });

    // Listen for real-time updates when new patient data is submitted
    socket.on("patientUpdate", (newPatient: PatientData) => {
      setPatients((prevPatients) => {
        const updatedPatients = [...prevPatients, newPatient];
        // Sort again after adding a new patient
        return updatedPatients.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });
    });

    // Clean up event listeners on unmount
    return () => {
      socket.off("initialPatients");
      socket.off("patientUpdate");
    };
  }, []);

  const tableHeaderClasses = "px-6 py-3";
  const tableCellClasses = "px-6 py-4";

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <Head>
        <title>Staff Patient View</title>
      </Head>
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
          Current Patients (Real-time)
        </h1>

        {patients.length === 0 ? (
          <p className="text-center text-lg text-gray-600 py-10">
            No patient data yet. Submit some from the Patient Registration Form!
          </p>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className={`${tableHeaderClasses}`}>
                    ID
                  </th>
                  <th scope="col" className={`${tableHeaderClasses}`}>
                    First Name
                  </th>
                  <th scope="col" className={`${tableHeaderClasses}`}>
                    Middle Name
                  </th>
                  <th scope="col" className={`${tableHeaderClasses}`}>
                    Last Name
                  </th>
                  <th scope="col" className={`${tableHeaderClasses}`}>
                    DOB
                  </th>
                  <th scope="col" className={`${tableHeaderClasses}`}>
                    Gender
                  </th>
                  <th scope="col" className={`${tableHeaderClasses}`}>
                    Phone
                  </th>
                  <th scope="col" className={`${tableHeaderClasses}`}>
                    Email
                  </th>
                  <th scope="col" className={`${tableHeaderClasses}`}>
                    Address
                  </th>
                  <th scope="col" className={`${tableHeaderClasses}`}>
                    Language
                  </th>
                  <th scope="col" className={`${tableHeaderClasses}`}>
                    Nationality
                  </th>
                  <th scope="col" className={`${tableHeaderClasses}`}>
                    Emergency Contact
                  </th>
                  <th scope="col" className={`${tableHeaderClasses}`}>
                    Relationship
                  </th>
                  <th scope="col" className={`${tableHeaderClasses}`}>
                    Religion
                  </th>
                  <th scope="col" className={`${tableHeaderClasses}`}>
                    Time Submitted
                  </th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr
                    key={patient.id}
                    className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200`}
                  >
                    <td className={tableCellClasses}>
                      {patient.id.substring(0, 6)}...
                    </td>
                    <td className={tableCellClasses}>{patient.firstName}</td>
                    <td className={tableCellClasses}>
                      {patient.middleName || "-"}
                    </td>
                    <td className={tableCellClasses}>{patient.lastName}</td>
                    <td className={tableCellClasses}>{patient.dateOfBirth}</td>
                    <td className={tableCellClasses}>{patient.gender}</td>
                    <td className={tableCellClasses}>{patient.phoneNumber}</td>
                    <td className={tableCellClasses}>{patient.email}</td>
                    <td className={tableCellClasses}>{patient.address}</td>
                    <td className={tableCellClasses}>
                      {patient.preferredLanguage}
                    </td>
                    <td className={tableCellClasses}>{patient.nationality}</td>
                    <td className={tableCellClasses}>
                      {patient.emergencyContactName || "-"}
                    </td>
                    <td className={tableCellClasses}>
                      {patient.emergencyContactRelationship || "-"}
                    </td>
                    <td className={tableCellClasses}>
                      {patient.religion || "-"}
                    </td>
                    <td className={tableCellClasses}>
                      {new Date(patient.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffViewPage;
