"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { getResultForScore, type Quiz, type QuizOption } from "@/data/quizzes";

type CSSVariableProperties = CSSProperties & Record<`--${string}`, string>;

type QuizRunnerProps = {
  quiz: Quiz;
};

export function QuizRunner({ quiz }: QuizRunnerProps) {
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = quiz.questions[answers.length];
  const progress = Math.round((answers.length / quiz.questions.length) * 100);
  const isComplete = answers.length === quiz.questions.length;

  const result = useMemo(() => {
    if (!isComplete) return null;
    const score = answers.reduce((total, answer) => total + answer, 0) / answers.length;
    return getResultForScore(quiz, score);
  }, [answers, isComplete, quiz]);

  function chooseOption(option: QuizOption) {
    if (selectedOption) return;

    setSelectedOption(option.id);
    window.setTimeout(() => {
      setAnswers((current) => [...current, option.value]);
      setSelectedOption(null);
    }, 260);
  }

  function restart() {
    setAnswers([]);
    setSelectedOption(null);
  }

  if (result) {
    return (
      <section className="test-shell result-shell" aria-live="polite">
        <div className="result-card" style={{ "--result-accent": result.accent } as CSSVariableProperties}>
          <div className="result-visual">
            <span>{quiz.kind === "trivia" ? "Nivel" : quiz.kind === "challenge" ? "Reto" : "Resultado"}</span>
            <strong>{result.scoreLabel}</strong>
          </div>
          <div className="result-ribbon">ViralQuiz</div>
        </div>
        <div className="result-copy">
          <p className="section-kicker">Resultado</p>
          <h1>{result.title}</h1>
          <p>{result.summary}</p>
          <div className="result-tags" aria-label="Resumen del resultado">
            <span>Visual</span>
            <span>Compartible</span>
            <span>{quiz.duration}</span>
          </div>
          <p className="test-note">{quiz.note}</p>
          <button className="button" type="button" onClick={restart}>
            Repetir test
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="test-shell">
      <div className="test-topline">
        <span>
          Pregunta {answers.length + 1} de {quiz.questions.length}
        </span>
        <div className="progress-track" aria-hidden="true">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="question-block">
        <p className="section-kicker">{quiz.title}</p>
        <h1>{currentQuestion.prompt}</h1>
        <p className="test-note">{quiz.note}</p>
      </div>

      <div className="answer-grid">
        {currentQuestion.options.map((option, index) => (
          <button
            className={`answer-button ${selectedOption === option.id ? "is-selected" : ""}`}
            key={option.id}
            type="button"
            onClick={() => chooseOption(option)}
          >
            <span className="answer-index">{String.fromCharCode(65 + index)}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
