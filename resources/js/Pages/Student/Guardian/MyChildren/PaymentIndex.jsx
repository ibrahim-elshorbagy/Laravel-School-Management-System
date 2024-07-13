import { Tab } from "@headlessui/react";
import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth, MyChildren }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        My Children
                    </h2>
                </div>
            }
        >
            <Head title="My Children Payments" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 overflow-x-auto text-gray-900 dark:text-gray-100">
                            <Tab.Group>
                                <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                                    <Tab
                                        className={({ selected }) =>
                                            selected
                                                ? "bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 rounded-lg py-2.5 px-4 text-sm font-medium leading-5"
                                                : "text-blue-100 hover:bg-white/[0.12] hover:text-white dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg py-2.5 px-4 text-sm font-medium leading-5"
                                        }
                                    >
                                        All Payments
                                    </Tab>
                                    <Tab
                                        className={({ selected }) =>
                                            selected
                                                ? "bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 rounded-lg py-2.5 px-4 text-sm font-medium leading-5"
                                                : "text-blue-100 hover:bg-white/[0.12] hover:text-white dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg py-2.5 px-4 text-sm font-medium leading-5"
                                        }
                                    >
                                        New Payments
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels className="mt-2">
                                    <Tab.Panel className="p-3 bg-white dark:bg-gray-800 rounded-xl">
                                        <AllPaymentsTable
                                            MyChildren={MyChildren}
                                        />
                                    </Tab.Panel>
                                    <Tab.Panel className="p-3 bg-white dark:bg-gray-800 rounded-xl">
                                        <NewPaymentsTable
                                            MyChildren={MyChildren}
                                        />
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                            <Pagination links={MyChildren.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function AllPaymentsTable({ MyChildren }) {
    return (
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-gray-700 border-b-2 border-gray-500 text-l bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Academic Year</th>
                    <th className="px-3 py-2 text-center">Type</th>
                    <th className="px-3 py-2 text-center">Debit</th>
                    <th className="px-3 py-2 text-center">Credit</th>
                    <th className="px-3 py-2 text-center">Date</th>
                </tr>
            </thead>
            <tbody>
                {MyChildren.data.map((child) =>
                    child.studentFees.map((fee) => (
                        <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            key={fee.id}
                        >
                            <td className="px-3 py-2">{child.name}</td>
                            <td className="px-3 py-2">{child.academic_year}</td>
                            <td className="px-3 py-2 text-center">
                                {fee.type}
                            </td>
                            <td className="px-3 py-2 text-center">
                                {fee.debit}
                            </td>
                            <td className="px-3 py-2 text-center">
                                {fee.credit}
                            </td>
                            <td className="px-3 py-2 text-center">
                                {fee.created_at}
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}

function NewPaymentsTable({ MyChildren }) {
    return (
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-gray-700 border-b-2 border-gray-500 text-l bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Academic Year</th>
                    <th className="px-3 py-2 text-center">Type</th>
                    <th className="px-3 py-2 text-center">Debit</th>
                    <th className="px-3 py-2 text-center">Credit</th>
                    <th className="px-3 py-2 text-center">Date</th>
                    <th className="px-3 py-2 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {MyChildren.data.map((child) =>
                    child.studentFees
                        .filter((fee) => fee.credit === "0.00") // Filter for new payments
                        .map((fee) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                key={fee.id}
                            >
                                <td className="px-3 py-2">{child.name}</td>
                                <td className="px-3 py-2">
                                    {child.academic_year}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    {fee.type}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    {fee.debit}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    {fee.credit}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    {fee.created_at}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    {fee.paid ? (
                                        <span className="px-4 py-2 font-semibold text-green-600 bg-green-100 rounded">
                                            Paid
                                        </span>
                                    ) : (
                                        <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
                                            Pay
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                )}
            </tbody>
        </table>
    );
}

