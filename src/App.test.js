import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders all form inputs", () => {
    render(<App />);

    const titleInput = screen.getByLabelText("Title");
    expect(titleInput).toBeInTheDocument();

    const descriptionInput = screen.getByLabelText("Description");
    expect(descriptionInput).toBeInTheDocument();

    const imageInput = screen.getByLabelText("Image");
    expect(imageInput).toBeInTheDocument();

    const saveButton = screen.getByRole("button", { name: "Save" });
    expect(saveButton).toBeInTheDocument();
  });
});
