import {ReactNode} from 'react'
import '../styles/questions.scss'

type QuestionsProps = {
    content: string,
    author:{
        name:string,
        avatar:string,
    },
    children?: ReactNode,
}
//desestruturando o props para so pegar as informações que eu quero
//para não precisar acessar o valor pelo props.content
//com a desestruturação, eu so  preciso colocar content
export function Questions({
    content,
    author,
    children,
    }: QuestionsProps) {
    return(
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{ author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}