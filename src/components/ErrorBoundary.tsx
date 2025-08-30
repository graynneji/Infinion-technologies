import React, { type ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
        console.log(errorInfo.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? (
                <>
                    <div className="bg-[#121212] h-screen">
                        <div className="flex flex-col items-center justify-center h-full p-4 bg-[#121212] text-white">
                            <div className="w-16 h-16 mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
                            <p className="text-gray-400 text-center">We encountered an error. Please try again.</p>
                        </div>
                    </div>
                </>
            );
        }

        return this.props.children;
    }
}
