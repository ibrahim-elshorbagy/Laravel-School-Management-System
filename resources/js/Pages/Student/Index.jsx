import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import Dropdown from '@/Components/Dropdown';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, students, queryParams = null, success }) {

    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("student.index"), queryParams);
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
        router.get(route("student.index"), queryParams);
    };

    const deleteStudent = (student) => {
        if (!window.confirm("Are you sure you want to delete the student?")) {
            return;
        }
        router.delete(route("student.destroy", student.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Student
                    </h2>
                    <Link
                        href={route("student.create")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Student" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success && (
                        <div className="px-4 py-2 mb-4 text-white rounded bg-emerald-500">
                            {success}
                        </div>
                    )}
                    <div className="bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 overflow-x-auto text-gray-900 dark:text-gray-100 ">
                            <div className="">
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
                                                Classroom
                                            </TableHeading>
                                            <TableHeading
                                                name="academic_year"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Year
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
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.name
                                                    }
                                                    placeholder="Student Name"
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
                                                    placeholder="Student Email"
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
                                        {students.data.map((student) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={student.id}
                                            >
                                                <td className="px-3 py-2">
                                                    {student.id}
                                                </td>

                                                <th className="px-3 py-2 text-gray-100 text-nowrap">
                                                    {student.name}
                                                </th>
                                                <td className="px-3 py-2">
                                                    {student.email}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {student.level}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {student.grade}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {student.classroom}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {student.academic_year}
                                                </td>
                                                {/* Edit/Delete Buttons */}
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
                                                                    "student.edit",
                                                                    student.id
                                                                )}
                                                            >
                                                                Edit
                                                            </Dropdown.Link>

                                                            <Dropdown.Link
                                                                href={route(
                                                                    "fee-invoice.show",
                                                                    student.id
                                                                )}
                                                            >
                                                                Add Invoice
                                                            </Dropdown.Link>

                                                            <Dropdown className="mt-2">
                                                                <button
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        deleteStudent(
                                                                            student
                                                                        )
                                                                    }
                                                                    className="block w-full px-4 py-2 text-sm leading-5 text-red-700 transition duration-150 ease-in-out text-start dark:text-red-300 hover:bg-red-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-red-800"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </Dropdown>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination  links={students.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
