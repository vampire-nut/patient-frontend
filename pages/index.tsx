import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <Head>
        <title>Welcome to Patient-Staff App</title>
        <meta name="description" content="Access Patient Registration Form or Staff View" />
      </Head>

      <div className="bg-white p-8 sm:p-10 md:p-12 rounded-lg shadow-2xl text-center max-w-md w-full transform transition-all duration-300 ease-in-out hover:scale-105">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 leading-tight">
          Welcome to the <br /> Patient Management System
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Choose your role to proceed:
        </p>

        <div className="flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:space-x-6 justify-center">
          <Link href="/patient-from" legacyBehavior>
            <a className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1"
            target="_blank"
            rel="noopener noreferrer"
            >
              Patient Registration
            </a>
          </Link>
          <Link href="/staff" legacyBehavior>
            <a className="w-full sm:w-auto px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:-translate-y-1"
               target="_blank"
            rel="noopener noreferrer">
              Staff View
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
