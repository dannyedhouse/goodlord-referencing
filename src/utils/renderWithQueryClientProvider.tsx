import { RenderResult } from "@testing-library/react";
import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

const renderWithQueryClientProvider = (ui: ReactElement): RenderResult => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

export default renderWithQueryClientProvider;
