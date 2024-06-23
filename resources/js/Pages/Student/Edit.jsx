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
        post(route("student.update", student));
    };


    //-------------------------------------------------------- Edit Student -------------------------------------------
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Edit Student
                    </h2>
                </div>
            }
        >
            <Head title="student" />
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
                                            placeholder="Write if you want to change the password"
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
                                <div className="flex items-center justify-center text-xl font-medium text-gray-700 dark:text-gray-300">
                                    <hr className="flex-1 my-6 border-gray-300 dark:border-gray-700" />
                                    <span className="m-4">Image</span>
                                    <hr className="flex-1 -my-6 border-gray-300 dark:border-gray-700" />
                                </div>
                                <div className="max-w-md p-6 mx-auto rounded-lg shadow-md">
                                    <div className="mt-4 ">
                                        <div className="relative ">
                                            <input
                                                id="image"
                                                type="file"
                                                name="image"
                                                className="hidden"
                                                onChange={(e) =>
                                                    setData(
                                                        "image",
                                                        e.target.files[0]
                                                    )
                                                }
                                            />

                                            <label
                                                htmlFor="image"
                                                className="block w-full mt-1 transition duration-300 ease-in-out border border-gray-600 rounded-md shadow-sm cursor-pointer focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 hover:bg-gray-700"
                                            >
                                                <div className="flex items-center justify-center p-4">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-6 h-6 mr-2 text-gray-400"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                        />
                                                    </svg>
                                                    <p className="text-sm text-gray-300">
                                                        Choose an image
                                                    </p>
                                                </div>
                                            </label>
                                            <InputError
                                                message={errors.image}
                                                className="mt-2 text-sm text-red-400"
                                            />
                                        </div>
                                    </div>

                                    {data.image ? (
                                        <div className="flex items-center justify-center mt-6">
                                            <div className="flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg shadow-md w-80 h-80">
                                                <img
                                                    src={URL.createObjectURL(
                                                        data.image
                                                    )}
                                                    alt="Uploaded"
                                                    className="object-contain max-w-full max-h-full"
                                                />
                                            </div>
                                        </div>
                                    ) : student.image_path ? (
                                        <div className="flex items-center justify-center mt-6">
                                            <div className="flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg shadow-md w-80 h-80">
                                                <img
                                                    src={student.image_path}
                                                    alt="Uploaded"
                                                    className="object-contain max-w-full max-h-full"
                                                />
                                            </div>
                                        </div>
                                    ) : null}
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
                                            htmlFor="classroom_id"
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
                                                {guardian.user.name}
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
