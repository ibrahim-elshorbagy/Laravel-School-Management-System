import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function degrees({ auth, exams, queryParams = null, }) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Exams
                    </h2>
                </div>
            }
        >
            <Head title="Exams" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3 text-left">
                                                Name
                                            </th>
                                            <th className="px-3 py-3 text-left">
                                                Level
                                            </th>
                                            <th className="px-3 py-3 text-left">
                                                Grade
                                            </th>

                                            <th className="px-3 py-3 text-left">
                                                Exam Result
                                            </th>
                                            <th className="w-32 px-3 py-3 text-left">
                                                Updated At
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {exams.data.map((exam) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={exam.id}
                                            >
                                                <td className="px-3 py-2 text-left">
                                                    {exam.exam_name}
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                    {exam.level}
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                    {exam.grade}
                                                </td>

                                                <td className="px-3 py-2 text-left">
                                                    {exam.examResult}
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                    {exam.updated_at}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination links={exams.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
