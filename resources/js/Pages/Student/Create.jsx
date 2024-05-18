import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Create({auth,nationalities,levels,grades,classrooms,guardians,}) {
    const { data, setData, post, errors, reset } = useForm({
        guardian_email: " ",
        guardian_password: " ",
        guardian_name: " ",
        guardian_phone: " ",
        guardian_passport_id: " ",
        guardian_job: " ",
        guardian_national_id: " ",
        guardian_address: " ",
        guardian_id: " ",

        //Student
        email: "",
        password: " ",
        name: " ",
        national_id: " ",
        gender: " ",
        date_birth: " ",
        level_id: " ",
        grade_id: " ",
        classroom_id: " ",
        academic_year: " ",
        image:"",
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

        post(route("student.store"));
    };

    //-------------------------------------------------------- Adding guardian -------------------------------------------
    // Adding New Parents
    const [guardianType, setGuardianType] = useState("existing"); // 'existing' or 'new'

    const handleGuardianTypeChange = (e) => {
        setGuardianType(e.target.value);
    };

    const renderGuardianSection = () => {
        if (guardianType === "new") {
            return (
                <div>
                    {
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="guardian_email"
                                    value="Email"
                                />
                                <TextInput
                                    id="guardian_email"
                                    type="email"
                                    name="guardian_email"
                                    value={data.guardian_email}
                                    className="block w-full mt-1"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            "guardian_email",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.guardian_email}
                                    className="mt-2"
                                />
                            </div>

                            {/* Password */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="guardian_password"
                                    value="Password"
                                />
                                <TextInput
                                    id="guardian_password"
                                    type="password"
                                    name="guardian_password"
                                    value={data.guardian_password}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData(
                                            "guardian_password",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.guardian_password}
                                    className="mt-2"
                                />
                            </div>

                            {/*  Name */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="guardian_name"
                                    value="Name"
                                />
                                <TextInput
                                    id="guardian_name"
                                    type="text"
                                    name="guardian_name"
                                    value={data.guardian_name}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("guardian_name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.guardian_name}
                                    className="mt-2"
                                />
                            </div>
                            {/* Phone */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="guardian_phone"
                                    value="Phone"
                                />
                                <TextInput
                                    id="guardian_phone"
                                    type="tel"
                                    name="guardian_phone"
                                    value={data.guardian_phone}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData(
                                            "guardian_phone",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.guardian_phone}
                                    className="mt-2"
                                />
                            </div>

                            {/* Passport ID */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="guardian_passport_id"
                                    value="Passport ID"
                                />
                                <TextInput
                                    id="guardian_passport_id"
                                    type="text"
                                    name="guardian_passport_id"
                                    value={data.guardian_passport_id}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData(
                                            "guardian_passport_id",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.guardian_passport_id}
                                    className="mt-2"
                                />
                            </div>

                            {/* Job */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="guardian_job"
                                    value="Job"
                                />
                                <TextInput
                                    id="guardian_job"
                                    type="text"
                                    name="guardian_job"
                                    value={data.job}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("guardian_job", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.guardian_job}
                                    className="mt-2"
                                />
                            </div>

                            {/* nationality */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="guardian_national_id"
                                    value="Nationality"
                                />
                                <SelectInput
                                    name="guardian_national_id"
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData(
                                            "guardian_national_id",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select Nationality</option>
                                    {nationalities.map((nationality) => (
                                        <option
                                            value={nationality.id}
                                            key={nationality.id}
                                        >
                                            {nationality.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.guardian_national_id}
                                    className="mt-2"
                                />
                            </div>

                            {/* Address */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="guardian_address"
                                    value="Address"
                                />
                                <TextInput
                                    id="guardian_address"
                                    type="text"
                                    name="guardian_address"
                                    value={data.guardian_address}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData(
                                            "guardian_address",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.guardian_address}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    }
                </div>
            );
        } else {
            // Render section for selecting existing guardian
            return (
                <div className="mt-4">
                    <InputLabel htmlFor="guardian_id" value="Guardian" />
                    <SelectInput
                        name="guardian_id"
                        className="block w-full mt-1"
                        onChange={(e) => setData("guardian_id", e.target.value)}
                    >
                        <option value="">Select Guardian</option>
                        {guardians.map((guardian) => (
                            <option value={guardian.id} key={guardian.id}>
                                {guardian.name}
                            </option>
                        ))}
                    </SelectInput>
                    <InputError message={errors.national_id} className="mt-2" />
                </div>
            );
        }
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

                                    {data.image && (
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
                                    )}
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
                                <div className="flex items-center justify-center text-xl font-medium text-gray-700 dark:text-gray-300">
                                    {/*-------------------------------------------------------------------  Guardian Info       ------------------------------------------------------ */}

                                    <hr className="flex-1 my-6 border-gray-300 dark:border-gray-700" />
                                    <span className="m-4">Guardian Info</span>
                                    <hr className="flex-1 -my-6 border-gray-300 dark:border-gray-700" />
                                </div>
                                <div className="p-10 pt-0 mt-4 ">
                                    <InputLabel
                                        htmlFor="guardianType"
                                        value="Guardian "
                                    />
                                    <SelectInput
                                        name="guardianType"
                                        className="block w-full mt-1"
                                        onChange={handleGuardianTypeChange}
                                    >
                                        <option value="existing">
                                            Select Existing Guardian
                                        </option>
                                        <option value="new">
                                            Add New Guardian
                                        </option>
                                    </SelectInput>

                                    {renderGuardianSection()}
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
