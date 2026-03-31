import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastContainer } from "@/components/ToastContainer";
import { Navbar } from "@/components/Navbar";
import { LoginPage } from "@/pages/LoginPage";
import { LandingPage } from "@/pages/LandingPage";
import { PatientDashboard } from "@/pages/PatientDashboard";
import { CaregiverDashboard } from "@/pages/CaregiverDashboard";
import { DoctorDashboard } from "@/pages/DoctorDashboard";

const queryClient = new QueryClient();

type Role = 'patient' | 'caregiver' | 'doctor';
type Page = 'landing' | 'login' | 'dashboard-patient' | 'dashboard-caregiver' | 'dashboard-doctor';

function HealorApp() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [role, setRole] = useState<Role | null>(() => {
    try { return localStorage.getItem('healora-role') as Role | null; } catch { return null; }
  });

  useEffect(() => {
    if (role) localStorage.setItem('healora-role', role);
    else localStorage.removeItem('healora-role');
  }, [role]);

  const handleLogin = (r: Role) => {
    setRole(r);
    setCurrentPage(`dashboard-${r}`);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const showNavbar = currentPage !== 'login';
  const showDashboard = currentPage.startsWith('dashboard-');

  return (
    <div className="min-h-screen bg-background">
      {showNavbar && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          role={role}
        />
      )}

      {currentPage === 'landing' && (
        <LandingPage onGetStarted={() => setCurrentPage('login')} />
      )}

      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} />
      )}

      {currentPage === 'dashboard-patient' && <PatientDashboard />}
      {currentPage === 'dashboard-caregiver' && <CaregiverDashboard />}
      {currentPage === 'dashboard-doctor' && <DoctorDashboard />}

      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HealorApp />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
