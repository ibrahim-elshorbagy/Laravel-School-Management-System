import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Edit({
    auth,
    nationalities,
    levels,
    grades,
    classrooms,
    guardians,
    student,
}) {
    const { data, setData, post, errors, reset } = useForm({
        email: student.email || "",
        password: student.password || "",
        name: student.name || "",
        national_id: student.national_id || "",
        gender: student.gender || "",
        date_birth: student.date_birth || "",
        level_id: student.level_id || "",
        grade_id: student.grade_id || "",
        classroom_id: student.classroom_id || "",
        academic_year: student.academic_year || "",
        guardian_id: student.guardian_id || "",

        _method: "PUT",
        //image
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
        post(route("student.updatet"));
    };


    //-------------------------------------------------------- Edit Student -------------------------------------------
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
            {JSON.stringify(student)}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                            <form
                                onSubmit={onSubmit}
                                className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
                            >
                                <div className="flex items-center justify-center text-xl font-medium text-gray-700 dark:text-gray-300">
                                    <hr className="flex-1 my-6 border-gray-300 dark:border-gray-700" />
                                    <span className="m-4">Student Info</span>
                                    <hr className="flex-1 -my-6 border-gray-300 dark:border-gray-700" />
                                </div>

                                <div className="grid grid-cols-1 gap-4 p-10 md:grid-cols-2">
                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="block w-full mt-1"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <InputLabel
                                            htmlFor="password"
                                            value="Password"
                                        />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="block w-full mt-1"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/*  Name */}
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="name"
                                            value="Name"
                                        />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="block w-full mt-1"
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* nationality */}
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="national_id"
                                            value="Nationality"
                                        />
                                        <SelectInput
                                            name="national_id"
                                            className="block w-full mt-1"
                                            value={data.national_id}
                                            onChange={(e) =>
                                                setData(
                                                    "national_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Nationality
                                            </option>
                                            {nationalities.map(
                                                (nationality) => (
                                                    <option
                                                        value={nationality.id}
                                                        key={nationality.id}
                                                    >
                                                        {nationality.name}
                                                    </option>
                                                )
                                            )}
                                        </SelectInput>
                                        <InputError
                                            message={errors.national_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="gender"
                                            value="Gender"
                                        />
                                        <SelectInput
                                            name="gender"
                                            className="block w-full mt-1"
                                            value={data.gender}
                                            onChange={(e) =>
                                                setData(
                                                    "gender",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Gender
                                            </option>
                                            <option value="male">Male</option>
                                            <option value="female">
                                                Female
                                            </option>
                                        </SelectInput>
                                        <InputError
                                            message={errors.gender}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="date_birth"
                                            value="Date Of Birth"
                                        />

                                        <TextInput
                                            id="date_birth"
                                            type="date"
                                            name="date_birth"
                                            value={data.date_birth}
                                            className="block w-full mt-1"
                                            onChange={(e) =>
                                                setData(
                                                    "date_birth",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.date_birth}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                {/*-------------------------------------------------------  Level Info ------------------------------------------------------- */}
                                <div className="flex items-center justify-center text-xl font-medium text-gray-700 dark:text-gray-300">
                                    <hr className="flex-1 my-6 border-gray-300 dark:border-gray-700" />
                                    <span className="m-4">Level Info</span>
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
                                            value={data.level_id}
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
                                            value={data.grade_id}
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
                                            value={data.classroom_id}
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
                                            value={data.academic_year}
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
                                <div className="flex items-center justify-center text-xl font-medium text-gray-700 dark:text-gray-300">
                                    {/*-------------------------------------------------------------------  Guardian Info       ------------------------------------------------------ */}

                                    <hr className="flex-1 my-6 border-gray-300 dark:border-gray-700" />
                                    <span className="m-4">Guardian Info</span>
                                    <hr className="flex-1 -my-6 border-gray-300 dark:border-gray-700" />
                                </div>
                                <div className="p-4 mt-4">
                                    <InputLabel
                                        htmlFor="guardian_id"
                                        value="Guardian"
                                    />
                                    <SelectInput
                                        name="guardian_id"
                                        className="block w-full mt-1"
                                        value={data.guardian_id}
                                        onChange={(e) =>
                                            setData(
                                                "guardian_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select Guardian
                                        </option>
                                        {guardians.map((guardian) => (
                                            <option
                                                value={guardian.id}
                                                key={guardian.id}
                                            >
                                                {guardian.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError
                                        message={errors.national_id}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("student.index")}
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
