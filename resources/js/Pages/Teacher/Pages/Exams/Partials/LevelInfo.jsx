import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import React, { useState, useEffect } from "react";

const LevelInfo = ({ setData, data, errors, teacher, classrooms }) => {
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [filteredClassrooms, setFilteredClassrooms] = useState([]);
    const [uniqueLevels, setUniqueLevels] = useState([]);

    useEffect(() => {
        // Filter subjects based on selected grade
        const filteredSubjects = teacher.subjects.filter(
            (subject) => subject.grade.id === parseInt(data.grade_id)
        );
        setFilteredSubjects(filteredSubjects);

        // Filter classrooms based on selected level and grade
        const filteredClassrooms = classrooms.filter(
            (classroom) =>
                classroom.level_id === parseInt(data.level_id) &&
                classroom.grade_id === parseInt(data.grade_id)
        );
        setFilteredClassrooms(filteredClassrooms);

        // Extract unique levels from teacher's subjects
        const uniqueLevelsMap = new Map();
        teacher.subjects.forEach((subject) => {
            if (!uniqueLevelsMap.has(subject.level.id)) {
                uniqueLevelsMap.set(subject.level.id, subject.level);
            }
        });
        const uniqueLevels = Array.from(uniqueLevelsMap.values());
        setUniqueLevels(uniqueLevels);
    }, [data.grade_id, data.level_id, teacher.subjects, classrooms]);

    return (
        <>
            <div className="flex items-center justify-center text-xl font-medium text-gray-700 dark:text-gray-300">
                <hr className="flex-1 my-6 border-gray-300 dark:border-gray-700" />
                <span className="m-4">Level Info</span>
                <hr className="flex-1 -my-6 border-gray-300 dark:border-gray-700" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <div className="my-4">
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="block w-full mt-1"
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-0 md:grid-cols-5">
                {/* Teacher */}
                <div className="mt-4">
                    <InputLabel htmlFor="teacher_id" value="Teacher Name" />
                    <SelectInput
                        name="teacher_id"
                        className="block w-full mt-1"
                        value={data.teacher_id}
                        onChange={(e) => setData("teacher_id", e.target.value)}
                    >
                        <option value="">Select Teacher</option>
                        <option value={teacher.id}>{teacher.name}</option>
                    </SelectInput>
                    <InputError message={errors.teacher_id} className="mt-2" />
                </div>

                {/* Level */}
                <div className="mt-4">
                    <InputLabel htmlFor="level_id" value="Level Name" />
                    <SelectInput
                        name="level_id"
                        className="block w-full mt-1"
                        value={data.level_id}
                        onChange={(e) => setData("level_id", e.target.value)}
                    >
                        <option value="">Select Level</option>
                        {uniqueLevels.map((level) => (
                            <option key={level.id} value={level.id}>
                                {level.name}
                            </option>
                        ))}
                    </SelectInput>
                    <InputError message={errors.level_id} className="mt-2" />
                </div>

                {/* Grade */}
                <div className="mt-4">
                    <InputLabel htmlFor="grade_id" value="Grade Name" />
                    <SelectInput
                        name="grade_id"
                        className="block w-full mt-1"
                        value={data.grade_id}
                        onChange={(e) => setData("grade_id", e.target.value)}
                    >
                        <option value="">Select Grade</option>
                        {teacher.subjects.map((subject) => (
                            <option
                                key={subject.grade.id}
                                value={subject.grade.id}
                            >
                                {subject.grade.name}
                            </option>
                        ))}
                    </SelectInput>
                    <InputError message={errors.grade_id} className="mt-2" />
                </div>

                {/* Teacher's Subjects */}
                <div className="mt-4">
                    <InputLabel htmlFor="subject_id" value="Subject Name" />
                    <SelectInput
                        name="subject_id"
                        value={data.subject_id}
                        className="block w-full mt-1"
                        onChange={(e) => setData("subject_id", e.target.value)}
                    >
                        <option value="">Select Subject</option>
                        {filteredSubjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                                {subject.specialization.Name}
                            </option>
                        ))}
                    </SelectInput>
                    <InputError message={errors.subject_id} className="mt-2" />
                </div>

                {/* Classroom */}
                <div className="mt-4">
                    <InputLabel htmlFor="classroom_id" value="Classroom Name" />
                    <SelectInput
                        name="classroom_id"
                        className="block w-full mt-1"
                        value={data.classroom_id}
                        onChange={(e) =>
                            setData("classroom_id", e.target.value)
                        }
                    >
                        <option value="">Select Classroom</option>
                        {filteredClassrooms.map((classroom) => (
                            <option key={classroom.id} value={classroom.id}>
                                {classroom.name}
                            </option>
                        ))}
                    </SelectInput>
                    <InputError
                        message={errors.classroom_id}
                        className="mt-2"
                    />
                </div>
            </div>
        </>
    );
};

export default LevelInfo;
