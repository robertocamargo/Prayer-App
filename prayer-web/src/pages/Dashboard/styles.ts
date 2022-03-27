import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContainer = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  .logo {
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

export const Profile = styled.div`
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
    a {
      text-decoration: none;
      color: #ff9000;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;
export const Prayers = styled.div`
  flex: 1;
  h1 {
    font-size: 36px;
  }
  p {
    margin-top: 8px;
    color: #ff9000;
  }
`;
export const NextPrayer = styled.div`
  margin-top: 30px;

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
    flex-wrap: wrap;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    strong {
      margin-left: 24px;
      color: #fff;
      flex: 1;
    }
    p {
      width: 1000px;
    }
    span {
      margin-left: auto;

      svg {
        color: #ff9000;
        width: 35px;
        height: 35px;
      }
    }
    .buttonPrayed {
      border: unset;
      background-color: unset;
    }
  }
`;
