import { useContext, FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


import illustrationImg from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import logoDark from '../assets/images/logoDark.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { authContext } from '../contexts/AuthContexts'
import { database } from '../services/firebase'
import { useTheme } from '../hooks/useTheme'

export function NewRoom() {
    const { user } = useContext(authContext);
    const [newRoom, setNewRoom] = useState('');
    const history = useHistory();
    const { theme, toggleTheme } = useTheme();


async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
        return;
    }
    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id,
    })
    
        history.push(`/admin/rooms/${firebaseRoom.key}`)
    }
    
    return (
        <div id="page-auth" className={(theme === 'dark' ? 'themeDark' : '')}>
            <aside>
                <img src={ illustrationImg } alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main >
            <div className="buttonDarkMode-content">
                <FormGroup>
                    <FormControlLabel
                       control={
                        <Switch
                            checked={theme === 'dark'}
                            onChange={toggleTheme}
                            name="noturno"
                            color="primary"
                        />
                        }
                        label="Modo noturno"
                    />
                </FormGroup>
                </div>
                <div className="main-content">
                    { theme === 'light' ?
                        (<img src={logo} alt="Letmeask" />) :
                        (<img src={logoDark} alt="Letmeask" />)
                    }
                    <h2>Criar uma sala</h2>
                    <form onSubmit={handleCreateRoom }>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}