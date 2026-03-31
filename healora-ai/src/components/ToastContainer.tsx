import { useState, useEffect } from "react";
import { subscribe, getToasts, type Toast } from "@/lib/toast";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>(getToasts());

  useEffect(() => {
    const unsub = subscribe(setToasts);
    return unsub;
  }, []);

  const icons = {
    success: <CheckCircle className="w-4 h-4 text-green-400" />,
    error: <XCircle className="w-4 h-4 text-red-400" />,
    warning: <AlertTriangle className="w-4 h-4 text-yellow-400" />,
    info: <Info className="w-4 h-4 text-blue-400" />,
  };

  const colors = {
    success: 'border-green-500/30 bg-green-500/10',
    error: 'border-red-500/30 bg-red-500/10',
    warning: 'border-yellow-500/30 bg-yellow-500/10',
    info: 'border-blue-500/30 bg-blue-500/10',
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`glass border rounded-xl px-4 py-3 flex items-start gap-3 shadow-lg ${colors[toast.type]} ${toast.exiting ? 'toast-exit' : 'toast-enter'}`}
          data-testid={`toast-${toast.id}`}
        >
          <div className="mt-0.5 flex-shrink-0">{icons[toast.type]}</div>
          <p className="text-sm text-foreground leading-snug">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
