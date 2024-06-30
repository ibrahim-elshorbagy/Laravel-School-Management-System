import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Hello {auth.user.name}
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="p-12 mx-auto bg-white shadow-sm max-w-7xl sm:px-6 lg:px-8 dark:bg-gray-800 sm:rounded-lg">
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
