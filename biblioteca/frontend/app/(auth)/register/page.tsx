import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage ()
{

    return (
       <div className="flex h-screen">
            <div className="w-1/2 bg-purple-700"></div>

            <div className="flex w-1/2 items-center justify-center bg-gray-900">
                <div className="w-full max-w-md">
                    <RegisterForm />
                </div>
            </div>
       </div>
    ); 
}