export function getToDos(): toDoItem[] {
  const localStorageData = localStorage.getItem("to-do");
  let toDos: toDoItem[] = localStorageData
    ? JSON.parse(localStorageData)
    : null;
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

// used "type" on only one prop because, for the time being, I could not get "interface" to work correctly on both props 
type SetToDoItems = (updatedToDoItems: toDoItem[]) => void;
export function removeAllCompleted(
  toDoItems: toDoItem[],
  setToDoItems: SetToDoItems
) {
  const updatedToDoItems = toDoItems.filter((item) => !item.completed);
  setToDoItems(updatedToDoItems);
  const itemsJSON = JSON.stringify(updatedToDoItems);
  localStorage.setItem("to-do", itemsJSON);
}

interface HandleFilterOptions {
  setFilter: (filter: "all" | "active" | "completed") => void;
  setItemSearch: (searchInput: string) => void;
}
export function handleFilter(
  selectedFilter: "all" | "active" | "completed",
  props: HandleFilterOptions
) {
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
