import React from "react";
import { render } from "@testing-library/react";
import { SearchContent } from "./SearchPage";

test("renders search", () => {
    const { getByText } = render(<SearchContent namespaces={[]} />);
    expect(getByText("Suggested search templates")).toBeInTheDocument();
});
