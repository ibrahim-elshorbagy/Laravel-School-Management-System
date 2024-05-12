import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Create({
    auth,
    levels,
    grades,
    classrooms,
    error_promotions,
    success,
}) {
    const { data, setData, post, errors, reset } = useForm({
        old_level_id: "",
        old_grade_id: "",
        old_classroom_id: "",
        old_academic_year: "",
        level_id: "",
        grade_id: "",
        classroom_id: "",
        academic_year: "",
    });

    // Years
    const currentYear = new Date().getFullYear() - 2;
    const numberOfYears = 5;
    const academicYears = [];

    for (let i = 0; i < numberOfYears; i++) {
        academicYears.push(currentYear + i);
    }

    //SubmitForm
    const onSubmit = (e) => {
        e.preventDefault();

        post(route("promotion.store"));
    };

    //-------------------------------------------------------- Adding Student -------------------------------------------
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Create new Student
                    </h2>
                </div>
            }
        >
            <Head title="Student" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {error_promotions && (
                        <div className="px-4 py-2 mb-4 text-white bg-red-500 rounded">
                            {error_promotions}
                        </div>
                    )}
                    {success && (
                        <div className="px-4 py-2 mb-4 text-white rounded bg-emerald-500">
                            {success}
                        </div>
                    )}
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                            <form
                                onSubmit={onSubmit}
                                className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
                            >
                                {/*------------------------------------------------------- Old Grade Info ------------------------------------------------------- */}
                                <div className="flex items-center justify-center text-xl font-medium text-gray-700 dark:text-gray-300">
                                    <hr className="flex-1 my-6 border-gray-300 dark:border-gray-700" />
                                    <span className="m-4">Old Grade Info</span>
                                    <hr className="flex-1 -my-6 border-gray-300 dark:border-gray-700" />
                                </div>
                                <div className="grid grid-cols-1 gap-4 p-10 pt-0 md:grid-cols-4">
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="old_level_id"
                                            value="Level Name"
                                        />
                                        <SelectInput
                                            name="old_level_id"
                                            className="block w-full mt-1"
                                            onChange={(e) =>
                                                setData(
                                                    "old_level_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Level
                                            </option>
                                            {levels.map((level) => (
                                                <option
                                                    value={level.id}
                                                    key={level.id}
                                                >
                                                    {level.name}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError
                                            message={errors.old_level_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="old_grade_id"
                                            value="Grade Name"
                                        />
                                        <SelectInput
                                            name="old_grade_id"
                                            className="block w-full mt-1"
                                            onChange={(e) =>
                                                setData(
                                                    "old_grade_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Grade
                                            </option>
                                            {grades
                                                .filter(
                                                    (grade) =>
                                                        grade.level_id ===
                                                        +data.old_level_id
                                                )
                                                .map((grade) => (
                                                    <option
                                                        value={grade.id}
                                                        key={grade.id}
                                                    >
                                                        {grade.name}
                                                    </option>
                                                ))}
                                        </SelectInput>

                                        <InputError
                                            message={errors.old_grade_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="old_classroom_id"
                                            value="Classroom Name"
                                        />
                                        <SelectInput
                                            name="old_old_classroom_id"
                                            className="block w-full mt-1"
                                            onChange={(e) =>
                                                setData(
                                                    "old_classroom_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Classroom
                                            </option>
                                            {classrooms
                                                .filter(
                                                    (classroom) =>
                                                        classroom.grade_id ===
                                                        +data.old_grade_id
                                                )
                                                .map((classroom) => (
                                                    <option
                                                        value={classroom.id}
                                                        key={classroom.id}
                                                    >
                                                        {classroom.name}
                                                    </option>
                                                ))}
                                        </SelectInput>

                                        <InputError
                                            message={errors.old_classroom_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="old_academic_year"
                                            value="Academic Year"
                                        />
                                        <SelectInput
                                            name="old_academic_year"
                                            className="block w-full mt-1"
                                            onChange={(e) =>
                                                setData(
                                                    "old_academic_year",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Academic Year
                                            </option>
                                            {academicYears.map((year) => (
                                                <option value={year} key={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError
                                            message={errors.old_academic_year}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                {/*------------------------------------------------------- New Grade Info ------------------------------------------------------- */}
                                <div className="flex items-center justify-center text-xl font-medium text-gray-700 dark:text-gray-300">
                                    <hr className="flex-1 my-6 border-gray-300 dark:border-gray-700" />
                                    <span className="m-4">New Grade Info</span>
                                    <hr className="flex-1 -my-6 border-gray-300 dark:border-gray-700" />
                                </div>
                                <div className="grid grid-cols-1 gap-4 p-10 pt-0 md:grid-cols-4">
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="level_id"
                                            value="Level Name"
                                        />
                                        <SelectInput
                                            name="level_id"
                                            className="block w-full mt-1"
                                            onChange={(e) =>
                                                setData(
                                                    "level_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Level
                                            </option>
                                            {levels.map((level) => (
                                                <option
                                                    value={level.id}
                                                    key={level.id}
                                                >
                                                    {level.name}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError
                                            message={errors.level_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="grade_id"
                                            value="Grade Name"
                                        />
                                        <SelectInput
                                            name="grade_id"
                                            className="block w-full mt-1"
                                            onChange={(e) =>
                                                setData(
                                                    "grade_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Grade
                                            </option>
                                            {grades
                                                .filter(
                                                    (grade) =>
                                                        grade.level_id ===
                                                        +data.level_id
                                                )
                                                .map((grade) => (
                                                    <option
                                                        value={grade.id}
                                                        key={grade.id}
                                                    >
                                                        {grade.name}
                                                    </option>
                                                ))}
                                        </SelectInput>

                                        <InputError
                                            message={errors.grade_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="grade_id"
                                            value="Classroom Name"
                                        />
                                        <SelectInput
                                            name="classroom_id"
                                            className="block w-full mt-1"
                                            onChange={(e) =>
                                                setData(
                                                    "classroom_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Classroom
                                            </option>
                                            {classrooms
                                                .filter(
                                                    (classroom) =>
                                                        classroom.grade_id ===
                                                        +data.grade_id
                                                )
                                                .map((classroom) => (
                                                    <option
                                                        value={classroom.id}
                                                        key={classroom.id}
                                                    >
                                                        {classroom.name}
                                                    </option>
                                                ))}
                                        </SelectInput>

                                        <InputError
                                            message={errors.classroom_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="academic_year"
                                            value="Academic Year"
                                        />
                                        <SelectInput
                                            name="academic_year"
                                            className="block w-full mt-1"
                                            onChange={(e) =>
                                                setData(
                                                    "academic_year",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Academic Year
                                            </option>
                                            {academicYears.map((year) => (
                                                <option value={year} key={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError
                                            message={errors.academic_year}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("promotion.index")}
                                        className="px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200"
                                    >
                                        Cancel
                                    </Link>
                                    <button className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
