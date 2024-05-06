import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";

export default function Create({ auth, nationalities, parents }) {
    const { data, setData, post, errors, reset } = useForm({
        email: parents.email || "",
        password: parents.password || "",

        name_father: parents.name_father || "",
        passport_id_father: parents.passport_id_father || "",
        phone_father: parents.phone_father || "",
        job_father: parents.job_father || "",
        national_id_father: parents.national_id_father || "",
        address_father: parents.address_father || "",

        name_mother: parents.name_mother || "",
        passport_id_mother: parents.passport_id_mother || "",
        phone_mother: parents.phone_mother || "",
        job_mother: parents.job_mother || "",
        national_id_mother: parents.national_id_mother || "",
        address_mother: parents.address_mother || "",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        post(route("parents.update", parents.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Create new Parents
                    </h2>
                </div>
            }
        >
            <Head title="Parentss" />
            {JSON.stringify(parents)}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                            <FormWizard
                                shape="circle"
                                color="#07e29e"
                                onComplete={onSubmit}
                            >
                                <FormWizard.TabContent
                                    title="Father's Info"
                                    icon="ti-user"
                                >
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

                                        {/* Father's Name */}
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="name_father"
                                                value="Father's Name"
                                            />
                                            <TextInput
                                                id="name_father"
                                                type="text"
                                                name="name_father"
                                                value={data.name_father}
                                                className="block w-full mt-1"
                                                onChange={(e) =>
                                                    setData(
                                                        "name_father",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.name_father}
                                                className="mt-2"
                                            />
                                        </div>
                                        {/* Father's Phone */}
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="phone_father"
                                                value="Father's Phone"
                                            />
                                            <TextInput
                                                id="phone_father"
                                                type="tel"
                                                name="phone_father"
                                                value={data.phone_father}
                                                className="block w-full mt-1"
                                                onChange={(e) =>
                                                    setData(
                                                        "phone_father",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.phone_father}
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Father's Passport ID */}
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="passport_id_father"
                                                value="Father's Passport ID"
                                            />
                                            <TextInput
                                                id="passport_id_father"
                                                type="text"
                                                name="passport_id_father"
                                                value={data.passport_id_father}
                                                className="block w-full mt-1"
                                                onChange={(e) =>
                                                    setData(
                                                        "passport_id_father",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors.passport_id_father
                                                }
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Father's Job */}
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="job_father"
                                                value="Father's Job"
                                            />
                                            <TextInput
                                                id="job_father"
                                                type="text"
                                                name="job_father"
                                                value={data.job_father}
                                                className="block w-full mt-1"
                                                onChange={(e) =>
                                                    setData(
                                                        "job_father",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.job_father}
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Father's nationality */}
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="national_id_father"
                                                value="Father's Nationality"
                                            />
                                            <SelectInput
                                                name="national_id_father"
                                                className="block w-full mt-1"
                                                onChange={(e) =>
                                                    setData(
                                                        "national_id_father",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Select Level
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
                                                    errors.national_id_father
                                                }
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Father's Address */}
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="address_father"
                                                value="Father's Address"
                                            />
                                            <TextInput
                                                id="address_father"
                                                type="text"
                                                name="address_father"
                                                value={data.address_father}
                                                className="block w-full mt-1"
                                                onChange={(e) =>
                                                    setData(
                                                        "address_father",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.address_father}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </FormWizard.TabContent>
                                <FormWizard.TabContent
                                    className="text-white"
                                    title="Mother's Info"
                                    icon="ti-user"
                                >
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {/* Mother's Name */}
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="name_mother"
                                                value="Mother's Name"
                                            />
                                            <TextInput
                                                id="name_mother"
                                                type="text"
                                                name="name_mother"
                                                value={data.name_mother}
                                                className="block w-full mt-1"
                                                onChange={(e) =>
                                                    setData(
                                                        "name_mother",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.name_mother}
                                                className="mt-2"
                                            />
                                        </div>
                                        {/* Mother's Phone */}
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="phone_mother"
                                                value="Mother's Phone"
                                            />
                                            <TextInput
                                                id="phone_mother"
                                                type="tel"
                                                name="phone_mother"
                                                value={data.phone_mother}
                                                className="block w-full mt-1"
                                                onChange={(e) =>
                                                    setData(
                                                        "phone_mother",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.phone_mother}
                                                className="mt-2"
                                            />
                                        </div>
                                        {/* Mother's Passport ID */}
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="passport_id_mother"
                                                value="Mother's Passport ID"
                                            />
                                            <TextInput
                                                id="passport_id_mother"
                                                type="text"
                                                name="passport_id_mother"
                                                value={data.passport_id_mother}
                                                className="block w-full mt-1"
                                                onChange={(e) =>
                                                    setData(
                                                        "passport_id_mother",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors.passport_id_mother
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        {/* Mother's Job */}
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="job_mother"
                                                value="Mother's Job"
                                            />
                                            <TextInput
                                                id="job_mother"
                                                type="text"
                                                name="job_mother"
                                                value={data.job_mother}
                                                className="block w-full mt-1"
                                                onChange={(e) =>
                                                    setData(
                                                        "job_mother",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.job_mother}
                                                className="mt-2"
                                            />
                                        </div>
                                        {/* Mother's nationality*/}
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="national_id_mother"
                                                value="Mother's Nationality"
                                            />
                                            <SelectInput
                                                name="national_id_mother"
                                                className="block w-full mt-1"
                                                onChange={(e) =>
                                                    setData(
                                                        "national_id_mother",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Select Level
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
                                                    errors.national_id_mother
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        {/* Mother's Address */}
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="address_mother"
                                                value="Mother's Address"
                                            />
                                            <TextInput
                                                id="address_mother"
                                                type="text"
                                                name="address_mother"
                                                value={data.address_mother}
                                                className="block w-full mt-1"
                                                onChange={(e) =>
                                                    setData(
                                                        "address_mother",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.address_mother}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </FormWizard.TabContent>
                            </FormWizard>
                        </div>
                        {/* add style */}

                        <style>{`
        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
