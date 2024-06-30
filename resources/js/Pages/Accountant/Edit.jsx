import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";



export default function Create({ auth, levels, accountant }) {
    const { data, setData, post, errors, reset } = useForm({
        email: accountant.user.email || "",
        password: accountant.user.password || "",
        name: accountant.user.name || "",

        phone: accountant.phone || "",
        job: accountant.job || "",
        level_id: accountant.level_id || "",
        address: accountant.address || "",

        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("accountant.update", accountant.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Create new accountant
                    </h2>
                </div>
            }
        >
            <Head title="Gardian" />
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
                                    <span className="m-4">accountant Info</span>
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
                                    {/* Phone */}
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="phone"
                                            value="Phone"
                                        />
                                        <TextInput
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            value={data.phone}
                                            className="block w-full mt-1"
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.phone}
                                            className="mt-2"
                                        />
                                    </div>


                                    {/* level */}
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="level_id"
                                            value="level"
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
                                                Select level
                                            </option>
                                            {levels.map(
                                                (level) => (
                                                    <option
                                                        value={level.id}
                                                        key={level.id}
                                                    >
                                                        {level.name}
                                                    </option>
                                                )
                                            )}
                                        </SelectInput>
                                        <InputError
                                            message={errors.level_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div className="mt-4">
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
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.address}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("accountant.index")}
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
