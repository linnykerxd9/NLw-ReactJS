import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'
import logoDark from '../assets/images/logoDark.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import { Button } from '../components/Button'
import { Questions } from '../components/Questions';
import { RoomCode } from '../components/RoomCode'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { useRoom } from '../hooks/useRoom';
// import { useAuth } from '../hooks/useAuth';
// import { database } from '../services/firebase';

import '../styles/room.scss'
import { database } from '../services/firebase';
import { useTheme } from '../hooks/useTheme';

type RoomParams = {
    id: string;
}
export function AdminRoom() {
    
    const params = useParams<RoomParams>();
    // const {user} = useAuth();
    const history = useHistory();
    const roomId = params.id;
    //usando o hook criado para diminuir o código aqui e ser reutilizado em outras páginas;
    //que terá  função de trazer o titulo da página e as perguntas.
    const { title, questions } = useRoom(roomId);
    const { theme, toggleTheme } = useTheme();
    
    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/');
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
     }
    
    async function handleHighlightQuestion(questionId:string, isHighlighted:boolean){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: !isHighlighted,
        })
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    } 

    return (
        <div id="page-room" className={(theme === 'dark' ? 'themeDark' : '')}>
            <header>
                <div className="content">
                { theme === 'light' ?
                        (<img src={logoImg} alt="Letmeask" />) :
                        (<img src={logoDark} alt="Letmeask" />)
                    }
                   <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                   </div>
                </div>
            </header>

            <main >
                <div className="roomContent-header">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                        {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
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
                </div>
                    <div className="questions-list">
                    {questions.map(question => {
                        return (
                            <Questions 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered ={question.isAnswered}
                                isHighlighted = {question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                    >
                                         <img src={checkImg} alt="Marcar pergunta como respondida" />
                                     </button>
                                
                                    <button
                                        type="button"
                                        onClick={() => handleHighlightQuestion(question.id, question.isHighlighted)}
                                    >
                                        <img src={answerImg} alt="Dar destaque à pergunta" />
                                    </button>
                                </>
                           )}

                            <button
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                 <img src={deleteImg} alt="deletar uma pergunta" />
                            </button>
                            </Questions>
                        )
                    })}
                    </div>
            </main>
       </div>
    )
}