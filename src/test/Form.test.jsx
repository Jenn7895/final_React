import { describe, test, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen,  waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../Components/Form";

afterEach(() => {
  cleanup();
});

describe("Tests for <Form />", () => {
  test("Debe renderizar el formulario correctamente", () => {
    render(<Form />);

    const inputName = screen.getByLabelText(/nombre/i);
    const inputLastName = screen.getByLabelText(/apellido/i);
    const inputEmail = screen.getByLabelText(/email/i);
    const buttonSubmit = screen.getByRole("button", { name: /enviar/i });

    expect(inputName).toBeDefined();
    expect(inputName.getAttribute("type")).toBe("text");

    expect(inputLastName).toBeDefined();
    expect(inputLastName.getAttribute("type")).toBe("text");

    expect(inputEmail).toBeDefined();
    expect(inputEmail.getAttribute("type")).toBe("text");

    expect(buttonSubmit).toBeDefined();
    expect(buttonSubmit.getAttribute("type")).toBe("submit");
  });

  test("Debe permitir escribir en los campos", async () => {
    render(<Form />);
  
    const user = userEvent.setup();
    const inputName = screen.getByLabelText(/nombre/i);
    const inputLastName = screen.getByLabelText(/apellido/i);
    const inputEmail = screen.getByLabelText(/email/i);
  
    await user.type(inputName, "Juan");
    await user.type(inputLastName, "Pérez");
    await user.type(inputEmail, "juan.perez@example.com");

    expect(inputName.value).toBe("Juan");
    expect(inputLastName.value).toBe("Pérez");
    expect(inputEmail.value).toBe("juan.perez@example.com");
    
  });
  
  

  test("Los campos deben limpiarse después de un envío exitoso", async () => {
    render(<Form />);
    const user = userEvent.setup();

    const inputName = screen.getByLabelText(/nombre/i);
    const inputLastName = screen.getByLabelText(/apellido/i);
    const inputEmail = screen.getByLabelText(/email/i);
    const buttonSubmit = screen.getByRole("button", { name: /enviar/i });

    await user.type(inputName, "Juan");
    await user.type(inputLastName, "Pérez");
    await user.type(inputEmail, "juan.perez@example.com");
    await user.click(buttonSubmit);

    expect(inputName.value).toBe("");
    expect(inputLastName.value).toBe("");
    expect(inputEmail.value).toBe("");
  });

  test.each([
    ['Jo', 'Pérez', 'juan@example.com', 'Nombre inválido'],
    ['Juan', 'Pe', 'juan@example.com', 'Apellido inválido'],
    ['Juan', 'Pérez', 'invalid-email', 'Email inválido']
  ])("Debe mostrar mensaje de error cuando el formulario es inválido", async (name, lastName, email, scenario) => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Form />);
    const user = userEvent.setup();

    const inputName = screen.getByLabelText(/nombre/i);
    const inputLastName = screen.getByLabelText(/apellido/i);
    const inputEmail = screen.getByLabelText(/email/i);
    const buttonSubmit = screen.getByRole("button", { name: /enviar/i });

    await user.type(inputName, name);
    await user.type(inputLastName, lastName);
    await user.type(inputEmail, email);
    await user.click(buttonSubmit);

    expect(window.alert).toHaveBeenCalledWith("Por favor verifique su información nuevamente");
  });
});