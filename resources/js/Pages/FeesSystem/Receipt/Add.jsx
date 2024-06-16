import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Add({
    auth,
    student,
}) {
    const { data, setData, post, errors, reset } = useForm({
        student_id: student.id,
        debit: "",
        description: "",
    });

    //SubmitForm
    const onSubmit = (e) => {
        e.preventDefault();

        post(route("receipt-student.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Add Received Money To {student.name}
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
                                    <span className="m-4">
                                        Add Received Money To {student.name}
                                    </span>
                                    <hr className="flex-1 -my-6 border-gray-300 dark:border-gray-700" />
                                </div>

                                <TextInput
                                    type="hidden"
                                    name="student_id"
                                    value={data.student_id}
                                />

                                <div className="grid grid-cols-1 gap-4 p-10 pt-0 md:grid-cols-2">
                                    <div className="p-10 pt-0 mt-4">
                                        <InputLabel
                                            htmlFor="debit"
                                            value="Amount"
                                        />
                                        <TextInput
                                            id="debit"
                                            type="debit"
                                            name="debit"
                                            value={data.debit}
                                            className="block w-full p-1 mt-1"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("debit", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.debit}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="p-10 pt-0 mt-4">
                                        <InputLabel
                                            htmlFor="description"
                                            value="Description"
                                        />
                                        <TextInput
                                            id="description"
                                            type="description"
                                            name="description"
                                            value={data.description}
                                            className="block w-full p-1 mt-1"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.description}
                                            className="mt-2"
                                        />
                                    </div>
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
