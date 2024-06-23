import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import React, { useEffect } from "react";
export default function Attendance({ auth, students, taken, teacherId }) {
    const { data, setData, post, errors } = useForm({
        students: students.map((student) => ({
            id: student.id,
            name: student.name,
            level_id: student.level_id,
            level: student.level,
            grade_id: student.grade_id,
            grade: student.grade,
            classroom: student.classroom,
            classroom_id: student.classroom_id,
            teacher_id: teacherId,
            attendance: "",
            date: new Date().toISOString().split("T")[0],
        })),
    });

    // Check if attendance is already taken for today // this will disabled the form
    const isAttendanceTaken = taken.some(
        (entry) =>
            entry.attendence_date === new Date().toISOString().split("T")[0]
    );

    // UseEffect to update form data based on `taken` only once
    useEffect(() => {
        // Create a map of attendance records by student_id for quick lookup
        const attendanceMap = {};
        taken.forEach((entry) => {
            attendanceMap[entry.student_id] = entry.attendence_status === 1; // Convert 1/0 to true/false
        });

        // Update form data based on `taken`
        setData((prevData) => ({
            ...prevData,
            students: prevData.students.map((student) => ({
                ...student,
                attendance: attendanceMap[student.id] || false, // Set attendance if exists in `taken`
            })),
        }));
    }, [taken]); // Run this effect only when `taken` prop changes

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("student-attendances.store"));
    };

    const handleAttendanceChange = (studentId, status) => {
        setData({
            ...data,
            students: data.students.map((student) =>
                student.id === studentId
                    ? { ...student, attendance: status }
                    : student
            ),
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Attendance" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-gray-900 shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 bg-gray-900 shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
                        >
                            <div className="grid grid-cols-6 gap-6 mb-3">
                                <div className="col-span-6">
                                    <div
                                        id="date"
                                        className="p-2 mt-1 text-gray-300 bg-gray-700 border border-gray-600 rounded"
                                    >
                                        Date:{" "}
                                        {new Date().toISOString().split("T")[0]}
                                    </div>
                                </div>
                            </div>
                            <table className="min-w-full">
                                <thead className="bg-gray-800">
                                    <tr className="text-left text-gray-300">
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3">Level</th>
                                        <th className="px-6 py-3">Grade</th>
                                        <th className="px-6 py-3">Classroom</th>
                                        <th className="px-6 py-3">
                                            Attendance
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-gray-800 divide-y divide-gray-700">
                                    {data.students.map((student) => (
                                        <tr key={student.id}>
                                            <td className="px-6 py-4 text-gray-300 whitespace-nowrap">
                                                {student.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-300 whitespace-nowrap">
                                                {student.level}
                                                <TextInput
                                                    type="hidden"
                                                    name={`students[${student.id}][level]`}
                                                    value={student.level}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-gray-300 whitespace-nowrap">
                                                {student.grade}
                                                <TextInput
                                                    type="hidden"
                                                    name={`students[${student.id}][grade]`}
                                                    value={student.grade}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-gray-300 whitespace-nowrap">
                                                {student.classroom}
                                                <TextInput
                                                    type="hidden"
                                                    name={`students[${student.id}][classroom]`}
                                                    value={student.classroom}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-gray-300 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <label className="flex items-center text-gray-300">
                                                        <input
                                                            type="radio"
                                                            name={`students.${student.id}.attendance`}
                                                            value="true"
                                                            checked={
                                                                student.attendance ===
                                                                true
                                                            }
                                                            onChange={() =>
                                                                handleAttendanceChange(
                                                                    student.id,
                                                                    true
                                                                )
                                                            }
                                                            className="mr-2 text-gray-300 bg-gray-700 border-gray-600"
                                                            disabled={
                                                                isAttendanceTaken
                                                            }
                                                        />
                                                        Present
                                                    </label>
                                                    <label className="flex items-center ml-4 text-gray-300">
                                                        <input
                                                            type="radio"
                                                            name={`students.${student.id}.attendance`}
                                                            value="false"
                                                            checked={
                                                                student.attendance ===
                                                                false
                                                            }
                                                            onChange={() =>
                                                                handleAttendanceChange(
                                                                    student.id,
                                                                    false
                                                                )
                                                            }
                                                            className="mr-2 text-gray-300 bg-gray-700 border-gray-600"
                                                            disabled={
                                                                isAttendanceTaken
                                                            }
                                                        />
                                                        Absent
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="mt-2">
                                {Object.keys(errors).map((key) => (
                                    <div key={key}>
                                        <InputError message={errors[key]} />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 text-right">
                                <Link
                                    href={route("student-attendances.index")}
                                    className="px-3 py-1 mr-2 text-gray-300 transition-all bg-gray-700 rounded shadow hover:bg-gray-600"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className={`px-3 py-1 text-white transition-all rounded shadow ${
                                        isAttendanceTaken
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-emerald-500 hover:bg-emerald-600"
                                    }`}
                                    disabled={isAttendanceTaken}
                                >
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
