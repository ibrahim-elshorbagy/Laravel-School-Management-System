import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";

export default function Index({ auth, MyChildren }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        My Children
                    </h2>
                </div>
            }
        >
            <Head title="My Children" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 overflow-x-auto text-gray-900 dark:text-gray-100">
                            <div>
                                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="text-gray-700 border-b-2 border-gray-500 text-l bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th className="px-3 py-2 ">Name</th>
                                            <th className="px-3 py-2 ">Email</th>
                                            <th className="px-3 py-2 ">Level</th>
                                            <th className="px-3 py-2 ">Grade</th>
                                            <th className="px-3 py-2 ">Classroom</th>
                                            <th className="px-3 py-2 ">Year</th>
                                            <th className="px-3 py-2 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MyChildren.data.map((child) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={child.id}
                                            >
                                                <td className="px-3 py-2">
                                                    {child.name}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {child.email}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {child.level}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {child.grade}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {child.classroom}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {child.academic_year}
                                                </td>
                                                <td className="px-3 py-2 text-center text-nowrap">
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <span className="inline-flex rounded-md">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md dark:text-gray-400 dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                                                                >
                                                                    Operations
                                                                    <svg
                                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </span>
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Content>
                                                            <Dropdown.Link
                                                                href={route(
                                                                    "guardian.MyChildren.ShowExams",
                                                                    child.id
                                                                )}
                                                            >
                                                                Show degrees
                                                            </Dropdown.Link>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={MyChildren.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
