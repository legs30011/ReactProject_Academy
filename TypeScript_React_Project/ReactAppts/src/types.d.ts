//Dif between interface and type ,type es para typo yu no puedes extender
//interface el cojntrado de un objeto para extenderla 
// el .d es declaraciones solo eso
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export type ListOfTodo = Todo[]