import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, feeInvoices, queryParams = null, success }) {
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

        router.get(route("fee-invoice.index"), queryParams);
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
        router.get(route("fee-invoice.index"), queryParams);
    };

    const deleteFeeInvoice = (feeInvoice) => {
        if (
            !window.confirm("Are you sure you want to delete the Fee Invoice?")
        ) {
            return;
        }

        router.delete(route("fee-invoice.destroy", feeInvoice.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Fee Invoice
                    </h2>
                    <Link
                        href={route("accountant.students")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Make an Invoice
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
                                                name="fee_id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Fee
                                            </TableHeading>
                                            <TableHeading
                                                name="amount"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Amount / EGP
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
                                                    placeholder="Fee Invoice"
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
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3 text-center text-nowrap"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {feeInvoices.data.map((feeInvoice) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={feeInvoice.id}
                                            >
                                                <td className="px-3 py-2">
                                                    {feeInvoice.id}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {feeInvoice.student}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {feeInvoice.fee}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {feeInvoice.amount}
                                                </td>

                                                <td className="px-3 py-2 text-nowrap">
                                                    {feeInvoice.level}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {feeInvoice.grade}
                                                </td>

                                                <td className="px-3 py-2 text-nowrap">
                                                    {feeInvoice.updated_at}
                                                </td>
                                                <td className="px-3 py-2 text-center text-nowrap">
                                                    <Link
                                                        href={route(
                                                            "fee-invoice.edit",
                                                            feeInvoice.id
                                                        )}
                                                        className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) =>
                                                            deleteFeeInvoice(
                                                                feeInvoice
                                                            )
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

                            <Pagination links={feeInvoices.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
