import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, receipt_students, queryParams = null, success }) {
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

        router.get(route("receipt-student.index"), queryParams);
    };

    const onKeyPress = (name, event) => {
        if (event.key == "Enter") {
            searchFieldChanged(name, event.target.value);
        }
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
        router.get(route("receipt-student.index"), queryParams);
    };

    const deleteReceiptStudent = (receipt_student) => {
        if (
            !window.confirm("Are you sure you want to delete the Fee Invoice?")
        ) {
            return;
        }

        router.delete(route("receipt-student.destroy", receipt_student.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Recevied money
                    </h2>
                    <Link
                        href={route("student.index")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Add Recevied money
                    </Link>
                </div>
            }
        >
            <Head title="Fee Invoice" />

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
                                            <TableHeading
                                                name="id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                ID
                                            </TableHeading>

                                            <th>Name</th>
                                            <TableHeading
                                                name="debit"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Received
                                            </TableHeading>
                                            <th className="px-3 py-3">
                                                description
                                            </th>

                                            <TableHeading
                                                name="created_at"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Created At
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
                                    <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full min-w-[350px]"
                                                    placeholder="Name"
                                                    onSubmit={(e) =>
                                                        searchFieldChanged(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress("name", e)
                                                    }
                                                ></TextInput>
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3 text-center text-nowrap"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {receipt_students.data.map(
                                            (receipt_student) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={receipt_student.id}
                                                >
                                                    <td className="px-3 py-2">
                                                        {receipt_student.id}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            receipt_student.student
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {receipt_student.debit}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            receipt_student.description
                                                        }
                                                    </td>

                                                    <td className="px-3 py-2 text-nowrap">
                                                        {
                                                            receipt_student.created_at
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2 text-nowrap">
                                                        {
                                                            receipt_student.updated_at
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2 text-center text-nowrap">
                                                        <Link
                                                            href={route(
                                                                "receipt-student.edit",
                                                                receipt_student.id
                                                            )}
                                                            className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={(e) =>
                                                                deleteReceiptStudent(
                                                                    receipt_student
                                                                )
                                                            }
                                                            className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination links={receipt_students.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
