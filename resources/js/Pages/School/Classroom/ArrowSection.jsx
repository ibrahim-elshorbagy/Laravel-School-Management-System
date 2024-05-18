import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";

import {
    CLASSROOM_STATUS_CLASS_MAP,
    CLASSROOM_STATUS_TEXT_MAP,
} from "@/constants.jsx";

const ArrowSection = ({ level }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

        const deleteclassroom = (classroom) => {
            if (
                !window.confirm(
                    "Are you sure you want to delete the classrooms?"
                )
            ) {
                return;
            }

            router.delete(route("classroom.destroy", classroom.id));
        };

    return (
        <div className="w-full px-10 py-8 mx-auto my-5 overflow-auto bg-gray-900 rounded-lg">
            <div className="mx-auto space-y-6 ">
                <div
                    onClick={toggleOpen}
                    className="flex items-center w-full mx-auto mb-5 overflow-hidden text-gray-600 border-b cursor-pointer md:mt-0"
                >
                    <div
                        className={`w-10 border-r px-2 transform transition duration-300 ease-in-out ${
                            isOpen ? "rotate-90" : ""
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </div>

                    <div className="flex items-center px-2 py-3">
                        <div className="mx-3">
                            <button className="text-white hover:underline">
                                {level.name}
                            </button>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="flex w-full p-5 pb-10 transition ease-in-out transform border-b duration-600 md:p-0 ">
                        {/*  */}
                        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-3">Class Name</th>
                                    <th className="px-3 py-3 ">Grade</th>
                                    <th className="px-3 py-3 text-center">
                                        Status
                                    </th>
                                    <th className="px-3 py-3 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {level.classrooms.map((classroom) => (
                                    <tr
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        key={level.id}
                                    >
                                        <td className="px-3 py-2">
                                            {classroom.name}
                                        </td>
                                        <td className="px-3 py-2">
                                            {classroom.grade.name}
                                        </td>

                                        <td className="px-3 py-2 text-center">
                                            <span
                                                className={
                                                    "px-2 py-1 text-nowrap text-white rounded " +
                                                    CLASSROOM_STATUS_CLASS_MAP[
                                                        classroom.status
                                                    ]
                                                }
                                            >
                                                {
                                                    CLASSROOM_STATUS_TEXT_MAP[
                                                        classroom.status
                                                    ]
                                                }
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-center text-nowrap">
                                            <Link
                                                href={route(
                                                    "classroom.edit",
                                                    classroom.id
                                                )}
                                                className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={(e) =>
                                                    deleteclassroom(classroom)
                                                }
                                                className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/*  */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArrowSection;
