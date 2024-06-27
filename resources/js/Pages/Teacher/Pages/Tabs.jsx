import { Tab } from "@headlessui/react";

export default function Tabs({ students, classroomInfo }) {

    const groupedStudents = classroomInfo.map((classroom) => ({
        ...classroom,
        students: students.data.filter(
            (student) =>
                student.classroom === classroom.name &&
                student.level === classroom.level &&
                student.grade === classroom.grade
        ),
    }));

    return (
        <div className="w-full p-10 my-5 bg-gray-900 max-w-7xl sm:px-0 sm:rounded-lg">
            <div className="p-5">
                <Tab.Group>
                    <Tab.List className="flex p-1 space-x-1 bg-gray-800 rounded-xl">
                        {groupedStudents.map((classroom, index) => (
                            <Tab
                                key={index}
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-gray-600 ring-offset-2 ring-offset-gray-800 focus:outline-none focus:ring-2 ${
                                        selected
                                            ? "bg-gray-700 text-gray-200 shadow"
                                            : "text-gray-400 hover:bg-gray-700/[0.12] hover:text-gray-200"
                                    }`
                                }
                            >
                                {classroom.level} - {classroom.grade} -{" "}
                                {classroom.name}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        {groupedStudents.map((classroom, idx) => (
                            <Tab.Panel
                                key={idx}
                                className="p-3 bg-gray-800 rounded-xl ring-gray-600 ring-offset-2 ring-offset-gray-800 focus:outline-none focus:ring-2"
                            >
                                <ul>
                                    {classroom.students.length > 0 ? (
                                        classroom.students.map((student) => (
                                            <li
                                                key={student.id}
                                                className="relative p-3 rounded-md hover:bg-gray-700"
                                            >
                                                <h3 className="text-sm font-medium leading-5 text-gray-200">
                                                    {student.name}
                                                </h3>
                                                <p className="text-xs font-normal leading-4 text-gray-500">
                                                    {student.email}
                                                </p>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-400">
                                            No students in this classroom
                                        </li>
                                    )}
                                </ul>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
}
