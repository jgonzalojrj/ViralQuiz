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

  const resultState = useMemo(() => {
    if (!isComplete) return null;
    const totalScore = answers.reduce((total, answer) => total + answer, 0);
    const averageScore = totalScore / answers.length;

    return {
      result: getResultForScore(quiz, quiz.kind === "trivia" ? totalScore : averageScore),
      totalScore
    };
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

  if (resultState) {
    const { result, totalScore } = resultState;
    const isTrivia = quiz.kind === "trivia";
    const visualLabel = isTrivia ? "Aciertos" : quiz.kind === "challenge" ? "Reto" : "Resultado";
    const scoreLabel = isTrivia ? `${totalScore}/${quiz.questions.length}` : result.scoreLabel;
    const resultEyebrow = isTrivia ? "Marcador final" : quiz.kind === "challenge" ? "Tu reto" : "Tu resultado";
    const reasonTitle = isTrivia ? "Lectura del marcador" : "Por que te ha salido esto";
    const tags = isTrivia
      ? [`${totalScore} aciertos`, result.scoreLabel, "Listo para compartir"]
      : [result.scoreLabel, quiz.kind === "challenge" ? "Reto rapido" : "Tu estilo", quiz.duration];

    return (
      <section className={`test-shell result-shell result-${quiz.kind}`} aria-live="polite">
        <div className="result-card" style={{ "--result-accent": result.accent } as CSSVariableProperties}>
          <div className="result-card-mark">{resultEyebrow}</div>
          <div className="result-visual">
            <span>{visualLabel}</span>
            <strong>{scoreLabel}</strong>
          </div>
          <div className="result-ribbon">ViralQuiz</div>
        </div>
        <div className="result-copy">
          <p className="section-kicker">{resultEyebrow}</p>
          <h1>{result.title}</h1>
          <p className="result-subtitle">{result.subtitle}</p>
          <p>{result.summary}</p>
          <div className="result-reason">
            <span>{reasonTitle}</span>
            <p>{result.reason}</p>
          </div>
          <div className="result-tags" aria-label="Resumen del resultado">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p className="test-note">{quiz.note}</p>
          <div className="result-actions">
            <button className="button" type="button" onClick={restart}>
              Repetir test
            </button>
          </div>
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
