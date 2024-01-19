import "./Home.css";
import { toDoItem } from "./HomeUtils";

interface ListItemsProps {
  setToDoItems: (toDoItems: toDoItem[]) => void;
  toDoItems: toDoItem[];
  toDoItem: toDoItem;
}
export default function ListItems(props: ListItemsProps): JSX.Element {  
  const { setToDoItems, toDoItem, toDoItems } = props;
  const { text, id, completed } = toDoItem;
  
  function removeItem() {
    setToDoItems((originalItems: toDoItem[]) =>
      originalItems.filter((item: toDoItem) => item.id !== id)
    );
    const updatedToDoItems = toDoItems.filter((item) => item.id !== id);
    const itemsJSON = JSON.stringify(updatedToDoItems);
    localStorage.setItem("to-do", itemsJSON);
  }

  function toggleCompleted() {
    const updatedToDoItems = toDoItems.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setToDoItems(updatedToDoItems);
    const itemsJSON = JSON.stringify(updatedToDoItems);
    localStorage.setItem("to-do", itemsJSON);

    // Removes input field's focus to prevent the keyboard from popping up upon every toggle attempt on mobile
    const inputField = document.querySelector(".text-input-box") as HTMLInputElement | null;
    if (inputField) {
      inputField.blur();
    }
  }

  return (
    <div className="list-item">
      <div className="text-container">
        <input
          className="checkbox"
          type="checkbox"
          checked={completed}
          onChange={toggleCompleted}
        />
        <p className="item-text" onClick={toggleCompleted}>
          {completed ? <strike>{text}</strike> : text}
        </p>
      </div>
      <div className="remove-btn-container">
        <button className="remove-item" onClick={removeItem}>
          <i className="fas fa-times">x</i>
        </button>
      </div>
    </div>
  );
}
