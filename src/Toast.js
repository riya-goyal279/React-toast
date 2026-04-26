import { useEffect, useState, useRef } from "react";

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  useEffect(() => {
    return () => {
      for (let id in timers.current) {
        clearInterval(timers.current[id]);
      }
      timers.current = {};
    };
  }, []);

  function handleClose(id) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    clearInterval(timers.current[id]);
    delete timers.current[id];
  }

  function addToast(msg, type) {
    const id = crypto.randomUUID();
    const newToast = { id, msg, type };
    setToasts((prev) => [...prev, newToast]);
    timers.current[id] = setTimeout(() => {
      handleClose(id);
    }, 5000);
  }

  return (
    <>
      <div className="toast-section">
        {toasts.map(({ id, msg, type }) => (
          <div className={`toast-btn ${type}`} key={id}>
            {msg}
            <button className="toast-close" onClick={() => handleClose(id)}>
              x
            </button>
          </div>
        ))}
      </div>
      <div className="btn-section">
        <button onClick={() => addToast("Success", "success")}>
          Success toast
        </button>
        <button onClick={() => addToast("Warning", "warning")}>
          Warning toast
        </button>
        <button onClick={() => addToast("Info", "info")}>Info toast</button>
        <button onClick={() => addToast("Error", "error")}>Error toast</button>
      </div>
    </>
  );
};

export default ToastContainer;
