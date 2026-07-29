"use client";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "../ui/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginData, loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (form: LoginData) => {
        console.log(`Email: ${form.email} senha ${form.senha}`);
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

                <Button
                    type="submit"
                >
                    Entrar
                </Button>
            </form>
        </Card>
    )
}