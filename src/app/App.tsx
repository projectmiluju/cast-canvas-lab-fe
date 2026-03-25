import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from '../features/auth';
import { CanvasPage, LoginPage, SignupPage } from '../pages';

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/local" element={<CanvasPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<CanvasPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
