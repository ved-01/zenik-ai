import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { BackgroundPaths } from "./components/ui/background-paths";
import { ContactFormProvider } from "./contexts/ContactFormContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ContactFormProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BackgroundPaths />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/zenik-ai" element={<Navigate to="/" replace />} />
              <Route path="/zenik-ai/" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ContactFormProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
