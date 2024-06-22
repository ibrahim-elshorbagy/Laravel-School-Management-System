import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Create({ auth, levels, grades, classrooms, subjects, exam }) {
    const { data, setData, post, errors, reset } = useForm({
        name: exam.name || "",
        level_id: exam.level_id || "",
        grade_id: exam.grade_id || "",
        classroom_id: exam.classroom_id || "",
        subject_id: exam.subject_id || "",
        teacher_id: exam.teacher_id || "",

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
        post(route("exam.update", exam.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Create new Exam
                    </h2>
                </div>
            }
        >
            <Head title="Exmas" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                            <form
                                onSubmit={onSubmit}
                                className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
                            >
                                {/*-------------------------------------------------------  Level Info ------------------------------------------------------- */}
                                <div className="flex items-center justify-center text-xl font-medium text-gray-700 dark:text-gray-300">
                                    <hr className="flex-1 my-6 border-gray-300 dark:border-gray-700" />
                                    <span className="m-4">Level Info</span>
                                    <hr className="flex-1 -my-6 border-gray-300 dark:border-gray-700" />
                                </div>
                                <div className="grid grid-cols-3 gap-4 pt-0 md:grid-cols-5">
                                    {/*---------------------------- Name -------------------------------- */}

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

                                    {/*---------------------------- Grade -------------------------------- */}

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

                                    {/*---------------------------- Teacher -------------------------------- */}

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="teacher_id"
                                            value="Teacher Name"
                                        />
                                        <SelectInput
                                            name="teacher_id"
                                            className="block w-full mt-1"
                                            value={data.teacher_id}
                                            onChange={(e) =>
                                                setData(
                                                    "teacher_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Teacher
                                            </option>

                                            {subjects
                                                .filter(
                                                    (subject) =>
                                                        subject.grade_id ===
                                                        +data.grade_id
                                                )
                                                .filter(
                                                    (subject) =>
                                                        subject.level_id ===
                                                        +data.level_id
                                                )
                                                .map((subject) => (
                                                    <option
                                                        value={subject.id}
                                                        key={subject.id}
                                                    >
                                                        {subject.teacher_name}
                                                    </option>
                                                ))}
                                        </SelectInput>

                                        <InputError
                                            message={errors.teacher_id}
                                            className="mt-2"
                                        />
                                    </div>
                                    {/*---------------------------- Teacher's Subjects -------------------------------- */}

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="subject_id"
                                            value="Subject Name"
                                        />
                                        <SelectInput
                                            name="subject_id"
                                            className="block w-full mt-1"
                                            value={data.subject_id}
                                            onChange={(e) =>
                                                setData(
                                                    "subject_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Subject
                                            </option>

                                            {subjects
                                                .filter(
                                                    (subject) =>
                                                        subject.teacher_id ===
                                                        +data.teacher_id
                                                )

                                                .map((subject) => (
                                                    <option
                                                        value={subject.id}
                                                        key={subject.id}
                                                    >
                                                        {subject.subject_name}
                                                    </option>
                                                ))}
                                        </SelectInput>

                                        <InputError
                                            message={errors.teacher_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/*---------------------------- Classroom -------------------------------- */}

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
                                                .filter(
                                                    (classroom) =>
                                                        classroom.level_id ===
                                                        +data.level_id
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
                                </div>

                                {/*-------------------------------------------------------  Exam Info ------------------------------------------------------- */}

                                <div className="flex items-center justify-center text-xl font-medium text-gray-700 dark:text-gray-300">
                                    <hr className="flex-1 my-6 border-gray-300 dark:border-gray-700" />
                                    <span className="m-4">Exams Info</span>
                                    <hr className="flex-1 -my-6 border-gray-300 dark:border-gray-700" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
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
                                </div>
                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("exam.index")}
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
