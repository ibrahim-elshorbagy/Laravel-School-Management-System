    import InputError from "@/Components/InputError";
    import InputLabel from "@/Components/InputLabel";
    import SelectInput from "@/Components/SelectInput";
    import TextInput from "@/Components/TextInput";
    import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
    import { Head, Link, useForm } from "@inertiajs/react";
    import React, { useState } from "react";

    import Question from "./Partials/Question";
    import LevelInfo from "./Partials/LevelInfo";

        export default function Create({ auth, levels, grades, classrooms, subjects }) {
        const { data, setData, post, errors, reset } = useForm({
            name: "",
            level_id: "",
            grade_id: "",
            classroom_id: "",
            subject_id: "",
            teacher_id: "",
            questions: [{ question: '', answers: [{ text: '', isCorrect: false }] }],
        });

        // SubmitForm
        const onSubmit = (e) => {
            e.preventDefault();
            post(route("exam.store"));
        };

        const addQuestion = () => {
            setData({
            ...data,
            questions: [...data.questions, { question: '', answers: [{ text: '', isCorrect: false }] }],
            });
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
            <Head title="Exams" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                    <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                    <form
                        onSubmit={onSubmit}
                        className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
                    >
                                {/* Level Info */}
                    <LevelInfo setData={setData} data={data} errors={errors} levels={levels} grades={grades} classrooms={classrooms} subjects={subjects}/>

                    {/* Questions */}

                    <Question setData={setData} data={data} errors={errors} />


                    <div className="mt-4 text-right">
                        <Link
                            href={route("exam.index")}
                            className="px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                        >
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
