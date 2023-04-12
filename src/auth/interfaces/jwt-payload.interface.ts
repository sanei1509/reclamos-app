// Porque una interface antes que una clase ?
// básicamente porque no voy a necesitar instanciar un objeto de esta clase
// Solo definir tipo para controlar que tipo de datos voy a recibir
export interface JwtPayloadContract {
    id: string;
    iat: number;
    exp: number;
}