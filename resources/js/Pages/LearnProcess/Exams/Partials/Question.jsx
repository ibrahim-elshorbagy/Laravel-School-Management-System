import React, { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

const Question = ({ setData, data, errors, exam }) => {
    useEffect(() => {
        if (exam) {
            console.log("Exam Data:", exam); // Log exam data
            setData((prevData) => ({
                ...prevData,
                questions: exam.questions.map((q) => ({
                    question: q.question,
                    answers: q.answers.map((a) => ({
                        text: a.answer,
                        isCorrect: a.correct_answer === 1, // Ensure boolean conversion
                    })),
                })),
            }));
        }
    }, [exam]);

    useEffect(() => {
        console.log("Data State:", data); // Log data state after initialization
    }, [data]);

    const handleInputChange = (questionIndex, answerIndex, key, value) => {
        const updatedQuestions = [...data.questions];
        updatedQuestions[questionIndex].answers[answerIndex][key] = value;
        setData({ ...data, questions: updatedQuestions });
    };

    const handleQuestionChange = (questionIndex, value) => {
        const updatedQuestions = [...data.questions];
        updatedQuestions[questionIndex].question = value;
        setData({ ...data, questions: updatedQuestions });
    };

    const addAnswer = (questionIndex) => {
        const updatedQuestions = [...data.questions];
        updatedQuestions[questionIndex].answers.push({
            text: "",
            isCorrect: false,
        });
        setData({ ...data, questions: updatedQuestions });
    };

    const deleteAnswer = (questionIndex, answerIndex) => {
        const updatedQuestions = [...data.questions];
        updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
        setData({ ...data, questions: updatedQuestions });
    };

    const addQuestion = () => {
        setData({
            ...data,
            questions: [
                ...data.questions,
                { question: "", answers: [{ text: "", isCorrect: false }] },
            ],
        });
    };

    const deleteQuestion = (questionIndex) => {
        const updatedQuestions = [...data.questions];
        updatedQuestions.splice(questionIndex, 1);
        setData({ ...data, questions: updatedQuestions });
    };

    return (
        <>
            <div className="flex items-center justify-center text-xl font-medium text-gray-700 dark:text-gray-300">
                <hr className="flex-1 my-6 border-gray-300 dark:border-gray-700" />
                <span className="m-4">Questions</span>
                <hr className="flex-1 -my-6 border-gray-300 dark:border-gray-700" />
            </div>
            <div className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg">
                {data.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="mt-8">
                        <InputLabel
                            htmlFor={`question-${questionIndex}`}
                            value={`Question ${questionIndex + 1}:`}
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        />
                        <TextInput
                            id={`question-${questionIndex}`}
                            type="text"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={question.question}
                            onChange={(e) =>
                                handleQuestionChange(
                                    questionIndex,
                                    e.target.value
                                )
                            }
                        />
                        <div className="mt-2 space-y-2">
                            <InputLabel
                                value="Answers:"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            />
                            {question.answers.map((answer, answerIndex) => (
                                <div
                                    key={answerIndex}
                                    className="flex items-center space-x-2"
                                >
                                    <TextInput
                                        type="text"
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={answer.text}
                                        onChange={(e) =>
                                            handleInputChange(
                                                questionIndex,
                                                answerIndex,
                                                "text",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 form-checkbox focus:ring-blue-500"
                                            checked={answer.isCorrect}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    questionIndex,
                                                    answerIndex,
                                                    "isCorrect",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <span className="ml-2 text-sm text-white">
                                            Correct
                                        </span>
                                    </label>
                                    <button
                                        type="button"
                                        className="ml-2 text-sm text-red-600 focus:outline-none"
                                        onClick={() =>
                                            deleteAnswer(
                                                questionIndex,
                                                answerIndex
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={() => addAnswer(questionIndex)}
                            >
                                Add Answer
                            </button>
                        </div>
                        <InputError
                            message={
                                errors[`questions.${questionIndex}.question`]
                            }
                            className="mt-2"
                        />
                        <button
                            type="button"
                            className="mt-2 text-sm text-red-600 focus:outline-none"
                            onClick={() => deleteQuestion(questionIndex)}
                        >
                            Delete Question
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={addQuestion}
                >
                    Add Question
                </button>
            </div>
        </>
    );
};

export default Question;
