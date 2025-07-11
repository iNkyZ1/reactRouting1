import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, ControlPanel } from '../../components';
import { createTodo, deleteTodo, readTodo, updateTodo } from '../../api';
import styles from './todo-page.module.css';

export const TodoPage = () => {
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const onTitleChange = ({ target }) => setTitle(target.value);

  const onRemove = () => deleteTodo(id).then(() => navigate('/'));

  const onSave = () => {
    if (id === undefined) {
      createTodo({ title, completed: false }).then(() => navigate('/'));
    } else {
      updateTodo({ id, title }).then(() => navigate('/'));
    }
  };

  useEffect(() => {
    if (id === undefined) return;

    readTodo(id).then((loadedTodo) => {
      if (loadedTodo.title === undefined) {
        navigate('/404');
      }

      setTitle(loadedTodo.title);
    });
  }, [id, navigate]);

  return (
    <>
      <ControlPanel>
        <Button>
          <Link to="/">
            <b>&larr;</b>
          </Link>
        </Button>
        <Button onClick={onRemove}>х</Button>
        <Button onClick={onSave}>0</Button>
      </ControlPanel>
      <div>
        <textarea className={styles.title} value={title} onChange={onTitleChange} />
      </div>
    </>
  );
};
