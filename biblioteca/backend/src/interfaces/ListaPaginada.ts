export interface ListaPaginada<T> {
    dados: T[],
    paginacao: {
        pagina: number,
        limite: number,
        total: number,
        totalPaginas: number
    }
}