import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FaUser, FaChalkboardTeacher } from "react-icons/fa";
import Tabs from "./Tabs";
export default function Dashboard({ auth, NumberOfClassrooms, NumberOfStudents,students,classroomInfo }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Hello {auth.user.name}
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="p-12 mx-auto bg-white shadow-sm max-w-7xl sm:px-6 lg:px-8 dark:bg-gray-800 sm:rounded-lg">
                    {/* --------------------------------------------- widgets --------------------------------------------- */}
                    <div className="grid grid-cols-2 gap-4 dark:bg-gray-800">
                        <div className="p-4 bg-gray-900 rounded-lg shadow-md">
                            <div className="flex justify-between mb-2">
                                <h3 className="font-medium text-gray-300">
                                    Number Of Class
                                </h3>
                                <FaChalkboardTeacher
                                    className="text-green-500"
                                    size={24}
                                />
                            </div>
                            <span className="text-3xl font-bold text-white">
                                {NumberOfClassrooms}
                            </span>
                        </div>
                        <div className="p-4 bg-gray-900 rounded-lg shadow-md">
                            <div className="flex justify-between mb-2">
                                <h3 className="font-medium text-gray-300">
                                    Number Of Students
                                </h3>
                                <FaUser className="text-orange-500" size={24} />
                            </div>
                            <span className="text-3xl font-bold text-white">
                                {NumberOfStudents}
                            </span>
                        </div>
                    </div>

                    {/* --------------------------------------------- Arrow Student Section --------------------------------------------- */}
                    <Tabs students={students} classroomInfo={classroomInfo} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
