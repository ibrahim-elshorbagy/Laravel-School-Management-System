import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({
    auth,
    promotions,
    queryParams = null,
    success,
}) {
    queryParams = queryParams || {};



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
        router.get(route("promotion.index"), queryParams);
    };

    const deletePromotions = (promotions) => {
        if (
            !window.confirm("Are you sure you want to retun this promotion?")
        ) {
            return;
        }
        router.delete(route("promotion.destroy", promotions.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Promotions
                    </h2>
                    <Link
                        href={route("promotion.create")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Promotions" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
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
                                                name="student_id"
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
                                                name="from_level"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                From Level
                                            </TableHeading>

                                            <TableHeading
                                                name="from_grade"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                From Grade
                                            </TableHeading>
                                            <TableHeading
                                                name="from_classroom"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                From Classroom
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
                                                Academic Year
                                            </TableHeading>
                                            <TableHeading
                                                name="to_level"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                To Level
                                            </TableHeading>

                                            <TableHeading
                                                name="to_grade"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                To Grade
                                            </TableHeading>
                                            <TableHeading
                                                name="to_classroom"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                To Classroom
                                            </TableHeading>
                                            <TableHeading
                                                name="academic_year_new"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                New Academic Year
                                            </TableHeading>
                                            <th className="px-3 py-3 text-center">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {promotions.data.map((promotion) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={promotion.id}
                                            >
                                                <td className="px-3 py-2">
                                                    {promotion.id}
                                                </td>

                                                <th className="px-3 py-2 text-gray-100 text-nowrap">
                                                    {promotion.student}
                                                </th>
                                                <td className="px-3 py-2">
                                                    {promotion.FromLevel}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {promotion.FromGrade}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {promotion.FromClassroom}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {promotion.academic_year}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {promotion.ToLevel}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {promotion.ToGrade}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {promotion.ToClassroom}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {promotion.academic_year_new}
                                                </td>
                                                {/* Edit/Delete Buttons */}
                                                <td className="px-3 py-2 text-center text-nowrap">
                                                    <button
                                                        onClick={(e) =>
                                                            deletePromotions(
                                                                promotion
                                                            )
                                                        }
                                                        className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        Return
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={promotions.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
