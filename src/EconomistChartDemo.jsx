import { EconomistChart } from "./EconomistChart";
import economistChartCode from "./EconomistChart.jsx?raw";

const codeSections = [
  {
    title: "EconomistChart.jsx",
    code: economistChartCode,
  },
];

export function EconomistChartDemo() {
  return (
    <section className="demo-page">
      <EconomistChart />

      <section className="code-notes">
        <h2>How this chart is made</h2>

        {codeSections.map((section) => (
          <article key={section.title}>
            <h3>{section.title}</h3>
            <pre>
              <code>{section.code}</code>
            </pre>
          </article>
        ))}
      </section>
    </section>
  );
}
