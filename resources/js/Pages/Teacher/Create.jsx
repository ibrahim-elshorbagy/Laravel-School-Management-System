import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";



export default function Create({ auth, specializations ,levels }) {
    const { data, setData, post, errors, reset } = useForm({
        email: "",
        password: "",
        name: "",
        address: "",
        specialization_id: "",
        gender: ""



    });

    const onSubmit = (e) => {

        e.preventDefault();
        post(route("teacher.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Create new Teacher
                    </h2>
                </div>
            }
        >
            <Head title="Teacher" />

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
                                    <span className="m-4">Teacher Info</span>
                                    <hr className="flex-1 -my-6 border-gray-300 dark:border-gray-700" />
                                </div>
                                <div className="grid grid-cols-1 gap-4 p-10 md:grid-cols-2">
                                    <div className="mt-4">
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
                                    <div className="mt-4">
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
                                            {specializations.map(
                                                (specialization) => (
                                                    <option
                                                        value={
                                                            specialization.id
                                                        }
                                                        key={specialization.id}
                                                    >
                                                        {specialization.name}
                                                    </option>
                                                )
                                            )}
                                        </SelectInput>
                                        <InputError
                                            message={errors.specialization_id}
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
                                    {/* Level */}
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="level"
                                            value="Level"
                                        />
                                        <SelectInput
                                            name="level"
                                            className="block w-full mt-1"
                                            onChange={(e) =>
                                                setData("level_id", e.target.value)
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
                                            message={errors.level}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Address */}
                                </div>
                                <div className="p-10 pt-0 mt-4">
                                    <InputLabel
                                        htmlFor="address"
                                        value="Address"
                                    />
                                    <TextInput
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        className="block w-full mt-1"
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.address}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("teacher.index")}
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
