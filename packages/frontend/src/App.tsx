import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import './App.css';
import Routes from './Routes.tsx';
import { AppContext, type AppContextType } from './lib/contextLib';
import { onError } from './lib/errorLib';

function App() {
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const nav = useNavigate();

    async function handleLogout() {
        await Auth.signOut();

        userHasAuthenticated(false);

        nav('/login');
    }

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            await Auth.currentSession();
            userHasAuthenticated(true);
        } catch (error) {
            if (error !== 'No current user') {
                onError(error);
            }
        }

        setIsAuthenticating(false);
    }

    if (isAuthenticating) {
        return <div className="App container py-3">Loading...</div>;
    }

    return (
        <div className="App container py-3">
            <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
                <Navbar.Brand className="fw-bold text-muted">Scratch</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {isAuthenticated ? (
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    ) : (
                        <>
                            <Nav.Link href="/signup">Signup</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </>
                    )}
                </Navbar.Collapse>
            </Navbar>
            <AppContext.Provider
                value={{ isAuthenticated, userHasAuthenticated } as AppContextType}
            >
                <Routes />
            </AppContext.Provider>
        </div>
    );
}

export default App;
