import { ReactNode } from 'react';
import cx from 'classnames';

import '../styles/questions.scss'

type QuestionsProps = {
    content: string,
    author:{
        name:string,
        avatar:string,
    },
    children?: ReactNode,
    isAnswered?: boolean;
    isHighlighted?: boolean;
}
//desestruturando o props para so pegar as informações que eu quero
//para não precisar acessar o valor pelo props.content
//com a desestruturação, eu so  preciso colocar content
export function Questions({
    content,
    author,
    isAnswered = false,
    isHighlighted = false,
    children,
    }: QuestionsProps) {
    console.log(isHighlighted);
    return(
        <div className={ cx(
            'question',
            { answared: isAnswered },
            { highlighted: isHighlighted && !isAnswered }
        )}>
           {isAnswered && (
                <div className="questionAnswared">
                    <p>Respondida</p>
                </div>
           )}
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