import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";

import Counter from ".";

describe("<Counter />", () => {
  describe("Inicializando com as propriedades preenchidas", () => {
    beforeEach(() => {
      render(<Counter defaultCount={10} description="Título" />);
    });

    it('Deve renderizar o texto "Contagem atual: 10"', () => {
      expect(screen.getByText("Contagem atual: 10")).toBeInTheDocument();
    });

    it('Deve renderizar o texto "Título"', () => {
      expect(screen.getByText(/título/i)).toBeInTheDocument();
    });
  });

  it('Quando o incrementor muda para 5, o texto "Contagem atual: 15" deve ser renderizado', async () => {
    render(<Counter defaultCount={10} description="Título" />);

    const button = screen.getByRole("button", { name: "adicionar número" });
    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "5" } });
    user.click(button);

    await waitFor(() => {
      expect(screen.getByText("Contagem atual: 15")).toBeInTheDocument();
    });
  });

  it("Deve incrementar e decrementar a contagem corretamente", () => {
    render(<Counter description="Título" defaultCount={0} />);

    const buttonIncrement = screen.getByRole("button", {
      name: "adicionar número",
    });
    const buttonDecrement = screen.getByRole("button", {
      name: "subtrair número",
    });
    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "2" } });
    fireEvent.click(buttonIncrement);

    expect(screen.getByText("Contagem atual: 2")).toBeInTheDocument();

    fireEvent.click(buttonDecrement);

    expect(screen.getByText("Contagem atual: 0")).toBeInTheDocument();
  });

  it('Quando o incrementor for 0, o texto "Contagem atual: 0" deve ser renderizado', () => {
      render(<Counter defaultCount={0} description="Título" />);

      expect(screen.getByText("Contagem atual: 0")).toBeInTheDocument();
  });

  it("Quando não passar um defaultCount, o texto 'Contagem atual: 0' deve ser renderizado", () => {
    const { container } = render(<Counter description="Título" />);

    expect(screen.getByText("Contagem atual: 0")).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
