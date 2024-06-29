import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, exams, queryParams = null, success }) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        if (name === "name") {
            delete queryParams.page;
        }
        const routeName =
            auth.user.role === "admin"
                ? "exam.index"
                : "My-exams.index";
        router.get(route(routeName), queryParams);
    };


    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        const routeName =
            auth.user.role === "admin" ? "exam.index" : "My-exams.index";
        router.get(route(routeName), queryParams);
    };

    const deleteSubject = (exam) => {
        if (!window.confirm("Are you sure you want to delete the exams?")) {
            return;
        }
        const routeName =
            auth.user.role === "admin" ? "exam.destroy" : "My-exams.destroy";

        router.delete(route(routeName, exam.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Exams
                    </h2>
                    <Link
                        href={
                            auth.user.role === "admin"
                                ? route("exam.create")
                                : auth.user.role === "teacher"
                                ? route("My-exams.create")
                                : null
                        }
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Subjects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success && (
                        <div className="px-4 py-2 mb-4 text-white rounded bg-emerald-500">
                            {success}
                        </div>
                    )}
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto ">
                                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3 ">Id</th>
                                            <th>Name</th>
                                            <TableHeading
                                                name="teacher_id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Teacher
                                            </TableHeading>
                                            <TableHeading
                                                name="level_id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Level
                                            </TableHeading>
                                            <TableHeading
                                                name="grade_id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Grade
                                            </TableHeading>
                                            <TableHeading
                                                name="classroom_id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Classsroom
                                            </TableHeading>

                                            <TableHeading
                                                name="updated_at"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Updated At
                                            </TableHeading>
                                            <th className="px-3 py-3 text-center">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {exams.data.map((exam) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={exam.id}
                                            >
                                                <td className="px-3 py-2">
                                                    {exam.id}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {exam.name}
                                                </td>

                                                <td className="px-3 py-2 text-nowrap">
                                                    {exam.teacher}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {exam.level}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {exam.grade}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {exam.classroom}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {exam.updated_at}
                                                </td>
                                                <td className="px-3 py-2 text-center text-nowrap">

                                                {auth.user.role==="teacher" && <Link
                                                        href={
                                                            route(
                                                                "My-exams.show",
                                                                exam.id
                                                            )
                                                        }
                                                        className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        Show Degrees
                                                    </Link>}

                                                    <Link
                                                        href={
                                                            auth.user.role ===
                                                            "admin"
                                                                ? route(
                                                                      "exam.edit",
                                                                      exam.id
                                                                  )
                                                                : route(
                                                                      "My-exams.edit",
                                                                      exam.id
                                                                  )
                                                        }
                                                        className="mx-1 font-medium text-emerald-600 dark:text-emerald-500 hover:underline"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) =>
                                                            deleteSubject(exam)
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
                            </div>

                            <Pagination links={exams.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
