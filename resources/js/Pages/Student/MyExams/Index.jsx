import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({
    auth,
    exams,
    queryParams = null,
    success,
    danger,
}) {
    queryParams = queryParams || {};

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_direction =
                queryParams.sort_direction === "asc" ? "desc" : "asc";
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("MyExam.index"), queryParams);
    };

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
                    {success && (
                        <div className="px-4 py-2 mb-4 text-white rounded bg-emerald-500">
                            {success}
                        </div>
                    )}
                    {danger && (
                        <div className="px-4 py-2 mb-4 text-white bg-red-500 rounded">
                            {danger}
                        </div>
                    )}
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3 text-center">
                                                Id
                                            </th>
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
                                                Actions
                                            </th>
                                            <th className="px-3 py-3 text-left">
                                                Exam Result
                                            </th>
                                            <TableHeading
                                                name="updated_at"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className="px-3 py-3"
                                            >
                                                Updated At
                                            </TableHeading>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {exams.data.map((exam) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={exam.id}
                                            >
                                                <td className="px-3 py-2 text-center">
                                                    {exam.id}
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                    {exam.name}
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                    {exam.level}
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                    {exam.grade}
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                    {exam.examResult ? (
                                                        <span className="px-2 py-1 text-sm text-white bg-gray-500 rounded-md cursor-not-allowed">
                                                            Attend
                                                        </span>
                                                    ) : (
                                                        <Link
                                                            href={route(
                                                                "MyExam.show",
                                                                exam.id
                                                            )}
                                                            className="px-2 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
                                                            disabled={
                                                                exam.danger
                                                            }
                                                        >
                                                            Attend
                                                        </Link>
                                                    )}
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
