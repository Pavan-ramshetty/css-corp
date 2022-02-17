import React, { useCallback, useEffect, useState } from "react";
import { GetStaticProps, GetServerSideProps } from "next";
import { TodoItem } from "../../types/todo";
import styles from "../../styles/Login.module.css";

type Props = {
  todoList: TodoItem[];
};

const Products = ({ todoList }: Props) => {
  // const [todoList, setTodoList] = useState([]);

  // const loadData = useCallback(async () => {
  //   try {
  //     const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  //     const json = await res.json();
  //     setTodoList(json);
  //   } catch (error) {}
  // }, []);

  // useEffect(() => {
  //   loadData();
  // }, [loadData]);

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      {todoList.map((x) => (
        <p key={x.id}>{x.title}</p>
      ))}
      <style jsx>{`
        h1 {
          color: green;
        }
      `}</style>
    </div>
  );
};

// On build it will generate pre-render html
// export const getStaticProps: GetStaticProps = async (context) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
//   const json = await res.json();
//   return {
//     props: {
//       todoList: json,
//     }, // will be passed to the page component as props
//   };
// };

// On Request it will generate Page
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const json = await res.json();
  return {
    props: {
      todoList: json,
    }, // will be passed to the page component as props
  };
};

export default Products;
