import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

export default function Dashboard({ auth, MyChildren }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Hello {auth.user.name},
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-12">
                <div className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 ">
                    {MyChildren.data.map((child) => (
                        <div
                            key={child.id}
                            className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
                        >
                            <img
                                src={
                                    child.image_path
                                        ? child.image_path
                                        : "/storage/student/default-image.png"
                                }
                                alt={child.name}
                                className="object-cover w-full h-96"
                            />
                            <div className="p-4">
                                <p className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                                    {child.name}
                                </p>
                                <p className="text-base text-gray-700 dark:text-gray-300">
                                    {child.email}
                                </p>
                                <p className="text-base text-gray-700 dark:text-gray-300">
                                    {child.level}, {child.grade},{" "}
                                    {child.classroom}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {MyChildren.meta.total > 9 && (
                    <Pagination links={MyChildren.meta.links} />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
