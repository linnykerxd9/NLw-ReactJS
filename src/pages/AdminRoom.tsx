import { FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'

import { Button } from '../components/Button'
import { Questions } from '../components/Questions';
import { RoomCode } from '../components/RoomCode'

import { useRoom } from '../hooks/useRoom';
// import { useAuth } from '../hooks/useAuth';
// import { database } from '../services/firebase';

import '../styles/room.scss'
import { database } from '../services/firebase';

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

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })


        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    } 

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo Letmeask" />
                   <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                   </div>
                </div>
            </header>

            <main >
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 &&  <span>{questions.length} pergunta(s)</span>}
                </div>

                    <div className="questions-list">
                    {questions.map(question => {
                        return (
                            <Questions 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
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