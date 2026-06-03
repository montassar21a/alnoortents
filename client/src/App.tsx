import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AdminProvider } from "./contexts/AdminContext";
import Home from "./pages/Home";
import AdminPanel from "./pages/super/SuperPanel";
import { trpc } from "@/lib/trpc";
import { useEffect } from "react";

function FaviconUpdater() {
  const { data: settings } = trpc.admin.settings.get.useQuery();
  useEffect(() => {
    if (settings?.favicon) {
      let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = settings.favicon;
    }
  }, [settings?.favicon]);
  return null;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/super"} component={AdminPanel} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

import CookieBanner from "./components/CookieBanner";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AdminProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
              <CookieBanner />
              <FaviconUpdater />
            </TooltipProvider>
          </LanguageProvider>
        </AdminProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
