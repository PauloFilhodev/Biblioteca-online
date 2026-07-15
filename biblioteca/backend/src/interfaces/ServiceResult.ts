export interface ServiceResult<T> 
{
    sucesso: boolean,
    dados?: T,
    erro?: string
}