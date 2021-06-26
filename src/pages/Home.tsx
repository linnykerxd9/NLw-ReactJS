import { FormEvent, useState } from 'react'

import { useHistory } from 'react-router-dom'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'

import { database } from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import logoDark from '../assets/images/logoDark.svg'

import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'

import { Button } from '../components/Button'


export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');
    const { theme, toggleTheme } = useTheme();

    async function handleCreateRoom(){
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room already  closed.')
            return;
        }

        history.push(`rooms/${roomCode}`);
    }


    return (
        <div id="page-auth" className={(theme === 'dark' ? 'themeDark' : '')}>
            <aside>
                <img src={ illustrationImg } alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o  Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}