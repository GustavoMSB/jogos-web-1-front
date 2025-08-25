import { Card } from "react-bootstrap";
import api from "../../hooks/api";
import { useState } from "react";

export const Login: React.FC = () => {
    const [form, setForm] = useState({
        apelidoUsuario: '',
        senha: ''
    });

    const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        api.post('/auth/login', form).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.error('There was an error!', error);
        });
    };


    return (
        <div className="container bg-dark text-white p-4 w-100 h-100 d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', minWidth: '100vw' }}>
            <h1>Jogos IFS</h1>
            <p>Faça login para acessar</p>
            <Card className="py-4 px-2 ">
                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    <Card.Text>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="apelidoUsuario" className="form-label">Username</label>
                                <input type="text" className="form-control" id="apelidoUsuario" onChange={(e) => {
                                    setForm({ ...form, apelidoUsuario: e.target.value });
                                }} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="senha" className="form-label">Senha</label>
                                <input type="password" className="form-control" id="senha" onChange={(e) => {
                                    setForm({ ...form, senha: e.target.value });
                                }} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={(e) => submit(e)}>Login</button>
                        </form>
                    </Card.Text>
                </Card.Body>
            </Card>
            {/* Add your login form here */}

        </div>
    );
}