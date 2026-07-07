import { QuizCard } from "@/components/QuizCard";
import { quizzes } from "@/data/quizzes";

export default function Home() {
  const featuredQuiz = quizzes[0];
  const upcomingQuizzes = quizzes.slice(1);

  return (
    <main>
      <section className="hero">
        <header className="hero-nav page-shell">
          <a className="wordmark" href="/">
            ViralQuiz
          </a>
          <a className="nav-cta" href="#tests">
            Tests
          </a>
        </header>
        <div className="page-shell hero-content">
          <div className="hero-copy">
            <p className="brand-chip">Tests para pasar y comentar</p>
            <h1>Resultados rapidos, bonitos y con gracia</h1>
            <p>
              ViralQuiz convierte mini-tests en tarjetas claras, compartibles y faciles de repetir.
            </p>
            <div className="hero-metrics" aria-label="Detalles de ViralQuiz">
              <span>2 min</span>
              <span>Hasta 15 preguntas</span>
              <span>Sin registro</span>
              <span>Resultado instantaneo</span>
            </div>
            <div className="hero-actions">
              <a className="button" href={featuredQuiz.href}>
                Hacer el test
              </a>
              <a className="button button-ghost" href="#tests">
                Ver catalogo
              </a>
            </div>
          </div>
          <div className="hero-product" aria-hidden="true">
            <div className="phone-frame">
              <div className="phone-topbar">
                <span />
                <span />
              </div>
              <div className="phone-card phone-card-result">
                <small>Edad mental</small>
                <strong>29</strong>
                <span>Mente flexible</span>
              </div>
              <div className="phone-question">
                <small>Pregunta 3 de 5</small>
                <p>Si hay drama en el grupo...</p>
              </div>
              <div className="phone-option">Bajar el volumen</div>
              <div className="phone-option phone-option-muted">Pedir contexto</div>
            </div>
            <div className="floating-note note-coral">Compartible</div>
            <div className="floating-note note-teal">Sin registro</div>
          </div>
        </div>
      </section>

      <section className="page-shell test-list-section" id="tests">
        <div className="section-heading">
          <p className="section-kicker">Tests disponibles</p>
          <h2>Un catalogo pequeno, con espacio para crecer</h2>
          <p>Empezamos con edad mental y dejamos la estructura lista para nuevos formatos.</p>
        </div>

        <div className="quiz-grid">
          <QuizCard quiz={featuredQuiz} featured />
          {upcomingQuizzes.map((quiz) => (
            <QuizCard key={quiz.slug} quiz={quiz} />
          ))}
        </div>
      </section>
    </main>
  );
}
