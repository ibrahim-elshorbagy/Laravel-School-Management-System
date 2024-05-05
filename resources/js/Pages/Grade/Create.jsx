import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth ,levels}) {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        level_id: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("grade.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Create new Grade
                    </h2>
                </div>
            }
        >
            <Head title="Grades" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
                        >
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="grade_name"
                                    value="Grade Name"
                                />

                                <TextInput
                                    id="grade_name"
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
                                    htmlFor="level_id"
                                    value="Level Name"
                                />
                                <SelectInput
                                    name="level_id"
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("level_id", e.target.value)
                                    }
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

                            <div className="mt-4 text-right">
                                <Link
                                    href={route("grade.index")}
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
