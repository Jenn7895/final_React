import { useState } from "react";

const Form = () => {
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    email: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const validateName = () => {
    if (values.name.trim().length < 3) {
      alert("Por favor verifique su información nuevamente");
      return false;
    }
    return true;
  };

  const validateLastName = () => {
    if (values.lastName.trim().length < 3) {
      alert("Por favor verifique su información nuevamente");
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    let emailUser = values.email.split("@");
    if (emailUser.length < 2) {
      alert("Por favor verifique su información nuevamente");
      return false;
    }
    let dotCom = emailUser[1].split(".");
    if (dotCom.length < 2) {
      alert("Por favor verifique su información nuevamente");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validateName() && validateLastName() && validateEmail()) {
      setSuccessMessage(`Gracias ${values.name} ${values.lastName}, te contactaremos cuanto antes vía Email.`);
      setValues({
        name: "",
        lastName: "",
        email: "",
      });
    }
  };
  

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input 
            id="name"
            type="text" 
            name="name" 
            value={values.name} 
            className="input-form" 
            onChange={handleChange} 
            aria-label="Nombre"
          />
        </div>
        
        <div>
          <label htmlFor="lastName">Apellido</label>
          <input 
            id="lastName"
            type="text" 
            name="lastName" 
            value={values.lastName} 
            className="input-form" 
            onChange={handleChange} 
            aria-label="Apellido"
          />
        </div>
        
        <div>
          <label htmlFor="email">Email</label>
          <input 
            id="email"
            type="text" 
            name="email" 
            value={values.email} 
            className="input-form" 
            onChange={handleChange} 
            aria-label="Email"
          />
        </div>
        
        <button type="submit" className="btn-form">Enviar</button>
      </form>
      
      {successMessage && <h4 className="success-message">{successMessage}</h4>}
    </div>
  );
};

export default Form;