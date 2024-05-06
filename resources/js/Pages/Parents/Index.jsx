import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, parents, queryParams = null, success }) {

    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("parents.index"), queryParams);
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
        router.get(route("parents.index"), queryParams);
    };

    const deleteParents = (parents) => {
        if (!window.confirm("Are you sure you want to delete the parents?")) {
            return;
        }
        router.delete(route("parents.destroy", parents.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Parents
                    </h2>
                    <Link
                        href={route("parents.create")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Parents" />

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
                                            <TableHeading
                                                name="name"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Name
                                            </TableHeading>

                                            <TableHeading
                                                name="email"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Email
                                            </TableHeading>

                                            <th className="px-3 py-3 ">
                                                Passport
                                            </th>
                                            <th className="px-3 py-3 ">
                                                Number
                                            </th>
                                            <th className="px-3 py-3 ">Job</th>
                                            <th className="px-3 py-3 ">
                                                Address
                                            </th>
                                            <th className="px-3 py-3 text-right">
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
                                                    placeholder="Parents Name"
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
                                                    placeholder="Parents Email"
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
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {parents.data.map((parents) => (
                                            <>
                                                {/* First Row - Father's Information */}
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={parents.id}
                                                >
                                                    <td className="px-3 py-2">
                                                        {parents.id}
                                                    </td>
                                                    <th className="px-3 py-2 text-gray-100 text-nowrap">
                                                        {parents.name_father}
                                                    </th>
                                                    <td className="px-3 py-2">
                                                        {parents.email}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            parents.passport_id_father
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {parents.phone_father}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {parents.job_father}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {parents.address_father}
                                                    </td>
                                                    {/* Edit/Delete Buttons */}
                                                    <td
                                                        className="px-3 py-2 text-nowrap"
                                                        rowSpan="2"
                                                    >
                                                        <Link
                                                            href={route(
                                                                "parents.edit",
                                                                parents.id
                                                            )}
                                                            className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={(e) =>
                                                                deleteParents(
                                                                    parents
                                                                )
                                                            }
                                                            className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>

                                                {/* Second Row - Mother's Information */}
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className="px-3 py-2">
                                                        {parents.id}
                                                    </td>
                                                    <th className="px-3 py-2 text-gray-100 text-nowrap">
                                                        {parents.name_mother}
                                                    </th>
                                                    <td className="px-3 py-2">
                                                        {parents.email}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {
                                                            parents.passport_id_mother
                                                        }
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {parents.phone_mother}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {parents.job_mother}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {parents.address_mother}
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={parents.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
