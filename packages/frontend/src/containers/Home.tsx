import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useAppContext } from '../lib/contextLib';
import { API } from 'aws-amplify';
import { BsPencilSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { type NoteType } from '../types/note';
import { onError } from '../lib/errorLib';
import './Home.css';

export default function Home() {
    const [notes, setNotes] = useState<Array<NoteType>>([]);
    const { isAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            }

            try {
                const notes = await loadNotes();
                setNotes(notes);
            } catch (e) {
                onError(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [isAuthenticated]);

    function loadNotes() {
        return API.get('notes', '/notes', {});
    }

    function formatDate(str: undefined | string) {
        return !str ? '' : new Date(str).toLocaleString();
    }

    function renderNotesList(notes: NoteType[]) {
        return (
            <>
                <ListGroup.Item action className="py-3 text-nowrap text-truncate p-0">
                    <Link to="/notes/new" className="d-block p-3 text-decoration-none text-reset">
                        <BsPencilSquare size={17} />
                        <span className="ms-2 fw-bold">Create a new note</span>
                    </Link>
                </ListGroup.Item>
                {notes.map(({ noteId, content, createdAt }) => (
                    <ListGroup.Item key={noteId} action className="text-nowrap text-truncate p-0">
                        <Link
                            to={`/notes/${noteId}`}
                            className="d-block p-3 text-decoration-none text-reset"
                        >
                            <span className="fw-bold">{content.trim().split('\n')[0]}</span>
                            <br />
                            <span className="text-muted">Created: {formatDate(createdAt)}</span>
                        </Link>
                    </ListGroup.Item>
                ))}
            </>
        );
    }

    function renderLander() {
        return (
            <div className="lander">
                <h1>Scratch</h1>
                <p className="text-muted">A simple note taking app</p>
            </div>
        );
    }

    function renderNotes() {
        return (
            <div className="notes">
                <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
                <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
            </div>
        );
    }

    return <div className="Home">{isAuthenticated ? renderNotes() : renderLander()}</div>;
}
