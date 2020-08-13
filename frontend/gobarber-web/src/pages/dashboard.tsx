/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import styled from "styled-components";

import logoImg from "../assets/logo.svg";
import { FiPower, FiClock } from "react-icons/fi";
import { useAuth } from "../hooks/Auth";

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            {/* <img src={user.avatar_url} alt="user.name" />
             */}
            <img
              src="https://avatars0.githubusercontent.com/u/12965616?s=460&u=66a2cfe2d2ea7181750eaded5eacb2a4476d8e84&v=4"
              alt="user.name"
            />
            <div>
              <span>Bem-vindo, </span>
              {/*               <strong>{user.name}</strong>
               */}
              <strong>Tu memo</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>

            <div>
              <img
                src="https://avatars0.githubusercontent.com/u/12965616?s=460&u=66a2cfe2d2ea7181750eaded5eacb2a4476d8e84&v=4"
                alt="aloha"
              />

              <strong>Eu memo</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar></Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;

//styles
const Container = styled.div``;

const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }
  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      content: "";
      background: #ff9000;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;

const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;
const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    align-items: center;
    display: flex;

    span {
      display: flex;
      align-items: center;
    }

    span + span ::before {
      content: "";
      width: 1px;
      height: 12x;
      margin: 0 8px;
      background: #ff9000;
    }
  }
`;
const Calendar = styled.aside`
  width: 380px;
`;

const Header = styled.div`
  padding: 32px 0;
  background: #28262e;
`;

const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    strong {
      color: #ff9000;
    }
  }
`;
