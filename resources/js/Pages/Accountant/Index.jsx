import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, accountants, queryParams = null, success }) {

    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("accountant.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
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
        router.get(route("accountant.index"), queryParams);
    };

    const deleteaccountant = (accountant) => {
        if (!window.confirm("Are you sure you want to delete the accountant?")) {
            return;
        }
        router.delete(route("accountant.destroy", accountant.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Accountant
                    </h2>
                    <Link
                        href={route("accountant.create")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="accountant" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success && (
                        <div className="px-4 py-2 mb-4 text-white rounded bg-emerald-500">
                            {success}
                        </div>
                    )}
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="text-gray-700 border-b-2 border-gray-500 text-l bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                            <th>Email</th>


                                            <th className="px-3 py-3 ">
                                                Level
                                            </th>
                                            <th className="px-3 py-3 ">
                                                Number
                                            </th>
                                            <th className="px-3 py-3 ">
                                                Address
                                            </th>
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
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.name
                                                    }
                                                    placeholder="accountant Name"
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress("name", e)
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.email
                                                    }
                                                    placeholder="accountant Email"
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress("email", e)
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accountants.data.map((accountant) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={accountant.id}
                                            >
                                                <td className="px-3 py-2">
                                                    {accountant.id}
                                                </td>
                                                <th className="px-3 py-2 text-gray-100 text-nowrap">
                                                    {accountant.name}
                                                </th>
                                                <td className="px-3 py-2">
                                                    {accountant.email}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {accountant.level}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {accountant.phone}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {accountant.address}
                                                </td>
                                                {/* Edit/Delete Buttons */}
                                                <td className="px-3 py-2 text-center text-nowrap">
                                                    <Link
                                                        href={route(
                                                            "accountant.edit",
                                                            accountant.id
                                                        )}
                                                        className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) =>
                                                            deleteaccountant(
                                                                accountant
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
                            <Pagination links={accountants.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
