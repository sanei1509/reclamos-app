export const SEED_USUARIOS = [
    {
        username: 'admin',
        email: 'admin@gmail.com',
        password: '123456',
        roles: ['ADMIN', 'USER'],
        active: true
    },
    {
        username: 'sanei1509',
        email: 'santiagoneira52@gmail.com',
        password: "123456",
        roles: ['USER', 'ADMIN'],
        active: true
    },
    {
        username: 'leo212',
        email: 'leo212@gmail.com',
        password: "123456",
        roles: ['USER'],
        active: true
    }
];


export const SEED_RECLAMOS = [
    {
        titulo: 'Teclado Kurama',
        marca: 'Kurama',
        numeroFactura: '54232321',
        codigoProducto: "001031",
        fechaCompra: "02/01/2023", 
        problema: 'Falla en las teclas',
        activo: true,
        usuario: 1 
    },
    {
        titulo: 'Teclado Redragon',
        marca: 'Redragon',
        numeroFactura: '12231',
        codigoProducto: "000021",
        fechaCompra: "01/03/2023",
        problema: 'Falla en las luces RGB',
        activo: true,
        usuario: 2 
    },
    {
        titulo: 'Heladera JAMES',
        marca: 'Razer',
        numeroFactura: '21334',
        codigoProducto: "001031",
        fechaCompra: "02/02/2023", 
        problema: 'No enciende',
        activo: true,
        usuario: 3 
    },
    {
        titulo: 'Mouse Razer',
        marca: 'Razer',
        numeroFactura: '21334',
        codigoProducto: "001031",
        fechaCompra: "01/02/2022", 
        problema: 'Falla en el click derecho',
        activo: true,
        usuario: 3 
    },
    {
        titulo: 'Heladera SAMSUNG',
        marca: 'SAMSUNG',
        numeroFactura: '00334',
        codigoProducto: "002231",
        fechaCompra: "15/01/2023", 
        problema: 'Falla en el enfríado',
        activo: true,
        usuario: 3 
    },
    {
        titulo: 'Smartwatch SAMSUNG',
        marca: 'SAMSUNG',
        numeroFactura: '00333',
        codigoProducto: "003331",
        fechaCompra: "03/01/2023", 
        problema: 'Error en el encendido',
        activo: true,
        usuario: 3 
    },
    {
        titulo: 'Celular SAMSUNG',
        marca: 'SAMSUNG',
        numeroFactura: '00222',
        codigoProducto: "0022221",
        fechaCompra: "22/08/2022", 
        problema: 'Error en la batería',
        activo: true,
        usuario: 3 
    },
    {
        titulo: 'Laptop Lenovo',
        marca: 'Lenovo',
        numeroFactura: '00111',
        codigoProducto: "001221",
        fechaCompra: "11/02/2023", 
        problema: 'Error en el teclado',
        activo: true,
        usuario: 3 
    },
]
