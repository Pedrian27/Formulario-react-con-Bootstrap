import React, { useState } from "react";
import "./App.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({});

  const validarFormulario = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    // Validar nombre (sin números)
    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    } else if (/\d/.test(nombre)) {
      nuevosErrores.nombre = "El nombre no puede contener números.";
    }

    // Validar correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!regexCorreo.test(correo)) {
      nuevosErrores.correo = "El correo no es válido.";
    }

    // Validar contraseña
    if (!password) {
      nuevosErrores.password = "La contraseña es obligatoria.";
    } else if (password.length < 8) {
      nuevosErrores.password = "Debe tener al menos 8 caracteres.";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      alert("✅ Formulario enviado con éxito");
    }
  };

  // Evitar que se escriban números en el input de nombre
  const handleNombreChange = (e) => {
    const valor = e.target.value;
    if (!/\d/.test(valor)) {
      setNombre(valor);
    }
  };

  return (
    <div className="app-background d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Registro</h2>
        <form onSubmit={validarFormulario}>
          {/* Nombre */}
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
              value={nombre}
              onChange={handleNombreChange}
            />
            {errores.nombre && (
              <div className="invalid-feedback">{errores.nombre}</div>
            )}
          </div>

          {/* Correo */}
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className={`form-control ${errores.correo ? "is-invalid" : ""}`}
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            {errores.correo && (
              <div className="invalid-feedback">{errores.correo}</div>
            )}
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className={`form-control ${errores.password ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errores.password && (
              <div className="invalid-feedback">{errores.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
