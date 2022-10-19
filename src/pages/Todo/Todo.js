import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { delTodoAPI, getTodoAPI, postTodoAPI, putTodoAPI } from "../../api/api";

const Todo = () => {
  const navigate = useNavigate();
  const [todoData, setTodoData] = useState("");
  const [todoListData, setTodoListData] = useState("");

  useEffect(() => {
    localStorage.getItem("jwt") || navigate("/");
    getTodoAPI().then((res) => setTodoListData(res.data));
  }, []);

  const onCreate = () => {
    postTodoAPI(todoData).then((res) => setTodoListData(res.data));
  };

  const onUpDate = () => {
    putTodoAPI("id");
  };

  const onDelete = (e) => {
    delTodoAPI(e.target.id).then((res) => setTodoListData(res.data));
  };

  const onComplete = () => {};

  return (
    <Wrap>
      <Container>
        <Title>To Do</Title>
        <InputArea>
          <TodoInput
            onChange={(e) => setTodoData(e.target.value)}
            placeholder="오늘 할 일을 입력해주세요."
          ></TodoInput>
          <TodoBtn onClick={onCreate}>등록</TodoBtn>
        </InputArea>

        {todoListData.length > 0 && (
          <>
            {todoListData.map((data) => {
              return (
                <TodoList key={data.id}>
                  <TodoContent>{data.todo}</TodoContent>
                  <UpDateBtn>수정</UpDateBtn>
                  <DeleteBtn onClick={onDelete} id={data.id}>
                    삭제
                  </DeleteBtn>
                  <CompleteBtn>완료</CompleteBtn>
                </TodoList>
              );
            })}
          </>
        )}
      </Container>
    </Wrap>
  );
};

export default Todo;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 50%;
  border: solid 1px rgba(0, 0, 0, 0.15);
  margin: 50px auto;
  text-align: center;
  border-radius: 10px;
`;

const Title = styled.div`
  width: 100%;
  padding: 2%;
`;
const InputArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TodoInput = styled.input`
  display: block;
  width: 60%;
  border: 1px solid #dadada;
  padding: 10px 10px 10px;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: 0 2px 6px 0 rgb(68 68 68 / 8%);
  margin: 20px 0 20px 20px;
  :focus {
    border: 2px solid skyblue;
    outline: none;
    z-index: 5;
  }
`;

const TodoBtn = styled.button`
  margin: 20px;
  padding: 10px 10px 10px;
`;

const TodoList = styled.div`
  display: flex;
  width: 100%;
  margin: 20px;
`;
const TodoContent = styled.div`
  width: 70%;
  margin: 5px auto;

  border: solid 1px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;

const UpDateBtn = styled.button`
  margin: 5px;
`;
const DeleteBtn = styled.button`
  margin: 5px;
`;
const CompleteBtn = styled.button`
  margin: 5px;
`;
