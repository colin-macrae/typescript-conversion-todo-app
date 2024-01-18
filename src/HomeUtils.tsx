export function getToDos(): toDoItem[] {
  let toDos: toDoItem = JSON.parse(localStorage.getItem("to-do"));
  if (toDos === null) {
    return [];
  } else return toDos;
}

interface OnSubmitProps {
  setToDoItems: (toDoItems: toDoItem[]) => void;
  toDoItems: toDoItem[];
  watch: (name: string) => any; 
  reset: (values?: Record<string, any>) => void;
  setItemSearch: (searchInput: string) => void;
}
export function onSubmit(props: OnSubmitProps) {
  const { setToDoItems, reset, setItemSearch, toDoItems, watch } = props;
  const newEntryText = watch("new-entry-input");
  // Prevents adding empty to-dos
  if (newEntryText.trim() === "") {
    return;
  }
  const newEntry = {
    text: newEntryText,
    completed: false,
    id: Math.random(),
  };
  const updatedToDoItems = [...toDoItems];
  updatedToDoItems.unshift(newEntry);
  setToDoItems(updatedToDoItems);
  const itemsJSON = JSON.stringify(updatedToDoItems);
  localStorage.setItem("to-do", itemsJSON);
  reset({ "new-entry-input": "" });
  setItemSearch("");
}

interface RemoveAllCompletedProps {
  setToDoItems: (toDoItems: toDoItem[]) => void;
  toDoItems: toDoItem[];
}
export function removeAllCompleted(props: RemoveAllCompletedProps) {
  const { setToDoItems, toDoItems } = props;
  const updatedToDoItems = toDoItems.filter((item) => !item.completed);
  setToDoItems(updatedToDoItems);
  const itemsJSON = JSON.stringify(updatedToDoItems);
  localStorage.setItem("to-do", itemsJSON);
}

interface HandleFilterOptions {
  setFilter: (searchInput: string) => void;
  setItemSearch: (searchInput: string) => void;
}
export function handleFilter(selectedFilter: string, props: HandleFilterOptions) {
  const { setFilter, setItemSearch } = props;  
  setFilter(selectedFilter);
  // Clears search field when button filters used
  setItemSearch("");
}

export interface toDoItem {
  text: string;
  completed: boolean;
  id: number;
}
