
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import User from "./pages/User";
import Produk from "./pages/Produk";
import Supplier from "./pages/Supplier";
import Sales from "./pages/Sales";
import Transaksi from "./pages/Transaksi";
import Data from "./pages/Data";
import Laporan from "./pages/Laporan";
import Mitra from "./pages/Mitra";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/user" element={<User />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/transaksi" element={<Transaksi />} />
          <Route path="/data" element={<Data />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/mitra" element={<Mitra />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
