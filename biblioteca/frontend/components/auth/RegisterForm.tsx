"use client";
import { useForm } from "react-hook-form";
import Card from "@/components/ui/Card";
import Label from "../ui/Label";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { RegisterData, registerSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { registerUser } from "@/service/auth.service";


export default function RegisterForm() {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (form: RegisterData) => {
        try {
            await registerUser(form);
            alert("Usuário registrado com sucesso!");
        } catch (error)
        {
            if (axios.isAxiosError(error))
            {
                setError("root", {
                    message: error.response?.data.message
                })
            }
        }
    }

    return (
        <Card>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
            >

                <h1>Criar conta</h1>
                <Label htmlFor="nome">Nome de usuário</Label>
                <Input
                    id="nome"
                    type="nome"
                    placeholder="Nome de usuário"
                    {...register("nome")}
                />
                {errors.nome && (
                    <span>{errors.nome.message}</span>
                )}

                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="emailexemplo@gmail.com"
                    {...register("email")}
                />
                {errors.email && (
                    <span>{errors.email.message}</span>
                )}

                <Label htmlFor="senha">Senha</Label>
                <Input
                    id="senha"
                    type="password"
                    showToggle
                    placeholder="********"
                    {...register("senha")}
                />
                {errors.senha && (
                    <span>{errors.senha.message}</span>
                )}

                <Label htmlFor="telefone">Telefone</Label>
                <Input
                    id="telefone"
                    type="telefone"
                    placeholder="DDNNNNNNNNN"
                    {...register("telefone")}
                />
                {errors.telefone && (
                    <span>{errors.telefone.message}</span>
                )}

                {errors.root && (
                    <span>{errors.root.message}</span>
                )}

                <Button type="submit">
                    Criar conta
                </Button>
            </form>
        </Card>
    );
}