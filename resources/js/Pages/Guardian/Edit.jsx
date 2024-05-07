import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";



export default function Create({ auth, nationalities, guardian }) {
    const { data, setData, post, errors, reset } = useForm({
        email: guardian.email || "",
        password: guardian.password || "",

        name: guardian.name || "",
        passport_id: guardian.passport_id || "",
        phone: guardian.phone || "",
        job: guardian.job || "",
        national_id: guardian.national_id || "",
        address: guardian.address || "",


        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("guardian.update", guardian.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Create new Guardian
                    </h2>
                </div>
            }
        >
            <Head title="Gardian" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                        <form   onSubmit={onSubmit}
                            className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg">
                                    <div className="p-10 grid grid-cols-1 gap-4 md:grid-cols-2">
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
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
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
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
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
                                                    setData(
                                                        "phone",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.phone}
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Passport ID */}
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="passport_id"
                                                value="Passport ID"
                                            />
                                            <TextInput
                                                id="passport_id"
                                                type="text"
                                                name="passport_id"
                                                value={data.passport_id}
                                                className="block w-full mt-1"
                                                onChange={(e) =>
                                                    setData(
                                                        "passport_id",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors.passport_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Job */}
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="job"
                                                value="Job"
                                            />
                                            <TextInput
                                                id="job"
                                                type="text"
                                                name="job"
                                                value={data.job}
                                                className="block w-full mt-1"
                                                onChange={(e) =>
                                                    setData(
                                                        "job",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.job}
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
                                                            value={
                                                                nationality.id
                                                            }
                                                            key={nationality.id}
                                                        >
                                                            {nationality.name}
                                                        </option>
                                                    )
                                                )}
                                            </SelectInput>
                                            <InputError
                                                message={
                                                    errors.national_id
                                                }
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
                                    href={route("guardian.index")}
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
