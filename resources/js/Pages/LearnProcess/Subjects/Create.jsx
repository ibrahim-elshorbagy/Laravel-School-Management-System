import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import MultiSelectInput from "@/Components/MultiSelectInput";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ auth, levels, grades, teachers, specializations }) {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        level_id: "",
        grade_id: "",
        teacher_id: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("subject.store"));
    };
    const [filteredTeachers, setFilteredTeachers] = useState([]);

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
                        Create new Subject
                    </h2>
                </div>
            }
        >
            <Head title="Subject" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
                        >
                            <div className="flex items-center justify-center text-xl font-medium text-gray-700 dark:text-gray-300">
                                <hr className="flex-1 my-6 border-gray-300 dark:border-gray-700" />
                                <span className="m-4">Subject Info</span>
                                <hr className="flex-1 -my-6 border-gray-300 dark:border-gray-700" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="level_id"
                                        value="Level Name"
                                    />
                                    <SelectInput
                                        name="level_id"
                                        className="block w-full mt-1"
                                        onChange={handleLevelChange}
                                    >
                                        <option value="">Select Level</option>
                                        {levels.data.map((level) => (
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
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="teacher_id"
                                    value="Select Teachers"
                                />
                                <SelectInput
                                    name="teacher_id"
                                    className="block w-full mt-1 "
                                    onChange={(e) =>
                                        setData("teacher_id", e.target.value)
                                    }
                                >
                                    <option value="">Select Teacher</option>
                                    {filteredTeachers.map((teacher) => (
                                        <option
                                            value={teacher.id}
                                            key={teacher.id}
                                        >
                                            {teacher.name} -{" "}
                                            {teacher.specialization}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.teacher_id}
                                    className="mt-2"
                                />
                            </div>

                            {/* Specialization */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="specialization_id"
                                    value="Specialization"
                                />
                                <SelectInput
                                    name="specialization_id"
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData(
                                            "specialization_id",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Select Specialization
                                    </option>
                                    {specializations.map((specialization) => (
                                        <option
                                            value={specialization.id}
                                            key={specialization.id}
                                        >
                                            {specialization.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    message={errors.specialization_id}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 text-right">
                                <Link
                                    href={route("subject.index")}
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
