import React, { useState } from "react";
import { Formik } from "formik";


const Formulario = () => {
  const [formEnviado, setFormEnviado] = useState(false);
  return (
    <div>
      <Formik //Formik es una librería declarativa, intuitiva y adaptable
        initialValues={{ nombre: "", correo: "" }}
        validate={(values) => {
          let regex = /^[a-zA-ZÁ-ÿ\s]{3,40}$/;
          let regex2 = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
          let errores = {};

          //validación del nombre
          if (!values.nombre) {
            errores.nombre = "Ingrese un nombre ";
          } else if (!regex.test(values.nombre)) {
            errores.nombre =
              "Nombre es invalido, debe contener al menos 4 letras y máx 40 y sin númeración.";
          }
          //validación del correo
          if (!values.correo) {
            errores.correo = "Ingrese correo";
          } else if (!regex2.test(values.correo)) {
            errores.correo = "Correo inválido, debe contener el @ y el .";
          }
          return errores;
        }}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          setFormEnviado(true);
          setTimeout(() => {
            setFormEnviado(false);
          }, 1500);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="formulario">
            <div className="contenedor">
              <label htmlFor="nombre"> Nombre </label>
              {errors.nombre && touched.nombre && (
                <span style={{ color: "red" }}> {errors.nombre} </span>
              )}
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                id="nombre"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div>
              <label htmlFor="correo"> Correo </label>
              {errors.correo && touched.correo && (
                <span style={{ color: "red" }}>{errors.correo}</span>
              )}
              <input
                type="text"
                name="correo"
                placeholder="Correo"
                id="correo"
                value={values.correo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <button type="submit"> Enviar </button>
            {formEnviado && (
              <p className="exito"> Formulario enviado con éxito </p>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Formulario;
