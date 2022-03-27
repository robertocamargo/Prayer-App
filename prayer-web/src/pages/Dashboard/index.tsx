import React, { useEffect, useState, useCallback } from "react";
import { FiPower } from "react-icons/fi";
import { FaPray } from "react-icons/fa";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

import { InferencePriority } from "typescript";
import logoImg from "../../assets/image1.svg";

import {
  Container,
  Header,
  HeaderContainer,
  Profile,
  Content,
  Prayers,
  NextPrayer,
} from "./styles";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

interface Prayers {
  id: string;
  prayer_description: string;
  anonymous: boolean;
  prayed: string;
  date: string;
  dataFormatada: string;
  user: {
    name: string;
    avatar_url: string;
  };
  prayersprayed: {
    user_id: string;
    prayer_id?: string;
  };
}
const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [prayers, setPrayers] = useState<Prayers[]>([]);

  const fetchMyAPI = useCallback(async () => {
    const response = await api.get<Prayers[]>("/prayers");
    const prayersFormated = response.data.map((prayer) => {
      let prayed = "green";

      if (prayer.prayersprayed !== null) {
        if (user.id === prayer.prayersprayed.user_id) {
          prayed = "white";
        }
      }
      return {
        ...prayer,
        prayed,
        dataFormatada: format(parseISO(prayer.date), "dd/M/y"),
      };
    });
    setPrayers(prayersFormated);
  }, [user.id]);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  const handleChangeIcon = (id: string): void => {
    api.post("prayersprayed", {
      user_id: user.id,
      prayer_id: id,
    });
    fetchMyAPI();
  };

  return (
    <Container>
      <Header>
        <HeaderContainer>
        <Link to="/create-prayer">
          <img className="logo" src={logoImg} alt="Clique para postar um pedido de oração" />
          </Link>
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContainer>
      </Header>
      <Content>
        <Prayers>
          <h1>Orações Solicitadas</h1>
          <p>{format(new Date(), "dd/MM/y")}</p>
          {prayers.map((prayer) => (
            <NextPrayer key={prayer.id}>
              <div>
                {(!prayer.anonymous && (
                  <img src={prayer.user.avatar_url} alt={prayer.user.name} />
                )) || <img src={logoImg} alt="Anônimo" />}
                <strong>
                  {(!prayer.anonymous && prayer.user.name) || "Anônimo"}
                </strong>
                <small>{prayer.dataFormatada}</small>
                <p>
                  {prayer.prayer_description}
                  {prayer.id}
                </p>
                <span>
                  <button
                    type="button"
                    onClick={() => handleChangeIcon(prayer.id)}
                    className="buttonPrayed"
                  >
                    <FaPray style={{ color: prayer.prayed }} />
                  </button>
                </span>
              </div>
            </NextPrayer>
          ))}
        </Prayers>
      </Content>
    </Container>
  );
};

export default Dashboard;
