import React, {useEffect} from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import {signUpAPI, loginAPI} from '../../api/api';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [signUpOn, setSignUpOn] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
  });
  const [signUpErr, setSingUpErr] = useState(true);

  const [btnActive, setBtnActive] = useState(true);

  useEffect(() => {
    localStorage.getItem('jwt') && navigate('/todo');
  }, []);

  useEffect(() => {
    const {email, password} = loginData;
    if (email.includes('@') && password.length > 7) setBtnActive(false);
    else setBtnActive(true);
  }, [loginData]);

  const onChangeLogin = (e) => {
    const {name, value} = e.target;
    setLoginData({...loginData, [name]: value});
  };

  const onChangeSignUp = (e) => {
    const {name, value} = e.target;
    setSignUpData({...signUpData, [name]: value});
  };

  const onLogin = () => {
    loginAPI(loginData)
      .then((res) => {
        res.status === 200 &&
          localStorage.setItem('jwt', res.data.access_token);
        navigate('/todo');
      })
      .catch((res) => alert('로그인에 실패하였습니다.'));
  };
  const onSignup = () => {
    const {email, password} = signUpData;
    !(email.includes('@') && password.length > 7)
      ? setSingUpErr(false)
      : setSingUpErr(true)
      ? alert('회원가입 실패')
      : signUpAPI(signUpData)
          .then((res) => {
            document.getElementById('id').value = '';
            document.getElementById('pwd').value = '';
            res.status === 201 && alert('회원가입에 성공하였습니다.');
          })
          .catch((res) => alert(res.response.data.message));
  };

  return (
    <Wrap>
      <Container>
        <Title>로그인</Title>
        <InputArea>
          {process.env.REACT_APP_API_URL}
          <IdPwWrap>
            <Input
              type="text"
              placeholder="아이디"
              name="email"
              onChange={onChangeLogin}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              name="password"
              onChange={onChangeLogin}
            />
          </IdPwWrap>
        </InputArea>
        <LoginBtn disabled={btnActive} onClick={onLogin}>
          Login
        </LoginBtn>
        <SignUp>
          <span onClick={() => setSignUpOn((prev) => !prev)}>
            회원가입 하기
          </span>
        </SignUp>
      </Container>
      {signUpOn && (
        <Container>
          <Title>회원가입</Title>
          <InputArea>
            <IdPwWrap>
              <Input
                type="text"
                placeholder="아이디"
                name="email"
                onChange={onChangeSignUp}
                id="id"
              />
              <Input
                type="password"
                placeholder="비밀번호"
                name="password"
                onChange={onChangeSignUp}
                id="pwd"
              />
              {signUpErr || (
                <Warning>회원가입 양식을 다시 확인해주세요.</Warning>
              )}
            </IdPwWrap>
          </InputArea>
          <LoginBtn onClick={onSignup}>SignUp</LoginBtn>
        </Container>
      )}
    </Wrap>
  );
};

export default Login;

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
  margin: 40px;
`;

const Input = styled.input`
  position: relative;
  display: block;
  width: 50%;
  height: 100%;
  border: 1px solid #dadada;
  padding: 16px 18px 15px;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: 0 2px 6px 0 rgb(68 68 68 / 8%);
  margin: 0 auto;
  :focus {
    border: 2px solid green;
    outline: none;
    z-index: 5;
  }
`;
const IdPwWrap = styled.div`
  display: block;
  margin: 0 auto;
  border-radius: 6px 6px 0 0;
  box-shadow: none;
  margin: 20px 0 20px 0;
`;

const InputArea = styled.div`
  width: 100%;
`;

const SignUp = styled.div`
  width: 100%;
  padding: 0px 0 20px 0;
  margin: 0 auto;
  font-size: 14px;
  color: grey;
  text-decoration: underline;
  span {
    cursor: pointer;
  }
`;

const LoginBtn = styled.button`
  display: block;
  width: 50%;
  margin: 10px 0 20px 0;
  padding: 13px 0 13px;
  border-radius: 6px;
  border: solid 1px rgba(0, 0, 0, 0.15);
  background-color: #03c75a;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  color: #fff;
  :disabled {
    opacity: 0.4;
    cursor: no-drop;
  }
`;

const Warning = styled.div`
  color: red;
  margin-top: 20px;
`;
