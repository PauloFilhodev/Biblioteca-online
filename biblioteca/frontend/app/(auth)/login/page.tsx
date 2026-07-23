import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-purple-700" />

            <div className="flex w-1/2 items-center justify-center bg-gray-900">
                <div className="w-full max-w-md">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}