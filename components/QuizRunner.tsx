"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { getResultForScore, type Quiz, type QuizFigure, type QuizOption, type QuizQuestion, type QuizVisual } from "@/data/quizzes";

type CSSVariableProperties = CSSProperties & Record<`--${string}`, string>;

type QuizRunnerProps = {
  quiz: Quiz;
};

const difficultyLabels: Record<NonNullable<QuizQuestion["difficulty"]>, string> = {
  facil: "Facil",
  medio: "Medio",
  dificil: "Dificil",
  avanzado: "Avanzado"
};

const visualToneColors: Record<NonNullable<QuizFigure["tone"]>, string> = {
  coral: "#ff5b6e",
  teal: "#18b7a0",
  yellow: "#f4b63f",
  blue: "#3568ff",
  purple: "#9b5cff",
  ink: "#17191d",
  soft: "#d9cec1"
};

function figureSize(size: QuizFigure["size"]) {
  if (size === "sm") return 24;
  if (size === "lg") return 48;
  return 36;
}

function polygonPoints(sides: number, x: number, y: number, radius: number, start = -90) {
  return Array.from({ length: sides }, (_, index) => {
    const angle = ((start + (360 / sides) * index) * Math.PI) / 180;
    return `${x + Math.cos(angle) * radius},${y + Math.sin(angle) * radius}`;
  }).join(" ");
}

function renderFigure(figure: QuizFigure, key: string) {
  const color = visualToneColors[figure.tone ?? "ink"];
  const size = figureSize(figure.size);
  const x = figure.x ?? 50;
  const y = figure.y ?? 50;
  const rotation = (figure.rotate ?? 0) + (figure.shape === "diamond" ? 45 : 0);
  const transform = `rotate(${rotation} ${x} ${y})`;
  const strokeProps = figure.open
    ? { fill: "none", stroke: color, strokeWidth: 7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
    : { fill: color };

  if (figure.shape === "circle") {
    return <circle key={key} cx={x} cy={y} r={size / 2} transform={transform} {...strokeProps} />;
  }

  if (figure.shape === "square" || figure.shape === "diamond") {
    return <rect key={key} x={x - size / 2} y={y - size / 2} width={size} height={size} rx="7" transform={transform} {...strokeProps} />;
  }

  if (figure.shape === "triangle") {
    return <polygon key={key} points={polygonPoints(3, x, y + 4, size / 1.55)} transform={transform} {...strokeProps} />;
  }

  if (figure.shape === "pentagon") {
    return <polygon key={key} points={polygonPoints(5, x, y, size / 1.45)} transform={transform} {...strokeProps} />;
  }

  if (figure.shape === "bar") {
    return <rect key={key} x={x - size * 0.68} y={y - size * 0.15} width={size * 1.36} height={size * 0.3} rx="5" fill={color} transform={transform} />;
  }

  if (figure.shape === "arrow") {
    const points = `${x},${y - size * 0.68} ${x - size * 0.5},${y - size * 0.08} ${x - size * 0.18},${y - size * 0.08} ${x - size * 0.18},${y + size * 0.58} ${x + size * 0.18},${y + size * 0.58} ${x + size * 0.18},${y - size * 0.08} ${x + size * 0.5},${y - size * 0.08}`;
    return <polygon key={key} points={points} fill={color} transform={transform} />;
  }

  if (figure.shape === "plus") {
    return (
      <g key={key} transform={transform} fill={color}>
        <rect x={x - size * 0.14} y={y - size * 0.55} width={size * 0.28} height={size * 1.1} rx="4" />
        <rect x={x - size * 0.55} y={y - size * 0.14} width={size * 1.1} height={size * 0.28} rx="4" />
      </g>
    );
  }

  return (
    <g key={key} transform={transform} fill={color}>
      <rect x={x - size * 0.46} y={y - size * 0.46} width={size * 0.26} height={size * 0.92} rx="5" />
      <rect x={x - size * 0.46} y={y + size * 0.2} width={size * 0.92} height={size * 0.26} rx="5" />
    </g>
  );
}

function VisualPanel({ visual, compact = false }: { visual: QuizVisual; compact?: boolean }) {
  const columns = visual.columns ?? (visual.layout === "single" ? 1 : visual.cells.length);

  return (
    <div
      className={`quiz-visual quiz-visual-${visual.layout} ${compact ? "quiz-visual-compact" : ""}`}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {visual.cells.map((cell, cellIndex) => (
        <div className={`quiz-visual-cell ${cell.missing ? "is-missing" : ""}`} key={`${visual.layout}-${cellIndex}`}>
          {cell.missing ? (
            <span>?</span>
          ) : (
            <svg viewBox="0 0 100 100" role="img" aria-label={cell.label ?? "Figura del test"}>
              {cell.figures?.map((figure, figureIndex) => renderFigure(figure, `${cellIndex}-${figureIndex}`))}
              {cell.label ? (
                <text x="50" y="58" textAnchor="middle" className="quiz-visual-label">
                  {cell.label}
                </text>
              ) : null}
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

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
    const useCorrectScore = quiz.kind === "trivia" || quiz.slug === "iq-rapido";

    return {
      result: getResultForScore(quiz, useCorrectScore ? totalScore : averageScore),
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
    const isIq = quiz.slug === "iq-rapido";
    const visualLabel = isTrivia ? "Aciertos" : isIq ? "IQ estimado" : quiz.kind === "challenge" ? "Reto" : "Resultado";
    const scoreLabel = isTrivia ? `${totalScore}/${quiz.questions.length}` : result.scoreLabel;
    const resultEyebrow = isTrivia ? "Marcador final" : isIq ? "Resultado IQ" : quiz.kind === "challenge" ? "Tu reto" : "Tu resultado";
    const reasonTitle = isTrivia ? "Lectura del marcador" : "Por que te ha salido esto";
    const tags = isTrivia
      ? [`${totalScore} aciertos`, result.scoreLabel, "Listo para compartir"]
      : isIq
      ? [`${totalScore} de ${quiz.questions.length}`, "Estimacion", "No oficial"]
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

  const hasVisualOptions = currentQuestion.options.some((option) => option.visual);

  return (
    <section className={`test-shell ${quiz.slug === "iq-rapido" ? "iq-test-shell" : ""}`}>
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
        {currentQuestion.difficulty ? <span className="question-difficulty">{difficultyLabels[currentQuestion.difficulty]}</span> : null}
        <h1>{currentQuestion.prompt}</h1>
        {currentQuestion.visual ? <VisualPanel visual={currentQuestion.visual} /> : null}
        <p className="test-note">{quiz.note}</p>
      </div>

      <div className={`answer-grid ${hasVisualOptions ? "answer-grid-visual" : ""}`}>
        {currentQuestion.options.map((option, index) => (
          <button
            className={`answer-button ${option.visual ? "answer-button-visual" : ""} ${selectedOption === option.id ? "is-selected" : ""}`}
            key={option.id}
            type="button"
            onClick={() => chooseOption(option)}
          >
            <span className="answer-index">{String.fromCharCode(65 + index)}</span>
            <span className="answer-content">
              {option.visual ? <VisualPanel visual={option.visual} compact /> : null}
              <span>{option.label}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
