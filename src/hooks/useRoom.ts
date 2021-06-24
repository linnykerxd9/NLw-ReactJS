import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionsType = {
    id: string,
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>

export function useRoom(roomId:string) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionsType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const FirebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            
            //o Object.entrie vai nos retornar uma matriz com os valores ["chave", 'valor']
            //onde a chave do objeto vai virar o indice 0 do array(chave) e as propriedades do objeto  vão virar o indice 1 do array(valor)
            //no caso eel vai nos retornar um array com o primeiro valor sendo o id da sala e o segundo sendo um objeto  contendo tudo de dentro da sala
            //com isso estamos fazendo um map, desestruturando essas informações e transformando tudo em uma coisa só e guardando em um array

            const parsedQuestions = Object.entries(FirebaseQuestions).map(([key, value]) => {
               return{
                id: key,
                content: value.content,
                author: value.author,
                isAnswered: false,
                isHighlighted: false, 
                likeCount: Object.values(value.likes ?? {}).length,
                likeId: Object.entries(value.likes ?? {}).find(([key , like]) => like.authorId === user?.id)?.[0],
            }
        });

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })

        return () => {
            roomRef.off('value');
        }
    }, [roomId, user?.id]);

    return { questions , title}
}