import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import Routes from './Routes.tsx';
import { AppContext, type AppContextType } from './lib/contextLib';

function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    function handleLogout() {
        userHasAuthenticated(false);
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
