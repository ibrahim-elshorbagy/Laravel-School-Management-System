import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({auth}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Teacher Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">

            </div>
        </AuthenticatedLayout>
    );
}
