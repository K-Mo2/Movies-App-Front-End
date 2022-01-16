import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <SearchBar />
      <main>
        <section>
          <Section />
        </section>
      </main>
    </div>
  );
}
