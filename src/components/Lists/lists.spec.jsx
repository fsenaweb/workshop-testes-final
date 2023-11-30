import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";

import Lists from ".";

describe("<Lists />", () => {
  it("Renderiza o componente", () => {
    render(<Lists />);

    // Verifica se o form, input e button estão renderizados
    expect(screen.getByTestId("form-add")).toBeInTheDocument();
    expect(screen.getByTestId("input")).toBeInTheDocument();
    expect(screen.getByText(/salvar/i)).toBeInTheDocument();
  });

  it("Ao digitar menos de 3 caracteres o botão ficará desabilitado", async () => {
    render(<Lists />);

    const button = screen.getByText(/salvar/i);
    const input = screen.getByTestId("input");

    expect(button).toBeDisabled();

    const text = "12";
    user.type(input, text);

    await waitFor(() => {
      expect(input).toHaveValue(text);
    });

    expect(button).toBeDisabled();
  });

  it("Ao digitar 3 caracteres ou mais, o botão ficará habilitado", async () => {
    render(<Lists />);
    const button = screen.getByText(/salvar/i);
    const input = screen.getByTestId("input");

    expect(button).toBeDisabled();

    const text = "123";
    user.type(input, text);

    await waitFor(() => {
      expect(input).toHaveValue(text);
    });

    expect(button).toBeEnabled();
  });

  it("Deve exibir um novo item ao clicar no botão salvar", async () => {
    render(<Lists />);

    const input = screen.getByTestId("input");
    const submit = screen.getByText("Salvar");

    fireEvent.change(input, { target: { value: "Casa Nova" } });
    fireEvent.click(submit);

    const element = screen.getByText("Casa Nova");

    expect(element).toBeInTheDocument();
  });

  it("Deve contar a quantidade de itens após cadastros", () => {
    render(<Lists />);

    const input = screen.getByTestId("input");
    const submit = screen.getByText("Salvar");

    // Cadastrando uma palavra
    fireEvent.change(input, { target: { value: "Palavra 1" } });
    fireEvent.click(submit);

    fireEvent.change(input, { target: { value: "Palavra 2" } });
    fireEvent.click(submit);

    const listItems = screen.getAllByTestId("item");

    expect(listItems.length).toBe(2);
  });

  it("Não deve adicionar um item duplicado", () => {
    render(<Lists />);

    const input = screen.getByTestId("input");
    const submit = screen.getByText("Salvar");

    fireEvent.change(input, { target: { value: "Roupa" } });
    fireEvent.click(submit);

    fireEvent.click(submit);

    fireEvent.change(input, { target: { value: "Roupa" } });
    fireEvent.click(submit);

    const element = screen.getAllByText("Roupa");
    expect(element.length).toBe(1);
  });

  it("Deleta as palavras ao clicar no botão delete", () => {
    const { container } = render(<Lists />);

    const input = screen.getByTestId("input");
    const submit = screen.getByText("Salvar");

    fireEvent.change(input, { target: { value: "Casa Nova" } });
    fireEvent.click(submit);

    const deleteButton = screen.getByTestId("Casa Nova-btn-delete");
    fireEvent.click(deleteButton);

    const deletedElement = screen.queryByText("Casa Nova");
    expect(deletedElement).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
