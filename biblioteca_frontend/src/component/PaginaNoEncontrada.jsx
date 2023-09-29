import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

export default function PaginaNoEncontrada() {
  const navigate = useNavigate();

  const volver = () => {
    navigate("/");
  };

  return (
    <div className="pagina-no-encontrada">
      <Button label="VOLVER" icon="pi pi-check" onClick={volver} />
      <h1>QUE HAS TOCADO?</h1>
      <div className="gif-container">
        <iframe
          src="https://giphy.com/embed/26BGIqWh2R1fi6JDa"
          width="480"
          height="360"
          className="giphy-embed"
          allowFullScreen></iframe>
      </div>
    </div>
  );
}
