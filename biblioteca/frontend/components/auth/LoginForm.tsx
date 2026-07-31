"use client";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "../ui/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginData, loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/service/auth.service";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (form: LoginData) => {
        try {
            await login(form);

            router.replace('/dashboard');
        } catch (error)
        {
            if (axios.isAxiosError(error))
            {
                console.log(error.response?.data.message);
                setError("root", {
                    message: error.response?.data.message
                });
            }
        }
    }


    return (
        <Card>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4">

                <h1 className="text-4xl font-bold">Logar</h1>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Digite seu email"
                />
                {errors.email && (
                    <span>{errors.email.message}</span>
                )}

                <Label htmlFor="password">Senha</Label>
                <Input
                    id="senha"
                    type="password"
                    showToggle
                    {...register("senha")}
                    placeholder="Digite sua senha"
                />

                {errors.senha && (
                    <span>{errors.senha.message}</span>
                )}

                {errors.root && (
                    <span className="text-red-500">{errors.root.message}</span>
                )}
                <Button
                    type="submit"
                >
                    Entrar
                </Button>
            </form>
        </Card>
    )
}