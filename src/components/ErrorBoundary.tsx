import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside React Tree:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full border border-red-900/40 bg-[#121212]/30 p-8 rounded-xs space-y-6 shadow-xl">
            <div className="mx-auto w-12 h-12 rounded-2xs bg-red-950/30 border border-red-900/40 flex items-center justify-center text-red-400">
              <AlertCircle className="h-6 w-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-black font-display uppercase tracking-wider text-white">
                INTERFACE_RENDER_ERROR
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed">
                An unexpected interface script exception was intercepted. Recover the system below:
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-red-950/10 border border-red-950/30 rounded-2xs text-left">
                <span className="block text-[9px] font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
                  ERROR_LOG:
                </span>
                <code className="text-[10px] font-mono text-zinc-400 break-all leading-normal">
                  {this.state.error.toString()}
                </code>
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full py-3 text-xs font-mono font-black uppercase tracking-widest rounded-xs transition-colors bg-[#CCFF00] hover:bg-[#b5e000] text-[#0A0A0A] flex items-center justify-center space-x-2 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>RELOAD_SYSTEM_INTERFACE</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
