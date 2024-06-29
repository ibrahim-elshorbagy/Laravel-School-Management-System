import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function AttendExam({ auth, exam }) {
    const { data, setData, post, errors } = useForm({
        exam_id: exam.id,
        answers: {},
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("MyExam.store"));
    };

    const handleAnswerChange = (questionId, answerId) => {
        setData("answers", { ...data.answers, [questionId]: answerId });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Attend Exam
                    </h2>
                </div>
            }
        >
            <Head title="Attend Exam" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800 dark:text-gray-100">
                            <h3 className="mb-4 text-lg font-semibold">
                                {exam.name}
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <TextInput
                                    type="hidden"
                                    name="exam_id"
                                    value={data.exam_id}
                                />
                                {exam.questions.map((question, index) => (
                                    <div key={question.id} className="mb-6">
                                        <h4 className="mb-2">
                                            {index + 1}. {question.question}
                                        </h4>
                                        {question.answers.map((answer) => (
                                            <div
                                                key={answer.id}
                                                className="flex items-center mb-2"
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question_${question.id}`}
                                                    value={answer.id}
                                                    id={`answer_${answer.id}`}
                                                    className="mr-2"
                                                    onChange={() =>
                                                        handleAnswerChange(
                                                            question.id,
                                                            answer.id
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={`answer_${answer.id}`}
                                                >
                                                    {answer.answer}
                                                </label>
                                            </div>
                                        ))}
                                        {errors[`question_${question.id}`] && (
                                            <div className="text-sm text-red-500">
                                                {
                                                    errors[
                                                        `question_${question.id}`
                                                    ]
                                                }
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="text-right">
                                    <button
                                        type="submit"
                                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                                    >
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
