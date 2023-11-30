import { render, screen } from "@testing-library/react";

import Heading from ".";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt="Logo do Evento" />;
  },
}));

describe("<Heading />", () => {
  it("Deve renderizar um título ao passar uma props", () => {
    render(<Heading title="Workshop" />);
    expect(
      screen.getByRole("heading", { name: /workshop/i })
    ).toBeInTheDocument();
  });

  it("Deve renderizar um título padrão quando não existe props", () => {
    render(<Heading />);
    expect(
      screen.getByRole("heading", { name: /evento/i })
    ).toBeInTheDocument();
  });

  it("Deve renderizar um logo ao passar uma props", () => {
    render(
      <Heading logo="https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg" />
    );

    const image = screen.getByAltText("Logo do Evento");

    expect(image).toHaveAttribute(
      "src",
      "https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg"
    );
  });

  it("Deve verificar o tamanho da imagem", () => {
    render(
      <Heading logo="https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg" />
    );

    const image = screen.getByAltText("Logo do Evento");

    expect(image).toHaveAttribute("width", "150");
    expect(image).toHaveAttribute("height", "150");
    expect(image).toHaveClass("d-block", "mx-auto", "mb-4");
  });

  it("Deve rendizar o componente com todos as props", () => {
    const { container } = render(
      <Heading
        logo="https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg"
        title="Workshop"
        subtitle="Introdução aos testes unitários em aplicações web com React, Jest &
        testing library"
        description="Nesse minicurso vamos praticar a escrita de testes unitários para
          aplicações front-end"
      />
    );

    const title = screen.getByText("Workshop");
    const subtitle = screen.getByText(
      "Introdução aos testes unitários em aplicações web com React, Jest & testing library"
    );
    const description = screen.getByText(
      "Nesse minicurso vamos praticar a escrita de testes unitários para aplicações front-end"
    );

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
