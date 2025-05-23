import {type Todo as TodoType} from '../types'

type Props = TodoType
export const Todo:React.FC<Props> = ({id, title, completed}) => {
    return (
        <div>
            <input 
            className="toggle"
            type="checkbox"
            checked={completed}
            />
            <label>{title}</label>
        </div>
    )
}