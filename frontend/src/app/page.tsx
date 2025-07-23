'use client';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Employee Task Flow</h1>
          <p className="text-xl text-gray-600">Streamline your work tasks efficiently</p>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="md:w-1/2">
            <img
              src="https://www.cflowapps.com/wp-content/uploads/2018/07/task-management-process.png" 
              alt="Task Management"
              width={500}
              height={400}
              className="w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800">Get Started</h2>
            <p className="text-lg text-gray-600">
              Manage your tasks, track progress, and collaborate with your team seamlessly.
            </p>
            <button
              onClick={handleLoginClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg text-lg transition duration-300 flex items-center gap-2"
            >
              <i className="bi bi-box-arrow-in-right text-xl"></i>
              Login to Your Account
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:bg-blue-50 transition">
              <i className="bi bi-list-task text-4xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Task Management</h3>
              <p className="text-gray-600">Create, assign and track tasks with ease</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-blue-50 transition">
              <i className="bi bi-graph-up text-4xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Monitor your work progress in real-time</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-blue-50 transition">
              <i className="bi bi-people text-4xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Team Collaboration</h3>
              <p className="text-gray-600">Work together with your colleagues</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">About Employee Task Flow</h2>
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              Employee Task Flow is a comprehensive task management system designed to help employees and administrators 
              organize, track, and complete work assignments efficiently.
            </p>
            <p>
              Our platform provides a user-friendly interface that simplifies task delegation, progress monitoring, 
              and team collaboration, making it easier for organizations to achieve their goals.
            </p>
            <p>
              Whether you're an employee looking to manage your daily tasks or an administrator overseeing team 
              productivity, Employee Task Flow has the tools you need to succeed.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-blue-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Ready to boost your productivity?</h2>
          <button
            onClick={handleLoginClick}
            className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}