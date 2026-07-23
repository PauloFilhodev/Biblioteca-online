import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "../ui/Button";

export default function LoginForm() {
    return (
        <Card>
            <form className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">Logar</h1>
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu email"
            />
            <Label htmlFor="password">Senha</Label>
            <Input
                id="email"
                name="email"
                type="email"
                placeholder="Digite sua senha"
            />
            <Button
            type="submit"
            >
                Entrar
            </Button>
            </form>
        </Card>
    )
}