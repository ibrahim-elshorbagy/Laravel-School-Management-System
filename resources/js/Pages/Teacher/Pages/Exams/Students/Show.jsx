import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, results }) {
    const { route, router } = usePage();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Students results
                    </h2>
                </div>
            }
        >
            <Head title="Students results" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 overflow-x-auto text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                <thead className="text-gray-700 border-b-2 border-gray-500 text-l bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">Name</th>
                                        <th className="px-3 py-3">Degree</th>
                                        <th className="w-10 px-6 py-3 text-right">
                                            Updated At
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((result) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={result.id}
                                        >
                                            <td className="px-3 py-2">
                                                {result.student.user.name}
                                            </td>
                                            <td className="px-3 py-2">
                                                {result.degree}
                                            </td>
                                            <td className="w-10 px-6 py-2 text-right">
                                                {new Date(
                                                    result.updated_at
                                                ).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
