import Button from './components/ui/Button/Button';

function App() {
  return (
    <main className="orenza-container">
      <h1>ORENZA</h1>

      <p>
        Prueba inicial del sistema de componentes.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginTop: '32px',
        }}
      >
        <Button variant="primary">
          Principal
        </Button>

        <Button variant="secondary">
          Secundario
        </Button>

        <Button variant="accent">
          Acento
        </Button>

        <Button variant="outline">
          Contorno
        </Button>

        <Button variant="ghost">
          Texto
        </Button>

        <Button disabled>
          Deshabilitado
        </Button>
      </div>
    </main>
  );
}

export default App;