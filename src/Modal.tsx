import "./Home.css";
import { toDoItem } from "./HomeUtils";

interface ModalProps {
  showModal: boolean; 
  setToDoItems(value: toDoItem | []): void;
  setShowModal(value: boolean): void;
}

// Modal
export default function Modal(props: ModalProps) {
  const { showModal, setToDoItems, setShowModal } = props;
  return (
    <div className={showModal ? "clear-all-modal" : "clear-all-modal hide"}>
      <div className="clear-all-modal-box">
        <div className="clear-all-modal-text">Delete all completed?</div>
        <div className="clear-all-btn-container">
          <button
            className="cancel-clear-all-btn"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>

          <button
            className="confirm-clear-all-btn"
            onClick={() => {
              localStorage.removeItem("to-do");
              setToDoItems([]);
              setShowModal(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
