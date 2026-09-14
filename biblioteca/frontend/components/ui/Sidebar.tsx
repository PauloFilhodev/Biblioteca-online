

type SidebarProps = {
    tipo: "cliente" | "bibliotecario" | undefined
}


export default function Sidebar(
    { tipo }: SidebarProps
) {

    const clientItens = [
        { nome: "Dashboard", href: "/cliente" },
        { nome: "Livros", href: "/cliente/livros" },
        { nome: "Meus empréstimos", href: "/cliente/emprestimos" }
    ];

    const adminItens = [
        { nome: "Dashboard", href: "/bibliotecario" },
        { nome: "Livros", href: "/livros" },
        { nome: "Usuários", href: "/usuarios" },
        { nome: "Empréstimos", href: "/emprestimos" }
    ]

    const items =
        tipo === 'bibliotecario'
            ? adminItens
            : clientItens;

    return (
        <div className="flex flex-col gap-4 p-4 min-w-1/6 bg-primary">
            <h1 className="text-2xl ">Biblioteca - Gerenciamento</h1>

            <div className="flex w-full p-2 rounded-md gap-2 bg-backgroundcolor">
                {/* Esquerda */}
                <div className="flex items-center gap-2">
                    <div className="bg-black w-10 h-10"></div> {/* Imagem */}

                    <div className="text-[12px]">
                        <h2 className="text-black">Paulo</h2>
                        <h2 className="text-gray-500">email@gmail.com</h2>
                    </div>
                </div>

                {/* Direita */}
                <div className="ml-auto text-black self-center font-bold">
                    
                </div>
            </div>


            <nav className="flex flex-col p-2 gap-4 text-2xl">
                <hr />
                
                <aside className="flex flex-col gap-2 text-lg">
                    {items.map((item) => (
                        <a key={item.href} href={item.href}>
                            {item.nome}
                        </a>
                    ))}
                </aside>

            </nav>
        </div>
    );
}