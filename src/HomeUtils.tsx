export function getToDos(): toDoItem[] {
  let toDos: toDoItem = JSON.parse(localStorage.getItem("to-do"));
  if (toDos === null) {
    return [];
  } else return toDos;
}

interface onSubmitProps {
  setToDoItems: (toDoItems: toDoItem[]) => void;
  toDoItems: toDoItem[];
  watch: (name: string) => any; 
  reset: (values?: Record<string, any>) => void;
  setItemSearch: (searchInput: string) => void;
}
export function onSubmit(props: onSubmitProps) {
  const newEntryText = props.watch("new-entry-input");
  // Prevents adding empty to-dos
  if (newEntryText.trim() === "") {
    return;
  }
  const newEntry = {
    text: newEntryText,
    completed: false,
    id: Math.random(),
  };
  const updatedToDoItems = [...props.toDoItems];
  updatedToDoItems.unshift(newEntry);
  props.setToDoItems(updatedToDoItems);
  const itemsJSON = JSON.stringify(updatedToDoItems);
  localStorage.setItem("to-do", itemsJSON);
  props.reset({ "new-entry-input": "" });
  props.setItemSearch("");
}

export function removeAllCompleted({ setToDoItems, toDoItems }) {
  const updatedToDoItems = toDoItems.filter((item) => !item.completed);
  setToDoItems(updatedToDoItems);
  const itemsJSON = JSON.stringify(updatedToDoItems);
  localStorage.setItem("to-do", itemsJSON);
}

export const handleFilter = (selectedFilter, { setItemSearch, setFilter }) => {
  setFilter(selectedFilter);
  // Clears search field when button filters used
  setItemSearch("");
};

export interface toDoItem {
  text: string;
  completed: boolean;
  id: number;
}
