import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";


export default function Create({ auth, levels,grades }) {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        amount: "",
        level_id: "",
        grade_id:"",
        year:"",
        type: "",

    });

    const currentYear = new Date().getFullYear() - 2;
    const numberOfYears = 5;
    const academicYears = [];

    for (let i = 0; i < numberOfYears; i++) {
        academicYears.push(currentYear + i);
    }

    const onSubmit = (e) => {

        e.preventDefault();
        post(route("fee.store"));
    };



    //--------------------------------------------------------Start Handel Fee Type -------------------------------------------


    const [feeType, setFeeType] = useState("existing");

    const handleFeeTypeChange = (e) => {
        setFeeType(e.target.value);
    };



    const renderLevelSection = () => {
        if (feeType === "specific") {
            return (
                <div className="grid grid-cols-1 gap-4 p-10 md:grid-cols-2">
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


                </div>
            );
        } else {
            return (
                <div>
                </div>
            );
        }
    };


    //-------------------------------------------------------- End Handel Fee Type -------------------------------------------


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Edit Fee
                    </h2>
                </div>
            }
        >
            <Head title="Fee" />
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
                                    <span className="m-4">Fee Info</span>
                                    <hr className="flex-1 -my-6 border-gray-300 dark:border-gray-700" />
                                </div>
                                <div className="grid grid-cols-1 gap-4 p-10 md:grid-cols-4">

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

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="amount"
                                            value="Amount"
                                        />
                                        <TextInput
                                            id="amount"
                                            type="text"
                                            name="amount"
                                            className="block w-full mt-1"
                                            onChange={(e) =>
                                                setData(
                                                    "amount",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.passport_id}
                                            className="mt-2"
                                        />

                                    </div>


                                    <div className="mt-4">
                        <InputLabel
                            htmlFor="year"
                            value="Academic Year"
                        />
                        <SelectInput
                            name="year"
                            className="block w-full mt-1"
                            onChange={(e) =>
                                setData(
                                    "year",
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
                            message={errors.year}
                            className="mt-2"
                        />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="type"
                                            value="Fee type"
                                        />
                                        <SelectInput
                                            name="type"
                                            className="block w-full mt-1"
                                            onChange={(e) => {
                                                setData("type", e.target.value);
                                                handleFeeTypeChange(e);
                                            }}
                                        >
                                                <option value="">
                                                Select
                                                </option>
                                                <option value='public' key='public'>
                                                Public
                                                </option>
                                                <option value='specific' key='specific'>
                                                Specific
                                                </option>

                                        </SelectInput>
                                        <InputError
                                            message={errors.type}
                                            className="mt-2"
                                        />

                                    </div>
                                </div>
                                {renderLevelSection()}


                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("fee.index")}
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
