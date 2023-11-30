import { render, screen } from "@testing-library/react";

import Footer from ".";

describe("<Footer />", () => {
  it("Verificar se o componente Footer é renderizado", () => {
    const { container } = render(<Footer />);

    const yearText = screen.getByText(
      `© ${new Date().getFullYear()} Matheus Ricelly`
    );

    expect(yearText).toBeInTheDocument();

    const link = screen.getByTestId("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "http://fsenaweb.dev/");
    expect(link).toHaveTextContent("fsenaweb.dev");

    expect(container).toMatchSnapshot();
  });

});
