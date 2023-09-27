import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import "../App.css";

const MyMultiSelect = () => {
  const [selectedBooks, setSelectedBooks] = useState(null);
  const books = [
    { name: "Libro 1", id: 1 },
    { name: "Libro 2", id: 2 },
    // más libros aquí
  ];

  return (
    <MultiSelect
      value={selectedBooks}
      onChange={(e) => setSelectedBooks(e.value)}
      options={books}
      optionLabel="name"
      placeholder="Libros"
      maxSelectedLabels={3}
      className="w-full md:w-20rem"
    />
  );
};

export default function MyMenubar() {
  const items = [
    // tus elementos del menú aquí
    {
      label: "Libros",
      command: () => {
        /* comando aquí */
      },
      items: [
        {
          label: "Nuevo Libro",
          command: () => {
            /* comando aquí */
          },
        },
        {
          label: "Ver Lista",
          command: () => {
            /* comando aquí */
          },
        },
        <MyMultiSelect key="multiselect" />,
      ],
    },
    {
      label: "Autores",
      command: () => {
        /* comando aquí */
      },
      items: [
        {
          label: "Nuevo Autor",
          command: () => {
            /* comando aquí */
          },
        },
        {
          label: "Ver Lista",
          command: () => {
            /* comando aquí */
          },
        },
        <MyMultiSelect key="multiselect" />,
      ],
    },
    {
      label: "Editoriales",
      command: () => {
        /* comando aquí */
      },
      items: [
        {
          label: "Nueva Editorial",
          command: () => {
            /* comando aquí */
          },
        },
        {
          label: "Ver Lista",
          command: () => {
            /* comando aquí */
          },
        },
        <MyMultiSelect key="multiselect" />,
      ],
    },
  ];

  const start = <h3>Biblioteca</h3>;
  const end = (
    <InputText placeholder="Search" type="text" className="w-full p-ml-auto" />
  );

  return (
    <div className=" navb p-fixed p-w-100 p-flex p-flex-column">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
