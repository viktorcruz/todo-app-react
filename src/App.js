import { useSelector } from 'react-redux';
import {
  selectStatus,
} from './features/todos';
import Header from './components/Header';
import Filter from './components/Filter';
import Footer from './components/Footer';
import Form from './components/Form';
import './App.css';
import React from 'react';
import { useBreakpoint } from "./hooks/useBreakpoint";

const App = () => {
  const status = useSelector(selectStatus);
  const isMobile = useBreakpoint();

  if (status.loading === 'pending') {
    return <p>Cargando ...</p>;
  }

  if (status.loading === 'rejected') {
    return (
      <p>
        {status.error}
      </p>
    );
  }

  return (
    <div className="app">
      <Header />
      <main>
        <Form />
        <Footer />
        {isMobile
          ? <Filter />
          : <></>}
      
      </main>
      <section className="section-footer">
        <p className="drag-info">Drag and drop to reorder list</p>
        <div class="attribution">Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>. Coded by <a href="#">Your Name Here</a>.</div>
      </section>
    </div>
  );
};

export default App;
