import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import MultiSelectInput from "@/Components/MultiSelectInput";
import TextInput from "@/Components/TextInput";

export default function Create({ auth, classroom, levels, grades, teachers ,SelectedTeachers}) {
    const { data, setData, post, errors, reset } = useForm({
        name: classroom.name || "",
        level_id: classroom.level_id || "",
        grade_id: classroom.grade_id || "",
        status: classroom.status || "",
        teacher_id: SelectedTeachers || [],
        _method: "PUT",
    });

    const [filteredTeachers, setFilteredTeachers] = useState(teachers);

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("classroom.update", classroom.id));
    };

        const handleLevelChange = (e) => {
            setData("level_id", e.target.value);

            const filtered = teachers.filter(
                (teacher) => teacher.level_id == e.target.value
            );
            setFilteredTeachers(filtered);
        };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Edit Classroom
                    </h2>
                </div>
            }
        >
            <Head title="Classroom" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">

                        <form
                            onSubmit={onSubmit}
                            className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
                        >
                            <div className="flex items-center justify-center text-xl font-medium text-gray-700 dark:text-gray-300">
                                <hr className="flex-1 my-6 border-gray-300 dark:border-gray-700" />
                                <span className="m-4">Classroom Info</span>
                                <hr className="flex-1 -my-6 border-gray-300 dark:border-gray-700" />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="level_id"
                                    value="Level Name"
                                />
                                <SelectInput
                                    name="level_id"
                                    className="block w-full mt-1"
                                    value={data.level_id}
                                    onChange={handleLevelChange}
                                >
                                    <option value="">Select Level</option>
                                    {levels.data.map((level) => (
                                        <option value={level.id} key={level.id}>
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
                                        setData("grade_id", e.target.value)
                                    }
                                >
                                    <option value="">Select Grade</option>
                                    {grades
                                        .filter(
                                            (grade) =>
                                                grade.level_id ===
                                                +data.level_id
                                        )
                                        .map((grade) => (
                                            <option
                                                value={grade.id}
                                                key={"grade" + grade.id}
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
                                    htmlFor="classroom_name"
                                    value="Classroom Name"
                                />

                                <TextInput
                                    id="classroom_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="block w-full mt-1"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="classroom_status"
                                    value="Classroom Status"
                                />

                                <SelectInput
                                    name="status"
                                    id="classroom_status"
                                    className="block w-full mt-1"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="active">active</option>
                                    <option value="inactive">inactive</option>
                                    <option value="under_maintenance">
                                        Under Maintenance
                                    </option>
                                </SelectInput>

                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="teacher_id"
                                    value="Select Teachers"
                                />
                                <MultiSelectInput
                                    name="teacher_id"
                                    className="block w-full mt-1"
                                    value={data.teacher_id}
                                    onChange={(e) =>
                                        setData(
                                            "teacher_id",
                                            Array.from(
                                                e.target.selectedOptions,
                                                (option) => option.value
                                            )
                                        )
                                    }
                                >
                                    {filteredTeachers.map((teacher) => (
                                        <option
                                            value={teacher.id}
                                            key={teacher.id}
                                        >
                                            {teacher.name} -{" "}
                                            {teacher.specialization}
                                        </option>
                                    ))}
                                </MultiSelectInput>
                                <InputError
                                    message={errors.teacher_id}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 text-right">
                                <Link
                                    href={route("classroom.index")}
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
        </AuthenticatedLayout>
    );
}
