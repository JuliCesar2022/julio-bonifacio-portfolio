// Resultados de la validación de Camila AI con 8 expertos en psicología
const stats = [
  { value: '96%', label: 'usabilidad' },
  { value: '88%', label: 'validez clínica' },
  { value: '88%', label: 'adaptabilidad' },
];

export function Stats() {
  return (
    <div className="story-stats">
      {stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <b>{stat.value}</b>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
